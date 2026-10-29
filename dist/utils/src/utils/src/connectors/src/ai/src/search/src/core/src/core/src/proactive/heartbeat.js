"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProactiveHeartbeat = void 0;
cat << 'EOF' > src / proactive / heartbeat.ts;
const logger_1 = require("../utils/logger");
const i18n_1 = require("../utils/i18n");
class ProactiveHeartbeat {
    memory;
    orchestrator;
    timer = null;
    constructor(memory, orchestrator) {
        this.memory = memory;
        this.orchestrator = orchestrator;
    }
    startHeartbeat(intervalMs = 10000) {
        logger_1.Logger.info("Heartbeat", "Starting proactive background heartbeat scanner...");
        this.timer = setInterval(async () => {
            await this.runBackgroundSweep();
        }, intervalMs);
    }
    stopHeartbeat() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    async runBackgroundSweep() {
        logger_1.Logger.info("Heartbeat", "Performing routine background sweep (Files, Inboxes, Repositories)...");
        logger_1.Logger.success("Heartbeat", "Proactive Trigger: Generating Morning Digest...");
        const context = this.memory.getContextDump();
        logger_1.Logger.agent(this.orchestrator.name, `${i18n_1.I18n.t("morningDigestTitle")}\n${context}`);
    }
}
exports.ProactiveHeartbeat = ProactiveHeartbeat;
EOF;
