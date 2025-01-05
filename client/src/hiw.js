import React from 'react';

const Hiw = () => {
    return (
        <div className="relative text-[#FAF9F6]/80 font-geneva py-16 mx-auto mt-10 shadow-xl">
            {/* White Rounded Border Starting from Ribbon Edges */}
            <div className="absolute inset-x-0 top-[95px] w-[70%] mx-auto bg-[#25897a]/45 border-8 border-[#FAF9F6]/70 rounded-2xl" style={{ height: 'calc(100% - 200px)'}}></div>

            <div className="relative flex flex-col items-center mb-6">
                <div
                    className="relative w-[55%] h-16 shadow-lg flex justify-center items-center"
                    style={{
                        clipPath: 'polygon(10% 50%, 0% 0%, 100% 0%, 90% 50%, 100% 100%, 0% 100%)',
                        background: "radial-gradient(circle, #206c8c, #1d997c)",
                    }}
                >
                    <h1 className="text-5xl text-[#FAF9F6]/80"
                    >Only 2 steps involved!</h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative flex justify-center items-center gap-16 mt-10">
                {/* Grading Guidelines Box */}
                <div className="bg-white p-6 opacity-85 rounded-2xl shadow-lg w-80 transform hover:scale-105 transition duration-300 relative text-center">
                    <img src="/grading.png" alt="Rubric Sample" className="w-full h-auto rounded-lg" />
                    <img src="/docx.png" alt="DOCX Icon" className="absolute top-[-15px] right-[-15px] w-10 h-10" />
                    <h3 className="text-lg font-semibold text-gray-700 mt-4">Grading Guideline</h3>
                    <p className="text-sm text-gray-600">Includes rubrics, points rewarded, and question type.</p>
                </div>

                {/* Plus Icon as Image (Centered Correctly) */}
                <div className="flex justify-center items-center opacity-85">
                    <img src="/plus.svg" alt="Plus Sign" className="w-12 h-12" />
                </div>

                {/* Student Submission Box */}
                <div className="bg-white p-6 opacity-85 rounded-2xl shadow-lg w-80 transform hover:scale-105 transition duration-300 relative text-center">
                    <img src="/student.png" alt="Student Submission" className="w-full h-auto rounded-lg" />
                    <img src="/docx.png" alt="DOCX Icon" className="absolute top-[-15px] right-[-15px] w-10 h-10" />
                    <h3 className="text-lg font-semibold text-gray-700 mt-4">Student Submission</h3>
                    <p className="text-sm text-gray-600">Automatically analyzed with AI for accuracy.</p>
                </div>
            </div>

            {/* Information Box (Overlapping Border from Behind, Adjusted Spacing) */}
            <div className="relative flex justify-center items-center rounded-lg w-3/5 h-auto mx-auto shadow-lg p-8 mt-10 z-10" style = {{
                background: "radial-gradient(circle, #206c8c, #1d997c)",
            }}>
                <p className="text-center text-[#FAF9F6]/80 text-lg leading-relaxed font-light" >
                    Intelli. is able to parse student submissions and grading guidelines in any format. However, to achieve maximum accuracy, the submitted document needs to be in docx format. Don't have a docx grading guideline? Our dedicated autograder section can help you create one and review scores that may need revision. Just give it a go!
                </p>
            </div>
        </div>
    );
};

export default Hiw;