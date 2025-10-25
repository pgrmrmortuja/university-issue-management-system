import React from 'react';
import { useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
            <FaArrowLeft />
            Back
        </button>
    );
};

export default BackButton;