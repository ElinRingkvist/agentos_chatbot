import { AgenticOS } from "./core/engine";
import { OpenMausBotConnector } from "./connectors/mausBot";
import { HuggingFaceConnector } from "./ai/huggingFace";
import { Logger } from "./utils/logger";

async function main() {
  console.log("\n==================================================================");
  console.log("   AGENTIC OS: MULTI-AGENT, GUI AUTOMATION & HF ENGINE            ");
  console.log("==================================================================\n");

  // Välj språk ("sv", "en", "es", "fr", "de")
  const os = new AgenticOS("sv");
  os.start();

  // 1. Kör lokal Hugging Face AI-modell
  const hf = new HuggingFaceConnector("Qwen/Qwen2.5-Coder-7B-Instruct");
  await hf.runInference("Analysera skärmgränssnittet och lokalisera källkoden.");

  // 2. Utför GUI-automation via OpenMausBot
  Logger.info("System", "Triggering GUI Automation via OpenMausBot...");
  await OpenMausBotConnector.moveAndClick({ x: 640, y: 480 }, "left");
  await OpenMausBotConnector.typeText("Automated workspace command");

  // 3. Parallell multi-agent-körning
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

  Logger.info("System", "Engine running in background. Press Ctrl+C to exit.");
}

main().catch((err) => {
  console.error("Fatal Engine Error:", err);
});
