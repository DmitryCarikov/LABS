import React, { Component } from 'react';

class ImageCard extends Component {
  render() {
    const { urls, description, alt_description } = this.props.image;
    return (
      <div className="image-card">
        <img src={urls.small} alt={alt_description} />
        <p>{description || 'No description'}</p>
      </div>
    );
  }
}

export default ImageCard;
