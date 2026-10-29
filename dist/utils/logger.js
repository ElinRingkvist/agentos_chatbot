"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    static info(source, message) { console.log(chalk_1.default.blue(`[INFO][${source}]`), message); }
    static success(source, message) { console.log(chalk_1.default.green(`[SUCCESS][${source}]`), message); }
    static warn(source, message) { console.log(chalk_1.default.yellow(`[WARN][${source}]`), message); }
    static agent(agentName, message) { console.log(chalk_1.default.magenta(`[AGENT:${agentName}]`), message); }
    static error(source, message) { console.log(chalk_1.default.red(`[ERROR][${source}]`), message); }
}
exports.Logger = Logger;
