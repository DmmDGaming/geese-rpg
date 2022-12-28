// Imports
import childProcess from "node:child_process";
import decompress from "decompress";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathVendors } from "./variables";

// Functions
function checkPlayer(): Promise<boolean> {
    switch(os.platform()) {
        case "darwin":
        case "linux": return new Promise(resolve => {
            childProcess.exec("which ffplay", error => resolve(!error));
        });
        case "win32": return new Promise(resolve => {
            fs.access(path.join(pathVendors, "ffmpeg"), fs.constants.F_OK)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
        default: return new Promise(resolve => resolve(false));
    }
}

function executePlayer(sound: SoundPlayer.soundData): childProcess.ChildProcessWithoutNullStreams | null {
    let options = [
        sound.file,
        "-nodisp", "-autoexit", "-loglevel", "quiet",
        "-volume", (sound.volume ?? 100).toString(),
        "-ss", formatTimestamp(sound.time ?? 0)
    ];
    switch(os.platform()) {
        case "darwin":
        case "linux": return childProcess.spawn("ffplay", options);
        case "win32": return childProcess.spawn(path.join(pathVendors, "ffmpeg/bin/ffplay.exe"), options);
        default: return null;
    }
}

function formatTimestamp(time: number): string {
    let hours = Math.trunc(time / 1000 / 60 / 60).toString().padStart(2, "0");
    let minutes = Math.trunc(time / 1000 / 60 % 60).toString().padStart(2, "0");
    let seconds = Math.trunc(time / 1000 % 60).toString().padStart(2, "0");
    let milliseconds = Math.trunc(time % 1000).toString().padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function installPlayer(): Promise<boolean> {
    switch(os.platform()) {
        case "darwin": return new Promise(resolve => {
            childProcess.exec("which brew", errorWhich => {
                if(errorWhich) return resolve(false);
                childProcess.exec("brew install ffmpeg", errorInstall => resolve(!errorInstall));
            });
        });
        case "linux": return new Promise(async resolveInstall => {
            let commands = {
                "apt": "sudo apt install ffmpeg -y",
                "dnf": "sudo dnf install ffmpeg -y",
                "pacman": "sudo pacman -S ffmpeg"
            };
            let installers = Object.keys(commands);
            for(let i = 0; i < installers.length; i++) {
                let installer = installers[i];
                let found = await new Promise(resolveFind => {
                    childProcess.exec(`which ${installer}`, errorWhich => {
                        if(errorWhich) return resolveFind(false);
                        childProcess.exec(
                            commands[installer as keyof typeof commands],
                            errorInstall => resolveFind(!errorInstall)
                        );
                    });
                });
                if(found) return resolveInstall(true);
            }
            resolveInstall(false);
        });
        case "win32": return new Promise(resolve => {
            decompress(path.join(pathVendors, "ffmpeg.zip"), pathVendors)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
        default: return new Promise(resolve => resolve(false));
    }
}

// Exports
export {
    checkPlayer,
    executePlayer,
    formatTimestamp,
    installPlayer
};
