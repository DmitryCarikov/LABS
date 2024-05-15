import React, { Component } from 'react';
import ImageCard from './ImageCard';

class ImageGallery extends Component {
    render() {
        const { images } = this.props;
        if (!images || images.length === 0) {
            return <div>No images found</div>;
        }

        return (
            <div className="image-gallery">
                {images.map(image => (
                    <ImageCard key={image.id} image={image} />
                ))}
            </div>
        );
    }
}

export default ImageGallery;
