import mongoose from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const passwordSchema = new mongoose.Schema({
    passwordValue: {
        type: String,
        required: true
    },
    passwordType: {
        type: String,
        required: true,
    },
    generationMode: {
        type: String,
        enum: ['easy-to-say', 'easy-to-read', 'all-characters'],
        default: 'all-characters',
    }
}, { timestamps: true })

passwordSchema.plugin(softDelete)

export default mongoose.model('Password', passwordSchema);