import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'inProgress', 'completed', 'declined']
        },
        fileUrl: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Order', OrderSchema);