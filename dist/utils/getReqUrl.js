"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReqUrl = void 0;
const common_1 = require("@nestjs/common");
exports.GetReqUrl = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const url = request.protocol + '://' + request.get('host');
    return url;
});
//# sourceMappingURL=getReqUrl.js.map