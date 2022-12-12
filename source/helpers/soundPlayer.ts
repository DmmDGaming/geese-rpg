// Imports
import childProcess from "node:child_process";
import decompress from "decompress";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import url from "node:url";

// Constants
const vendorPath = path.join(url.fileURLToPath(import.meta.url), "../../../vendor");

// Functions
function checkPlayer(): Promise<boolean> {
    switch(os.platform()) {
        case "darwin": return checkPlayerDarwin();
        case "linux": return checkPlayerLinux();
        case "win32": return checkPlayerWindows();
        default: return new Promise(resolve => resolve(false));
    }
}

function checkPlayerDarwin(): Promise<boolean> {
    return new Promise(resolve => {
        childProcess.exec("which ffplay", error => resolve(!error));
    });
}

function checkPlayerLinux(): Promise<boolean> {
    return new Promise(resolve => {
        childProcess.exec("which ffplay", error => resolve(!error));
    });
}

function checkPlayerWindows(): Promise<boolean> {
    return new Promise(resolve => {
        fs.access(path.join(vendorPath, "ffmpeg"), fs.constants.F_OK)
            .then(() => resolve(true))
            .catch(() => resolve(false))
    });
}

function installPlayer(): Promise<boolean> {
    switch(os.platform()) {
        case "darwin": return installPlayerDarwin();
        case "linux": return installPlayerLinux();
        case "win32": return installPlayerWindows();
        default: return new Promise(resolve => resolve(false));
    }
}

function installPlayerDarwin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        childProcess.exec("which brew", errorWhich => {
            if(errorWhich) return resolve(false);
            childProcess.exec("brew install ffmpeg", errorInstall => resolve(!errorInstall));
        })
    });
}

function installPlayerLinux(): Promise<boolean> {
    return new Promise(async resolveInstall => {
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
    }) ;
}

function installPlayerWindows(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        decompress(path.join(vendorPath, "ffmpeg.zip"), vendorPath)
            .then(() => resolve(true))
            .catch(() => resolve(false));
    });
}

function parseTime(time: number): string {
    let hours = Math.trunc(time / 1000 / 60 / 60).toString().padStart(2, "0");
    let minutes = Math.trunc(time / 1000 / 60 % 60).toString().padStart(2, "0");
    let seconds = Math.trunc(time / 1000 % 60).toString().padStart(2, "0");
    let milliseconds = Math.trunc(time % 1000).toString().padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function playSound(options: playSoundOptions): childProcess.ChildProcessWithoutNullStreams | null {
    switch(os.platform()) {
        case "darwin": return playSoundDarwin(options);
        case "linux": return playSoundLinux(options);
        case "win32": return playSoundWindows(options);
        default: return null;
    }
}

function playSoundDarwin(options: playSoundOptions): childProcess.ChildProcessWithoutNullStreams {
    return childProcess.spawn(
        "ffplay",
        [
            options.file,
            "-nodisp", "-autoexit", "-loglevel", "quiet",
            "-volume", options.volume.toString(),
            "-b:v", "10M",
            "-ss", parseTime(options.time)
        ]
    );
}

function playSoundLinux(options: playSoundOptions): childProcess.ChildProcessWithoutNullStreams {
    return childProcess.spawn(
        "ffplay",
        [
            options.file,
            "-nodisp", "-autoexit", "-loglevel", "quiet",
            "-volume", options.volume.toString(),
            "-b:v", "10M",
            "-ss", parseTime(options.time)
        ]
    );
}

function playSoundWindows(options: playSoundOptions): childProcess.ChildProcessWithoutNullStreams {
    return childProcess.spawn(
        path.join(vendorPath, "ffmpeg/bin/ffplay.exe"),
        [
            options.file,
            "-nodisp", "-autoexit", "-loglevel", "quiet",
            "-volume", options.volume.toString(),
            "-b:v", "10M",
            "-ss", parseTime(options.time)
        ]
    );
}

// Exports
export default {
    vendorPath,
    checkPlayer,
    checkPlayerDarwin,
    checkPlayerLinux,
    checkPlayerWindows,
    installPlayer,
    installPlayerDarwin,
    installPlayerLinux,
    installPlayerWindows,
    parseTime,
    playSound,
    playSoundDarwin,
    playSoundLinux,
    playSoundWindows
}
