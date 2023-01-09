import S3 from 'aws-sdk/clients/s3';

export default async function handler(req, res) {
    try {
        const { slug } = req.query
        const key = slug.join('/')

        const bucketName = process.env.AWS_BUCKET_NAME
        const region = process.env.AWS_BUCKET_REGION
        const accessKeyId = process.env.AWS_ACCESS_KEY
        const secretAccessKey = process.env.AWS_SECRET_KEY

        const s3 = new S3({
            region,
            accessKeyId,
            secretAccessKey
        })

        const params = {
            Bucket: bucketName,
            Key: key
        }

        s3.getObject(params, function (err, data) {
            if (err) {
                res.json(err.message);
            }
            else {
                s3
                    .getObject(params)
                    .createReadStream()
                    .pipe(res);
            }
        })

    } catch (error) {
        return res.json({ status: "failed", msg: error.message })
    }
}
