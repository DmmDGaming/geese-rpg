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
            if(error) return reject(error);
            if(stderr) return reject(stderr);
            console.log(`001 | DEBUG AT SOURCE/HELPERS/SOUNDPLAYER.TS:\n${stdout}`);
            resolve(stdout[0] === "/");
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
            childProcess.exec(`which ${installer}`, (errorWhich, stdoutWhich, stderrWhich) => {
                console.log(`002 | DEBUG AT SOURCE/HELPERS/SOUNDPLAYER.TS:\n${errorWhich}\n${stderrWhich}`);
                if(errorWhich || stderrWhich) return reject(errorWhich || stderrWhich);
                if(stdoutWhich[0] === "/") {
                    childProcess.exec(commands[installer as keyof typeof commands], (error, stdout, stderr) => {
                        console.log(`003 | DEBUG AT SOURCE/HELPERS/SOUNDPLAYER.TS:\n${error}\n${stderr}`);
                        if(error || stderr) return reject(error || stderr);
                        return resolve(true);
                    })
                }
            })
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