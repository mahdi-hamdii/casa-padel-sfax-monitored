"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfigSponsor = void 0;
const multer_1 = require("multer");
exports.multerConfigSponsor = {
    storage: (0, multer_1.diskStorage)({
        destination: './public/sponsors',
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString().replace(/:/g, '-') +
                file.originalname +
                '.' +
                file.mimetype.split('/')[1]);
        },
    }),
};
//# sourceMappingURL=multerConfigSponsor.js.map