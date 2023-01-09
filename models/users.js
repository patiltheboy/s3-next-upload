import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models?.users || mongoose.model("users", usersSchema)