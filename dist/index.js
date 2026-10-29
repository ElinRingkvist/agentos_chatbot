"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./core/engine");
const mausBot_1 = require("./connectors/mausBot");
const huggingFace_1 = require("./ai/huggingFace");
const logger_1 = require("./utils/logger");
async function main() {
    console.log("\n==================================================================");
    console.log("   AGENTIC OS: MULTI-AGENT, GUI AUTOMATION & HF ENGINE            ");
    console.log("==================================================================\n");
    const os = new engine_1.AgenticOS("sv");
    os.start();
    const hf = new huggingFace_1.HuggingFaceConnector("Qwen/Qwen2.5-Coder-7B-Instruct");
    await hf.runInference("Analysera skärmgränssnittet och lokalisera källkoden.");
    logger_1.Logger.info("System", "Triggering GUI Automation via OpenMausBot...");
    await mausBot_1.OpenMausBotConnector.moveAndClick({ x: 640, y: 480 }, "left");
    await mausBot_1.OpenMausBotConnector.typeText("Automated workspace command");
    await os.executeMultiAgentWorkflow("Automated Desktop & Web Task", [
        {
            agentName: "WebResearcher",
            task: "Sök efter senaste trenderna inom offline AI-agenter på internet",
            useWeb: true
        },
        {
            agentName: "DevBot",
            task: "Bygg lokal anslutning för Cursor och filsystemet.",
            useWeb: false
        }
    ]);
    logger_1.Logger.info("System", "Engine running in background. Press Ctrl+C to exit.");
}
main().catch((err) => {
    console.error("Fatal Engine Error:", err);
});
