import { Document } from 'mongoose';
import { Person } from 'src/users/entities/person';
export declare type AdminDocument = Admin & Document;
export declare class Admin extends Person {
    constructor(role?: string);
    isActive: boolean;
}
export declare const AdminSchema: import("mongoose").Schema<Document<Admin, any, any>, import("mongoose").Model<Document<Admin, any, any>, any, any, any>, any, any>;
