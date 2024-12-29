import React from "react";

const NewArrivals = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-[20px]">
            <div className="text-2xl font-light">
                NEW ARRIVALS
            </div>
            <div className="flex justify-center items-center gap-5" style={{ perspective: "1000px" }}>
                <img
                    src="/assets/newA.jpg"
                    alt="Image 1"
                    className="w-[18vw] h-[46vh] object-cover shadow-lg mx-5 transition-transform duration-300 ease-in-out"
                    style={{ transform: "rotateY(30deg) scale(1.1)" }}
                />
                <img
                    src="/assets/img2.png"
                    alt="Image 2"
                    className="w-[18vw] h-[43vh] object-cover shadow-lg transition-transform duration-300 ease-in-out"
                    style={{ transform: "rotateY(15deg) scale(1.05)" }}
                />
                <img
                    src="/assets/img3.png"
                    alt="Image 3"
                    className="w-[18vw] h-[43vh] object-cover shadow-lg transition-transform duration-300 ease-in-out"
                    style={{ transform: "rotateY(-15deg) scale(1.05)" }}
                />
                <img
                    src="/assets/plain.jpg"
                    alt="Image 4"
                    className="w-[18vw] h-[46vh] object-cover shadow-lg mx-5 transition-transform duration-300 ease-in-out"
                    style={{ transform: "rotateY(-30deg) scale(1.1)" }}
                />
            </div>
        </div >
    );
};

export default NewArrivals;
