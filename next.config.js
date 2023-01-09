/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  env: {
    MONGO_URI: "mongodb://127.0.0.1:27017/upload",
    AWS_BUCKET_REGION: 'ap-south-1',
    AWS_BUCKET_NAME: "my-imgbucket01",
    AWS_ACCESS_KEY: "AKIA2G257BG56HK4KEPD",
    AWS_SECRET_KEY: "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",
  },
}