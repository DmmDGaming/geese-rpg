// Imports
import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

// Definitions
interface playSoundOptions {
    file: string,
    time: number,
    volume: number,
}

// Functions
function parseTime(time: number): string {
    let hours = Math.trunc(time / 1000 / 60 / 60).toString().padStart(2, "0");
    let minutes = Math.trunc(time / 1000 / 60 % 60).toString().padStart(2, "0");
    let seconds = Math.trunc(time / 1000 % 60).toString().padStart(2, "0");
    let milliseconds = Math.trunc(time % 1000).toString().padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// function checkDarwin(): boolean {

// }

async function checkLinux(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        childProcess.exec("which ffmpeg", (error, stdout, stderr) => {
            if(error) resolve(false);
            else resolve(true);
        });
    });
}

async function checkWindows(): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(true));
}

// function installDarwin(): boolean {

// }

function installLinux(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let commands = {
            "apt": "sudo apt install ffmpeg -y",
            "dnf": "sudo dnf install ffmpeg -y",
            "pacman": "sudo pacman -S ffmpeg"
        };
        let installers = Object.keys(commands);
        for(let i = 0; i < installers.length; i++) {
            let installer = installers[i];
            let found = false;
            childProcess.exec(`which ${installer}`, (errorWhich, stdoutWhich, stderrWhich) => {
                if(!errorWhich) childProcess.exec(commands[installer as keyof typeof commands], (errorInstall, stdoutInstall, stderrInstall) => {
                    if(!errorInstall) found = true;
                });
            })
            if(found) return resolve(true);
        }
        resolve(false);
    })
}

async function installWindows(): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(true));
}

// function playSoundDarwin(options: playSoundOptions): childProcess.ChildProcessWithoutNullStreams {

// }

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
    checkLinux,
    checkWindows,
    installLinux,
    installWindows,
    playSoundLinux,
    playSoundWindows
}