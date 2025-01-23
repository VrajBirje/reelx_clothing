import React from "react";
import "./curved.css"; // Import the CSS for animations

const NewArrivals = () => {
    return (
        <div className="curvedcar w-full flex flex-col items-center justify-center gap-[20px] overflow-hidden">
            <div className="text-2xl font-light mb-4">NEW ARRIVALS</div>
            <div className="carousel-container">
                <div className="vignette"></div>
                <div className="curveArea rotate-180 absolute top-0 z-50">
                    <div className="mainBox">
                        <div className="curveSection"></div>
                    </div>
                </div>
                <div className="curveArea absolute bottom-0 z-50">
                    <div className="mainBox">
                        <div className="curveSection"></div>
                    </div>
                </div>
                <div className="carousel-track" style={{ position: "relative" }}>
                    <img
                        src="/assets/newA.jpg"
                        alt="Image 1"
                        className="carousel-image"
                    />
                    <img
                        src="/assets/img2.png"
                        alt="Image 2"
                        className="carousel-image"
                    />
                    <img
                        src="/assets/img3.png"
                        alt="Image 3"
                        className="carousel-image"
                    />
                    <img
                        src="/assets/plain.jpg"
                        alt="Image 4"
                        className="carousel-image"
                    />
                    <img
                        src="/assets/img3.png"
                        alt="Image 3"
                        className="carousel-image"
                    />
                    <img
                        src="/assets/plain.jpg"
                        alt="Image 4"
                        className="carousel-image"
                    />
                    <img
                        src="/assets/newA.jpg"
                        alt="Image 1"
                        className="carousel-image"
                    />
                    <img
                        src="/assets/img2.png"
                        alt="Image 2"
                        className="carousel-image"
                    />
                    <img
                        src="/assets/img3.png"
                        alt="Image 3"
                        className="carousel-image"
                    />
                    <img
                        src="/assets/plain.jpg"
                        alt="Image 4"
                        className="carousel-image"
                    />
                    <img
                        src="/assets/img3.png"
                        alt="Image 3"
                        className="carousel-image"
                    />
                    <img
                        src="/assets/plain.jpg"
                        alt="Image 4"
                        className="carousel-image"
                    />
                </div>
                {/* <div className="vignette" style={{ position: "absolute", width: "100%", height: "100%", top: "0", left: "0", background: "0 0 200px rgba(0,0,0,0.9) inset", zIndex: "999" }}></div> */}
            </div>
        </div>
    );
};

export default NewArrivals;
