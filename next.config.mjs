/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            }
        ],
        domains: ["res.cloudinary.com"],
    }
};

export default nextConfig;
