"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface ImageListProps {
  images: string[];
  className?: string;
}

const ListImage: React.FC<ImageListProps> = ({ images, className }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  if (!images || images.length === 0) {
    return <div>No images to display</div>;
  }

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [autoplay, images.length]);

  const mainImage = images[selectedImageIndex];

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    setAutoplay(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setAutoplay(false);
  };

  return (
    <div className={`flex flex-row gap-5 w-full items-start ${className}`}>
      <div className="flex flex-col gap-2.5">
        {images.slice(0, 4).map((image, index) => (
          <div
            className={`w-20 h-20 cursor-pointer border rounded-sm shadow-md hover:opacity-80 ${
              index === selectedImageIndex
                ? "border-2 border-blue-500"
                : "border-2 border-transparent"
            }`}
            key={index}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              width={1000}
              height={1000}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-center items-center gap-3">
        <Image
          width={1000}
          height={1000}
          src={mainImage}
          alt="Main Image"
          onClick={toggleFullscreen}
          className="max-h-[500px] object-contain cursor-pointer transition-all duration-300 "
        />

        {isFullscreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            onClick={toggleFullscreen}
          >
            <Image
              width={1200}
              height={1200}
              src={mainImage}
              alt="Fullscreen Image"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListImage;
