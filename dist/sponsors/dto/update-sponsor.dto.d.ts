import { CreateSponsorDto } from './create-sponsor.dto';
declare const UpdateSponsorDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSponsorDto>>;
export declare class UpdateSponsorDto extends UpdateSponsorDto_base {
    name: string;
    logo: string;
}
export {};
