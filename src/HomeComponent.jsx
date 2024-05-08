import React, { useState } from 'react';
import axios from 'axios';

// Setup Axios instance for OpenAI API
const openAiApi = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    }
});

const CalaveritaForm = () => {
    const [formData, setFormData] = useState({
        friendName: '',
        habit: '',
        profession: '',
        hobby: '',
        characteristic: ''
    });
    const [calaverita, setCalaverita] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userMessage = `It's for a friend, named ${formData.friendName}\nFunny, kind and adventurous\nLoves cars and a good time at Dias\nLoves sneakers`;
        try {
            const response = await openAiApi.post('', {
                model: "gpt-4-turbo-preview",
                messages: [
                    { role: "system", content: "You are a helpful assistant that creates humorous and short calaveritas (Mexican poems) that are funny and light-hearted. Keep the poem short and concise." },
                    { role: "user", content: userMessage }
                ]
            });
            setCalaverita(response.data.choices[0].message.content);
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
        }
        setLoading(false);
    };

    return (
        <div className="form-wrap">
            <form onSubmit={handleSubmit} className="form mb-8">
                <label>
                    Name:
                    <input type="text" name="friendName" value={formData.friendName} onChange={handleChange}  className="border border-amber-600"/>
                </label>
                <label>
                    Habit:
                    <input type="text" name="habit" value={formData.habit} onChange={handleChange} className="border border-amber-600" />
                </label>
                <label>
                    Profession:
                    <input type="text" name="profession" value={formData.profession} onChange={handleChange} className="border border-amber-600" />
                </label>
                <label>
                    Hobby:
                    <input type="text" name="hobby" value={formData.hobby} onChange={handleChange}  className="border border-amber-600"/>
                </label>
                <label>
                    Characteristic:
                    <input type="text" name="characteristic" value={formData.characteristic} onChange={handleChange} className="border border-amber-600"/>
                </label>
                <button type="submit">Roast your ghost</button>
            </form>
            {loading ? <div className="flex justify-center items-center space-x-2">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden"></span>
                </div>
            </div> : calaverita ? <div>
                <h3 className="text-left text-2xl font-bold mb-2">Your Custom Calaverita:</h3>
                <p className="text-left">{calaverita}</p>
            </div> : null}
        </div>
    );
};

export default CalaveritaForm;
