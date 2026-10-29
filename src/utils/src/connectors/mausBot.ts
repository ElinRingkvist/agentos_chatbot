import { Logger } from "../utils/logger";

export interface MouseCoordinates {
  x: number;
  y: number;
}

export class OpenMausBotConnector {
  public static async moveAndClick(coords: MouseCoordinates, button: "left" | "right" = "left"): Promise<void> {
    Logger.info("MausBot", `Simulating OS GUI Action: Moving cursor to (${coords.x}, ${coords.y}) and clicking [${button}]...`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    Logger.success("MausBot", `Executed GUI click at (${coords.x}, ${coords.y}).`);
  }

  public static async typeText(text: string): Promise<void> {
    Logger.info("MausBot", `Simulating OS Keystrokes: "${text}"`);
    await new Promise((resolve) => setTimeout(resolve, 300));
    Logger.success("MausBot", "Keystrokes successfully sent to target active window.");
  }
}
