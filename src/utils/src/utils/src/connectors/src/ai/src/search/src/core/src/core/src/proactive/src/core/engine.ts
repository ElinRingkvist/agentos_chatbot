cat << 'EOF' > src/core/engine.ts
import { PersistentMemory } from "./memory";
import { Agent } from "./agent";
import { ProactiveHeartbeat } from "../proactive/heartbeat";
import { Logger } from "../utils/logger";
import { I18n, SupportedLanguage } from "../utils/i18n";

export class AgenticOS {
  public memory: PersistentMemory;
  public agents: Map<string, Agent> = new Map();
  private heartbeat: ProactiveHeartbeat;

  constructor(lang: SupportedLanguage = "sv") {
    I18n.setLanguage(lang);
    this.memory = new PersistentMemory();

    const orchestrator = new Agent("Orchestrator-Prime", "Orchestrator", this.memory);
    const researchAgent = new Agent("WebResearcher", "ResearchAgent", this.memory);
    const codeAgent = new Agent("DevBot", "CodeEngineer", this.memory);

    this.agents.set(orchestrator.name, orchestrator);
    this.agents.set(researchAgent.name, researchAgent);
    this.agents.set(codeAgent.name, codeAgent);

    this.heartbeat = new ProactiveHeartbeat(this.memory, orchestrator);
  }

  public async requestHumanApproval(actionDescription: string): Promise<boolean> {
    Logger.warn("Security", `${I18n.t("approvalRequired")} "${actionDescription}"`);
    Logger.info("Security", "[Auto-Approved in Demo Mode] Permission granted via interactive approval card.");
    return true;
  }

  public async executeMultiAgentWorkflow(workflowName: string, tasks: { agentName: string; task: string; useWeb?: boolean }[]) {
    Logger.info("Workflow", `Executing Multi-Agent Workflow: ${workflowName}`);

    for (const item of tasks) {
      const agent = this.agents.get(item.agentName);
      if (agent) {
        const approved = await this.requestHumanApproval(`Allow ${agent.name} to execute: ${item.task}`);
        if (approved) {
          const res = await agent.executeTask(item.task, item.useWeb || false);
          Logger.success("Workflow", res);
        }
      }
    }
  }

  public start() {
    Logger.success("System", `Agentic OS Engine initialized successfully [Language: ${I18n.getLanguage().toUpperCase()}].`);
    this.heartbeat.startHeartbeat(15000);
  }
}
EOF
