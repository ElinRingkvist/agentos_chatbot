"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenMausBotConnector = void 0;
cat << 'EOF' > src / connectors / mausBot.ts;
const logger_1 = require("../utils/logger");
class OpenMausBotConnector {
    static async moveAndClick(coords, button = "left") {
        logger_1.Logger.info("MausBot", `Simulating OS GUI Action: Moving cursor to (${coords.x}, ${coords.y}) and clicking [${button}]...`);
        await new Promise((resolve) => setTimeout(resolve, 500));
        logger_1.Logger.success("MausBot", `Executed GUI click at (${coords.x}, ${coords.y}).`);
    }
    static async typeText(text) {
        logger_1.Logger.info("MausBot", `Simulating OS Keystrokes: "${text}"`);
        await new Promise((resolve) => setTimeout(resolve, 300));
        logger_1.Logger.success("MausBot", "Keystrokes successfully sent to target active window.");
    }
}
exports.OpenMausBotConnector = OpenMausBotConnector;
EOF;
