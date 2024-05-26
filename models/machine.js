import mongoose from "mongoose";

const MachineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        imageUrl: String,
        serviceDates: [{
            type: Date,
        }],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Machine', MachineSchema);
