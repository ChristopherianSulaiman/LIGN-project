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
                    className="absolute top-0 left-0 h-20 bg-[#1d997c]/80"
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

                <p classname="font-lg"
                style={{
                    marginBottom: '20px',
                    marginLeft: '30px',
                    marginTop: '-10px',
                    fontWeight: 'lighter',
                    opacity: "0.8",
                }}
                >
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