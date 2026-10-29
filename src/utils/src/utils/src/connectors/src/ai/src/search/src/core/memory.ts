cat << 'EOF' > src/core/memory.ts
import * as fs from "fs";
import * as path from "path";
import { Logger } from "../utils/logger";
import { I18n } from "../utils/i18n";

export interface MemoryEntry {
  id: string;
  category: "preference" | "code_context" | "history" | "skill";
  content: string;
  timestamp: string;
}

export class PersistentMemory {
  private memoryFilePath: string;
  private entries: MemoryEntry[] = [];

  constructor() {
    this.memoryFilePath = path.join(process.cwd(), ".agent_memory.json");
    this.loadMemory();
  }

  private loadMemory() {
    if (fs.existsSync(this.memoryFilePath)) {
      try {
        const raw = fs.readFileSync(this.memoryFilePath, "utf-8");
        this.entries = JSON.parse(raw);
        Logger.info("Memory", `${I18n.t("memoryLoaded")} (${this.entries.length} items)`);
      } catch (err) {
        Logger.error("Memory", "Failed to parse persistent memory file.");
      }
    } else {
      this.entries = [
        {
          id: "init-1",
          category: "preference",
          content: "User prefers offline-first, multi-language execution with local GUI automation and HuggingFace LLMs.",
          timestamp: new Date().toISOString(),
        },
      ];
      this.saveMemory();
    }
  }

  public saveMemory() {
    fs.writeFileSync(this.memoryFilePath, JSON.stringify(this.entries, null, 2), "utf-8");
  }

  public addMemory(category: MemoryEntry["category"], content: string) {
    const entry: MemoryEntry = {
      id: `mem-${Date.now()}`,
      category,
      content,
      timestamp: new Date().toISOString(),
    };
    this.entries.push(entry);
    this.saveMemory();
    Logger.success("Memory", `Added persistent record [${category}]: ${content}`);
  }

  public searchMemory(query: string): MemoryEntry[] {
    const lowerQuery = query.toLowerCase();
    return this.entries.filter((entry) => entry.content.toLowerCase().includes(lowerQuery));
  }

  public getContextDump(): string {
    return this.entries.map((e) => `[${e.category.toUpperCase()}] ${e.content}`).join("\n");
  }
}
EOF
