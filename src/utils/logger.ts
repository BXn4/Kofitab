type LogLevel = "INFO" | "DEBUG" | "WARN" | "ERROR" | "FATAL";

const Log = {
    Info: (message: string) => log("INFO", message),
    Debug: (message: string) => log("DEBUG", message),
    Warn: (message: string) => log("WARN", message),
    Error: (message: string) => log("ERROR", message),
    Fatal: (message: string) => log("FATAL", message),
};

function log(level: LogLevel, message: string): void {
    console.log(`[${level}] ${message}`);
}

export { Log };
