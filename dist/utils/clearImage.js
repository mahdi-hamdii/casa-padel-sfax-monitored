"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearImage = void 0;
const fs = require("fs");
const path = require("path");
const clearImage = (filePath) => {
    const pathSplit = filePath.split('\\');
    filePath = path.join(__dirname, '..', '..', ...pathSplit);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log('UNABLE TO DELETE THE IMAGE FROM THE STORAGE', err);
        }
    });
};
exports.clearImage = clearImage;
//# sourceMappingURL=clearImage.js.map