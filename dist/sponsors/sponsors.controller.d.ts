/// <reference types="multer" />
/// <reference types="mongoose" />
import { SponsorsService } from './sponsors.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
export declare class SponsorsController {
    private readonly sponsorsService;
    constructor(sponsorsService: SponsorsService);
    createSponsor(createSponsorDto: CreateSponsorDto, image: Express.Multer.File): Promise<import("mongoose").Document<unknown, any, import("./entities/sponsor.entity").SponsorDocument> & import("./entities/sponsor.entity").Sponsor & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(url: string): Promise<import("./entities/sponsor.entity").Sponsor[]>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, any, import("./entities/sponsor.entity").SponsorDocument> & import("./entities/sponsor.entity").Sponsor & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, any, import("./entities/sponsor.entity").SponsorDocument> & import("./entities/sponsor.entity").Sponsor & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./entities/sponsor.entity").SponsorDocument>;
    update(id: string, updateSponsorDto: UpdateSponsorDto): Promise<import("mongodb").UpdateResult>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
