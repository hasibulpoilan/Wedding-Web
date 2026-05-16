import React from 'react';
import { getPhotoFocus, getPhotoFocusImageStyle } from '../../lib/photoFocus';

const CoverPhotoFrame = ({
  src,
  config,
  focus,
  size = 120,
  borderColor = '#fff',
  className = '',
  style = {},
}) => {
  const resolvedFocus = focus || getPhotoFocus(config);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: `4px solid ${borderColor}`,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
        flexShrink: 0,
        ...style,
      }}
    >
      <img
        src={src}
        alt=""
        crossOrigin="anonymous"
        draggable={false}
        style={getPhotoFocusImageStyle(resolvedFocus)}
      />
    </div>
  );
};

export default CoverPhotoFrame;
