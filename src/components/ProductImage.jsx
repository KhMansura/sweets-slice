// import React from 'react'

// export default function ProductImage() {
//   return (
//     <div>
      
//     </div>
//   )
// }
// src/components/ProductImage.jsx
'use client';

import Image from 'next/image';

export default function ProductImage({ src, alt, className = '' }) {
  // Clean URL + fallback
  const cleanSrc = (src || '')
    .trim()
    .replace(/\.co\.com/, '.co') // fix common typo
    .replace(/ +$/, ''); // trim trailing space

  const fallback = 'https://via.placeholder.com/400x300/F5F5DC/000000?text=Image+Unavailable';

  return (
    <Image
      src={cleanSrc || fallback}
      alt={alt || 'Product image'}
      width={400}
      height={300}
      className={`rounded-lg object-cover ${className}`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = fallback;
      }}
      loading="lazy"
    />
  );
}