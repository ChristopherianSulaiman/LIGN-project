import React from 'react';

const contact = () => {
    return (
        <div
            className="text-[#FAF9F6]/80 relative"
            style={{
                fontFamily: 'Geneva',
            }}
        >
            {/* Title Section */}
            <div
                className="relative mb-8"
                style={{
                    marginTop: '50px',
                }}
            >
                <div
                    className="absolute top-0 left-0 h-20 bg-gradient-to-r from-[#206c8c] to-[#1d997c] shadow-lg"
                    style={{
                        width: '50%',
                        clipPath: 'polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)',
                    }}
                ></div>

                <h1
                    className="relative text-5xl font-semibold z-10 pl-4"
                    style={{
                        lineHeight: '5rem',
                    }}
                >
                   Contact Us
                </h1>
            </div>

            <div className="relative">

            <p className="mr-6 text-md opacity-80 text-left font-lighter" style = {{
                marginLeft: '10px'
            }}>
                Team: Bryant Tan, Christopherian Sulaiman, Christophian Sulaiman
                <br></br>
                Reach us through:<br></br>
                bryant.tan2103@gmail.com <br></br>
                - <br></br>
                -
                </p>
            </div>
        </div>
    )
}

export default contact;