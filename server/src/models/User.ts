import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT',
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    clientCompany?: string;
    profileImage?: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'EMPLOYEE', 'CLIENT', 'Admin', 'Employee', 'Client', 'admin', 'employee', 'client'],
        default: UserRole.CLIENT,
        set: (v: string) => v.toUpperCase()
    },
    clientCompany: { type: String },
    profileImage: { type: String },
}, { timestamps: true });



export default mongoose.model<IUser>('User', UserSchema);
