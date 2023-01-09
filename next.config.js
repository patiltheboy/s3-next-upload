/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  env: {
    MONGO_URI: "mongodb://127.0.0.1:27017/upload",
    AWS_BUCKET_REGION: 'aws bucket region',
    AWS_BUCKET_NAME: "aws bucket name",
    AWS_ACCESS_KEY: "aws access key",
    AWS_SECRET_KEY: "aws secret key",
  },
}
