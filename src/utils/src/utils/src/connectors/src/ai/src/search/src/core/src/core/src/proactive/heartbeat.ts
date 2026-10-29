cat << 'EOF' > src/proactive/heartbeat.ts
import { Logger } from "../utils/logger";
import { PersistentMemory } from "../core/memory";
import { Agent } from "../core/agent";
import { I18n } from "../utils/i18n";

export class ProactiveHeartbeat {
  private memory: PersistentMemory;
  private orchestrator: Agent;
  private timer: NodeJS.Timeout | null = null;

  constructor(memory: PersistentMemory, orchestrator: Agent) {
    this.memory = memory;
    this.orchestrator = orchestrator;
  }

  public startHeartbeat(intervalMs: number = 10000) {
    Logger.info("Heartbeat", "Starting proactive background heartbeat scanner...");

    this.timer = setInterval(async () => {
      await this.runBackgroundSweep();
    }, intervalMs);
  }

  public stopHeartbeat() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private async runBackgroundSweep() {
    Logger.info("Heartbeat", "Performing routine background sweep (Files, Inboxes, Repositories)...");

    Logger.success("Heartbeat", "Proactive Trigger: Generating Morning Digest...");
    const context = this.memory.getContextDump();
    Logger.agent(
      this.orchestrator.name,
      `${I18n.t("morningDigestTitle")}\n${context}`
    );
  }
}
EOF
