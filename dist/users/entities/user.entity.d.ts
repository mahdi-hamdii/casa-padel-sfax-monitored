import { Document } from 'mongoose';
import { Person } from './person';
export declare type UserDocument = User & Document;
export declare class User extends Person {
    constructor();
    jetonHeureCreuse: number;
    jetonHeurePlein: number;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, any, any>;
