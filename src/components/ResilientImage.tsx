import React, { useState } from 'react';
import { Mountain } from 'lucide-react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  ...rest
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EDF5EE] via-[#FBF3E4] to-[#E8DEC8] text-[#2E6B34] p-4 text-center ${className}`}
      >
        <Mountain className="w-8 h-8 opacity-60 mb-1.5" aria-hidden="true" />
        {fallbackTitle && (
          <span className="text-xs font-medium text-[#1C241D]/75 line-clamp-2">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
};
