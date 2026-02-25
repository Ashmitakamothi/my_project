import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
    name: string;
    description: string;
    price?: number;
}

const ServiceSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number },
}, { timestamps: true });

export default mongoose.model<IService>('Service', ServiceSchema);
