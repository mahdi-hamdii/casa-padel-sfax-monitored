/// <reference types="multer" />
import { Model } from 'mongoose';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { Sponsor, SponsorDocument } from './entities/sponsor.entity';
import { Counter } from "prom-client";
export declare class SponsorsService {
    private sponsorModel;
    counter: Counter<string>;
    constructor(sponsorModel: Model<SponsorDocument>, counter: Counter<string>);
    create(createSponsorDto: CreateSponsorDto, image: Express.Multer.File): Promise<import("mongoose").Document<unknown, any, SponsorDocument> & Sponsor & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(url: string): Promise<Sponsor[]>;
    findOne(id: number): import("mongoose").Query<import("mongoose").Document<unknown, any, SponsorDocument> & Sponsor & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, any, SponsorDocument> & Sponsor & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, SponsorDocument>;
    update(id: number, updateSponsorDto: UpdateSponsorDto): Promise<import("mongodb").UpdateResult>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
