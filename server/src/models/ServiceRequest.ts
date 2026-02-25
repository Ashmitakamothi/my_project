import mongoose, { Schema, Document } from 'mongoose';

export enum RequestStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export interface IServiceRequest extends Document {
    service: mongoose.Types.ObjectId;
    description: string;
    client: mongoose.Types.ObjectId;
    status: RequestStatus;
}

const ServiceRequestSchema: Schema = new Schema({
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    description: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: Object.values(RequestStatus), default: RequestStatus.PENDING },
}, { timestamps: true });

export default mongoose.model<IServiceRequest>('ServiceRequest', ServiceRequestSchema);
