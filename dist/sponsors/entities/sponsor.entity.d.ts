import * as mongoose from 'mongoose';
export declare type SponsorDocument = Sponsor & Document;
export declare class Sponsor {
    name: string;
    logo: string;
}
export declare const SponsorSchema: mongoose.Schema<mongoose.Document<Sponsor, any, any>, mongoose.Model<mongoose.Document<Sponsor, any, any>, any, any, any>, any, any>;
