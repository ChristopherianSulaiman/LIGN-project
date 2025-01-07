import React from 'react';
import { useNavigate } from 'react-router-dom';

const Autograder = () => {
    const navigate = useNavigate();

    return (
        <div className="text-[#FAF9F6]/80 relative text-center flex flex-col items-center"
            style={{ fontFamily: 'Geneva'}}>
            
            <h1 className="relative text-5xl font-semibold z-10 pl-4 text-center mt-10"
                style={{ lineHeight: '5rem' }}>
                Ready to start grading?
            </h1>

            <p className="font-lg opacity-80 mt-4">
                Do you have a grading guideline to start with?
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
                <button
                    onClick={() => navigate('/norubric')}
                    className="flex items-center gap-2 px-8 py-4 rounded-lg border-2 text-[#FAF9F6] bg-[#25897a] hover:bg-[#6BB1A6] hover:text-[#FAF9F6] transition font-medium text-md"
                    style={{
                        borderColor: '#FAF9F6',
                        opacity: '0.8',
                        fontFamily: 'Optima',
                        fontWeight: 'bold',
                    }}>
                    Yes, I Have one
                </button>

                <button
                    onClick={() => navigate('/rubric')}
                    className="flex items-center gap-2 px-8 py-4 rounded-lg border-2 text-[#FAF9F6] bg-[#25897a] hover:bg-[#6BB1A6] hover:text-[#FAF9F6] transition font-medium text-md"
                    style={{
                        borderColor: '#FAF9F6',
                        opacity: '0.8',
                        fontFamily: 'Optima',
                        fontWeight: 'bold',
                    }}>
                    No, Make one
                </button>
            </div>
        </div>
    );
};

export default Autograder;

