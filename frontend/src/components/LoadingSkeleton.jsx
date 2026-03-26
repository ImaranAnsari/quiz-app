import React from 'react';

const LoadingSkeleton = ({ height = 24, width = '100%', style = {} }) => (
    <div
        className="skeleton"
        style={{ height, width, ...style }}
    />
);

export default LoadingSkeleton;
