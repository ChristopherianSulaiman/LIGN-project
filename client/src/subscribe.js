import React from 'react';

const subscribe = () => {
    return (
        <div
            className="text-[#FAF9F6]/80 relative"
            style={{
                fontFamily: 'Geneva',
            }}
        >
            <div
                className="relative mb-8"
                style={{
                    marginTop: '50px',
                }}
            >
                <div className="absolute top-0 right-0 h-20 bg-gradient-to-l from-[#206c8c] to-[#1d997c] shadow-lg w-[50%]" 
                    style={{
                        clipPath: "polygon(100% 0, 0 0, 20% 50%, 0 100%, 100% 100%)"
                    }}>
                </div>

                <h1
                    className="relative text-5xl font-semibold z-10 pl-4"
                    style={{
                        lineHeight: '5rem',
                        marginRight: '15px'
                    }}
                >
                    Subscription
                </h1>
            </div>

            <div className="relative">
                <p className="mr-6 text-md opacity-80 text-right font-lighter" style = {{
                    marginRight: "10px"
                }}>

                Our live-demo product is available now! Stay updated with our latest features and announcements. 
                <br></br>Contact us for more details and be the first to know about future releases.  </p>
            </div>

        </div>
    )
}

export default subscribe;