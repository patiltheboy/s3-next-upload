import S3 from 'aws-sdk/clients/s3';
import multer from 'multer';
import sharp from 'sharp';
import connectDB from '../../config/db';
import users from '../../models/users';

const handler = async (req, res) => {
    if (req.method === 'POST') {

        const bucketName = process.env.AWS_BUCKET_NAME
        const region = process.env.AWS_BUCKET_REGION
        const accessKeyId = process.env.AWS_ACCESS_KEY
        const secretAccessKey = process.env.AWS_SECRET_KEY

        const s3 = new S3({
            region,
            accessKeyId,
            secretAccessKey
        })

        const storageKyc = multer.memoryStorage();
        const uploadKyc = multer({ storage: storageKyc });

        try {
            const singleUpload = uploadKyc.single('image');

            singleUpload(req, res, async function (err) {
                const { name } = req.body;

                if (err) {
                    return res.status(400).json({ status: "failed", msg: err.message });
                }
                if (!req.file) {
                    return res.status(400).json({ status: "failed", msg: "Please Upload Image" });
                }
                if (!req.file) {
                    return res.status(400).json({ status: "failed", msg: "Please Upload Image" });
                }

                let imagesKeys = await sharp(req.file.buffer)
                    .jpeg({ quality: 70 })
                    .toBuffer()

                    .then(resized => s3.upload({
                        Bucket: bucketName + "/userprofiles",
                        Key: Date.now() + req.file.originalname.replace(/\s/g, ''),
                        Body: req.file.buffer
                    }).promise())



                const addNew = new users({
                    name,
                    image: imagesKeys.Key
                })
                var data = await addNew.save();

                return res.status(200).json({
                    status: "success",
                    data: data,
                    msg: "Data Added SuccessFully"
                })
            })

        } catch (error) {
            return res.status(500).json({ status: "failed", msg: error.message });
        }

    } else {
        res.status(422).json('req_method_not_supported');
    }
}
export default connectDB(handler);
export const config = {
    api: {
        bodyParser: false,
    }
};