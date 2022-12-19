"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringModule = void 0;
const common_1 = require("@nestjs/common");
const monitoring_service_1 = require("./monitoring.service");
const monitoring_controller_1 = require("./monitoring.controller");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const nestjs_prometheus_2 = require("@willsoto/nestjs-prometheus");
const core_1 = require("@nestjs/core");
const logging_interceptor_1 = require("./logging.interceptor");
let MonitoringModule = class MonitoringModule {
};
MonitoringModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [nestjs_prometheus_1.PrometheusModule.register()],
        controllers: [monitoring_controller_1.MonitoringController,
        ],
        providers: [monitoring_service_1.MonitoringService,
            {
                provide: core_1.APP_INTERCEPTOR, useClass: logging_interceptor_1.LoggingInterceptor,
            },
            (0, nestjs_prometheus_2.makeCounterProvider)({
                name: "http_request_total",
                help: "http_request_total_help",
                labelNames: ['route', 'statusCode']
            }),
            (0, nestjs_prometheus_2.makeCounterProvider)({
                name: "total_enrolment",
                help: "Total enrolment by tournament",
                labelNames: ['tournament', 'status']
            })],
        exports: [
            nestjs_prometheus_1.PrometheusModule,
            (0, nestjs_prometheus_2.makeCounterProvider)({
                name: "http_request_total",
                help: "http_request_total_help",
                labelNames: ['route', 'statusCode']
            }),
            (0, nestjs_prometheus_2.makeCounterProvider)({
                name: "total_enrolment",
                help: "Total enrolment by tournament",
                labelNames: ['tournament']
            })
        ]
    })
], MonitoringModule);
exports.MonitoringModule = MonitoringModule;
//# sourceMappingURL=monitoring.module.js.map