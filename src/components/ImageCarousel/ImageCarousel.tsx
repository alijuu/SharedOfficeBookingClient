import React, { useState } from "react";
import "./ImageCarousel.css";

interface ImageCarouselProps {
    imageUrls: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel-container">
            <div className="main-image-wrapper">
                <img
                    src={imageUrls[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="main-image"
                />
            </div>

            <div className="thumbnails">
                {imageUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Thumbnail ${index + 1}`}
                        className={`thumbnail ${
                            index === currentIndex ? "active-thumbnail" : ""
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;