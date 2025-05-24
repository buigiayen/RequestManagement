import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface ImageListProps {
  images: string[];
  className?: string;
}

const ImageListContainer = styled.div`
  display: flex;
  flex-direction: row; /* Đổi sang row để thumbnails nằm bên trái/phải */
  gap: 20px;
  width: 100%;
  align-items: flex-start;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Dọc */
  gap: 10px;
`;

const ThumbnailWrapper = styled.div<{ isActive: boolean }>`
  width: 80px;
  height: 80px;
  cursor: pointer;
  border: ${(props) =>
    props.isActive ? "2px solid #1890ff" : "2px solid transparent"};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const MainImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: 400px;
    object-fit: contain;
  }
`;

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
    <ImageListContainer className={className}>
      <ThumbnailsContainer>
        {images.slice(0, 4).map((image, index) => (
          <ThumbnailWrapper
            className="border rounded-sm shadow-md"
            key={index}
            isActive={index === selectedImageIndex}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              width={1000}
              height={1000}
              src={image}
              alt={`Thumbnail ${index + 1}`}
            />
          </ThumbnailWrapper>
        ))}
      </ThumbnailsContainer>
      <MainImageContainer>
        <Image
          width={1000}
          height={1000}
          src={mainImage}
          alt="Main Image"
          onClick={toggleFullscreen}
          style={{ cursor: "pointer" }}
        />
      </MainImageContainer>
    </ImageListContainer>
  );
};

export default ListImage;
