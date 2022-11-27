// Imports
import childProcess from "node:child_process";
import path from "node:path";
import url from "node:url";

// Functions
function checkDarwin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        childProcess.exec("which ffplay", (error, stdout, stderr) => {
            if(error) resolve(false);
            else resolve(true);
        });
    });
}

function checkLinux(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        childProcess.exec("which ffplay", (error, stdout, stderr) => {
            if(error) resolve(false);
            else resolve(true);
        });
    });
}

function checkWindows(): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(true));
}

function installDarwin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        childProcess.exec("which brew", (errorWhich, stdoutWhich, stderrWhich) => {
            if(errorWhich) return resolve(false);
            childProcess.exec(
                "brew install ffmpeg",
                (errorInstall, stdoutInstall, stderrInstall) => resolve(!errorInstall)
            );
        })
    });
}

function installLinux(): Promise<boolean> {
    return new Promise(async (resolveInstall, rejectInstall) => {
        let commands = {
            "apt": "sudo apt install ffmpeg -y",
            "dnf": "sudo dnf install ffmpeg -y",
            "pacman": "sudo pacman -S ffmpeg"
        };
        let installers = Object.keys(commands);
        for(let i = 0; i < installers.length; i++) {
            let installer = installers[i];
            let found = await new Promise((resolveFind, rejectFind) => {
                childProcess.exec(`which ${installer}`, (errorWhich, stdoutWhich, stderrWhich) => {
                    if(errorWhich) return resolveFind(false);
                    childProcess.exec(
                        commands[installer as keyof typeof commands],
                        (errorInstall, stdoutInstall, stderrInstall) => resolveFind(!errorInstall)
                    );
                });
            });
            if(found) return resolveInstall(true);
        }
        resolveInstall(false);
    }) ;
}

function installWindows(): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(true));
}

function parseTime(time: number): string {
    let hours = Math.trunc(time / 1000 / 60 / 60).toString().padStart(2, "0");
    let minutes = Math.trunc(time / 1000 / 60 % 60).toString().padStart(2, "0");
    let seconds = Math.trunc(time / 1000 % 60).toString().padStart(2, "0");
    let milliseconds = Math.trunc(time % 1000).toString().padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function playSoundDarwin(options: playSoundOptions): childProcess.ChildProcessWithoutNullStreams {
    return childProcess.spawn(
        "ffplay",
        [
            options.file,
            "-nodisp", "-autoexit", "-loglevel", "quiet",
            "-volume", options.volume.toString(),
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
            "-ss", parseTime(options.time)
        ]
    );
}

function playSoundWindows(options: playSoundOptions): childProcess.ChildProcessWithoutNullStreams {
    return childProcess.spawn(
        path.join(url.fileURLToPath(import.meta.url), "../../../vendor/ffmpeg/bin/ffplay.exe"),
        [
            options.file,
            "-nodisp", "-autoexit", "-loglevel", "quiet",
            "-volume", options.volume.toString(),
            "-ss", parseTime(options.time)
        ]
    );
}

// Exports
export default {
    parseTime,
    checkDarwin,
    checkLinux,
    checkWindows,
    installDarwin,
    installLinux,
    installWindows,
    playSoundDarwin,
    playSoundLinux,
    playSoundWindows
}
