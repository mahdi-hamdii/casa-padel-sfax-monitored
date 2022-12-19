"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSponsorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sponsor_dto_1 = require("./create-sponsor.dto");
class UpdateSponsorDto extends (0, mapped_types_1.PartialType)(create_sponsor_dto_1.CreateSponsorDto) {
}
exports.UpdateSponsorDto = UpdateSponsorDto;
//# sourceMappingURL=update-sponsor.dto.js.map