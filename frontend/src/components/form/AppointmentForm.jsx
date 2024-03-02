import React, { useState } from 'react';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';

const AppointmentForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        problem: '',
        doctor: '',
        date: '',
        time: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your Spring Boot backend
            const response = await axios.post('YOUR_BACKEND_API_URL/api/appointments/book', formData);

            console.log(response.data);

            onClose();
        } catch (error) {
            // Handle errors (e.g., show an error message)
            console.error('Error submitting appointment:', error);
        }
    };

    const handleCancel = () => {

        onClose();
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg">
            <div className="flex justify-end">
                {/* Close icon */}
                <IoClose onClick={handleCancel} className="cursor-pointer" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea name="problem" value={formData.problem} onChange={handleChange} placeholder="Describe your problem" required className="w-full p-2 border border-gray-300 rounded-md" />
                <select name="doctor" value={formData.doctor} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="doctor1">Dental</option>
                    <option value="doctor2">Heart related</option>
                </select>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
                <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Book Appointment
                </button>
            </form>
        </div>
    );
};

export default AppointmentForm;
