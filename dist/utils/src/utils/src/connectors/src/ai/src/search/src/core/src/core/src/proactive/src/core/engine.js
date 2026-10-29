"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgenticOS = void 0;
cat << 'EOF' > src / core / engine.ts;
const memory_1 = require("./memory");
const agent_1 = require("./agent");
const heartbeat_1 = require("../proactive/heartbeat");
const logger_1 = require("../utils/logger");
const i18n_1 = require("../utils/i18n");
class AgenticOS {
    memory;
    agents = new Map();
    heartbeat;
    constructor(lang = "sv") {
        i18n_1.I18n.setLanguage(lang);
        this.memory = new memory_1.PersistentMemory();
        const orchestrator = new agent_1.Agent("Orchestrator-Prime", "Orchestrator", this.memory);
        const researchAgent = new agent_1.Agent("WebResearcher", "ResearchAgent", this.memory);
        const codeAgent = new agent_1.Agent("DevBot", "CodeEngineer", this.memory);
        this.agents.set(orchestrator.name, orchestrator);
        this.agents.set(researchAgent.name, researchAgent);
        this.agents.set(codeAgent.name, codeAgent);
        this.heartbeat = new heartbeat_1.ProactiveHeartbeat(this.memory, orchestrator);
    }
    async requestHumanApproval(actionDescription) {
        logger_1.Logger.warn("Security", `${i18n_1.I18n.t("approvalRequired")} "${actionDescription}"`);
        logger_1.Logger.info("Security", "[Auto-Approved in Demo Mode] Permission granted via interactive approval card.");
        return true;
    }
    async executeMultiAgentWorkflow(workflowName, tasks) {
        logger_1.Logger.info("Workflow", `Executing Multi-Agent Workflow: ${workflowName}`);
        for (const item of tasks) {
            const agent = this.agents.get(item.agentName);
            if (agent) {
                const approved = await this.requestHumanApproval(`Allow ${agent.name} to execute: ${item.task}`);
                if (approved) {
                    const res = await agent.executeTask(item.task, item.useWeb || false);
                    logger_1.Logger.success("Workflow", res);
                }
            }
        }
    }
    start() {
        logger_1.Logger.success("System", `Agentic OS Engine initialized successfully [Language: ${i18n_1.I18n.getLanguage().toUpperCase()}].`);
        this.heartbeat.startHeartbeat(15000);
    }
}
exports.AgenticOS = AgenticOS;
EOF;
