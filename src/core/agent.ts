import { Logger } from "../utils/logger";
import { PersistentMemory } from "./memory";
import { WebSearchEngine, SearchResult } from "../search/webSearch";
import { I18n } from "../utils/i18n";
export type AgentRole = "Orchestrator" | "CodeEngineer" | "ResearchAgent" | "InboxManager";
export class Agent {
  public name: string;
  public role: AgentRole;
  private memory: PersistentMemory;
  constructor(name: string, role: AgentRole, memory: PersistentMemory) { this.name = name; this.role = role; this.memory = memory; }
  public async executeTask(taskDescription: string, useWebSearch: boolean = false): Promise<string> {
    Logger.agent(this.name, `Starting task: "${taskDescription}"`);
    let searchData: SearchResult[] = [];
    if (useWebSearch || taskDescription.toLowerCase().includes("search") || taskDescription.toLowerCase().includes("sök")) {
      searchData = await WebSearchEngine.search(taskDescription, "Google");
    }
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = `${I18n.t("taskCompleted")} (${this.name}). ${searchData.length > 0 ? `Web data retrieved: ${searchData[0].snippet}` : ""}`;
    this.memory.addMemory("history", `Task executed by ${this.name}: ${taskDescription}`);
    return result;
  }
}
