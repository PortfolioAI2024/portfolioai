import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const Image = ({ src, alt, width, height }) => {
  return (
    <LazyLoadImage height={height} once>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </LazyLoadImage>
  );
};
