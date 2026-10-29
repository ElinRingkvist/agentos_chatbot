"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistentMemory = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const logger_1 = require("../utils/logger");
const i18n_1 = require("../utils/i18n");
class PersistentMemory {
    memoryFilePath;
    entries = [];
    constructor() {
        this.memoryFilePath = path.join(process.cwd(), ".agent_memory.json");
        this.loadMemory();
    }
    loadMemory() {
        if (fs.existsSync(this.memoryFilePath)) {
            try {
                const raw = fs.readFileSync(this.memoryFilePath, "utf-8");
                this.entries = JSON.parse(raw);
                logger_1.Logger.info("Memory", `${i18n_1.I18n.t("memoryLoaded")} (${this.entries.length} items)`);
            }
            catch (err) {
                logger_1.Logger.error("Memory", "Failed to parse persistent memory file.");
            }
        }
        else {
            this.entries = [{ id: "init-1", category: "preference", content: "User prefers offline-first, multi-language execution with local GUI automation and HuggingFace LLMs.", timestamp: new Date().toISOString() }];
            this.saveMemory();
        }
    }
    saveMemory() { fs.writeFileSync(this.memoryFilePath, JSON.stringify(this.entries, null, 2), "utf-8"); }
    addMemory(category, content) {
        const entry = { id: `mem-${Date.now()}`, category, content, timestamp: new Date().toISOString() };
        this.entries.push(entry);
        this.saveMemory();
        logger_1.Logger.success("Memory", `Added persistent record [${category}]: ${content}`);
    }
    getContextDump() { return this.entries.map((e) => `[${e.category.toUpperCase()}] ${e.content}`).join("\n"); }
}
exports.PersistentMemory = PersistentMemory;
