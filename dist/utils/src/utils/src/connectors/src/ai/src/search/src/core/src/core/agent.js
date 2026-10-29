"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
cat << 'EOF' > src / core / agent.ts;
const logger_1 = require("../utils/logger");
const webSearch_1 = require("../search/webSearch");
const i18n_1 = require("../utils/i18n");
class Agent {
    name;
    role;
    memory;
    constructor(name, role, memory) {
        this.name = name;
        this.role = role;
        this.memory = memory;
    }
    async executeTask(taskDescription, useWebSearch = false) {
        logger_1.Logger.agent(this.name, `Starting task: "${taskDescription}"`);
        let searchData = [];
        if (useWebSearch || taskDescription.toLowerCase().includes("search") || taskDescription.toLowerCase().includes("sök")) {
            searchData = await webSearch_1.WebSearchEngine.search(taskDescription, "Google");
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
        const result = `${i18n_1.I18n.t("taskCompleted")} (${this.name}). ${searchData.length > 0 ? `Web data retrieved: ${searchData[0].snippet}` : ""}`;
        this.memory.addMemory("history", `Task executed by ${this.name}: ${taskDescription}`);
        return result;
    }
}
exports.Agent = Agent;
EOF;
