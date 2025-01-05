import React from 'react';
import { useNavigate } from 'react-router-dom';

const Autograder = () => {
  const navigate = useNavigate();

  return (
    <div
      className="text-[#FAF9F6]/80 relative"
      style={{
        fontFamily: 'Geneva',
        marginTop: '-100px'
      }}
    >
        
        <div className="relative mb-8" style = {{
            marginTop: "45px",
        }}>

        <h1
          className="relative text-5xl font-semibold z-10 pl-4 text-center"
          style={{
            lineHeight: '5rem',
          }}
        >
          Ready to start grading?
        </h1>
      </div>

      <div className="relative text-center">

        <p classname="font-lg"
          style={{
            marginBottom: '20px',
            marginLeft: '30px',
            marginTop: '-20px',
            fontWeight: 'lighter',
            opacity: "0.8",
          }}
        >
          Do you have a grading guideline to start with?
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4 space-x-10   justify-center" style ={{
        marginLeft: '25px',
        marginTop: '5px',
      }}>
        <button
          onClick={() => navigate('/norubric')}
          className="flex items-center gap-2 px-8 py-4 rounded-lg border-2 text-[#FAF9F6] hover:bg-[#6BB1A6] hover:text-[#FAF9F6] transition font-medium text-md"
          style={{
            borderColor: '#FAF9F6',
            opacity: '0.8',
            fontFamily: 'Optima',
            fontWeight: 'bold',
          }}
        >
          Yes, I Have one
        </button>

        <button
          onClick={() => navigate('/rubric')}
          className="flex items-center gap-2 px-8 py-4 rounded-lg border-2 text-[#FAF9F6] hover:bg-[#6BB1A6] hover:text-[#FAF9F6] transition font-medium text-md"
          style={{
            borderColor: '#FAF9F6',
            opacity: '0.8',
            fontFamily: 'Optima',
            fontWeight: 'bold',
          }}
        >
          No, Make one
        </button>
      </div>
    </div>
  );
};

export default Autograder;
