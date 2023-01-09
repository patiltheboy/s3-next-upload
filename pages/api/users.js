import connectDB from "../../config/db";
import users from "../../models/users";


const handler = async (req, res) => {
    if (req.method === 'POST') {

        try {

            const data = await users.find({}, { _id: 0, createdAt: 0, updatedAt: 0, __v:0 })

            return res.json({ status: "success", data })


        } catch (error) {
            return res.status(500).json({ status: "failed", msg: error.message });
        }

    } else {
        res.status(422).json('req_method_not_supported');
    }
}
export default connectDB(handler);