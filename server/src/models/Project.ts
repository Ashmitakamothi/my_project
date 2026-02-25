import mongoose, { Schema, Document } from 'mongoose';

export enum ProjectStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface IProject extends Document {
    name: string;
    description: string;
    client: mongoose.Types.ObjectId;
    assignedEmployees: mongoose.Types.ObjectId[];
    status: ProjectStatus;
    createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedEmployees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: Object.values(ProjectStatus), default: ProjectStatus.PENDING },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
