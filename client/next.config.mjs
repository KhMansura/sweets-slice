/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
   // ✅ Add this to allow external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // ✅ Your image domain
        port: '',
        pathname: '/**', // Allows all paths under this domain
      },
         {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'picsum.photos', // ✅ For placeholder images
        port: '',
        pathname: '/**',
      },
    ],
  },
};


export default nextConfig;
