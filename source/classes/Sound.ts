// Imports
import childProcess from "node:child_process";
import os from "node:os";
import path from "node:path";

// Class
class Sound {
    private _muted: boolean = false;
    private _pauseBuffer: number = 0;
    private _pauseTime: number | null = Date.now();
    private _process: childProcess.ChildProcessWithoutNullStreams | null = null;
    private _startTime: number = Date.now();
    private _volume: number = 100;
    readonly file: string = "";
    
    constructor(file: string) {
        this.file = file;
    }

    get duration(): string {
        let elapsed = this.elapsed;
        let hours = Math.trunc(elapsed / 1000 / 60 / 60).toString().padStart(2, "0");
        let minutes = Math.trunc(elapsed / 1000 / 60 % 60).toString().padStart(2, "0");
        let seconds = Math.trunc(elapsed / 1000 % 60).toString().padStart(2, "0");
        let milliseconds = Math.trunc(elapsed % 1000).toString().padStart(3, "0");
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    get elapsed(): number {
        return Date.now() - this._startTime - this._pauseBuffer - (this._pauseTime === null ? 0 : (Date.now() - this._pauseTime));
    }

    mute(): void {
        this._muted = true;
    }

    pause(): void {
        if(this._pauseTime !== null) return;
        this._pauseTime = Date.now();
        if(this._process !== null) {
            this._process.kill("SIGINT");
            this._process = null;
        }
    }

    get paused(): boolean {
        return this._pauseTime !== null;
    }

    get process(): childProcess.ChildProcess | null {
        return this._process;
    }

    resume(): childProcess.ChildProcessWithoutNullStreams | null {
        if(this._pauseTime === null) return null;
        this._pauseBuffer += Date.now() - this._pauseTime;
        this._pauseTime = null;
        if(this._process === null) {
            switch(os.platform()) {
                case "win32": {
                    this._process = childProcess.spawn(path.resolve("./vendor/ffmpeg/bin/ffplay.exe"), [
                        this.file,
                        "-autoexit", "-nodisp", "-loglevel", "quiet",
                        "-ss", this.duration,
                        "-volume", this.volume.toString()
                    ]);
                    return this._process;
                }
                default: return null;
            }
        }
        return null;
    }

    unmute(): void {
        this._muted = false;
    }
    
    get volume(): number {
        return this._muted ? 0 : this._volume;
    }

    set volume(volume: number) {
        if(!Number.isInteger(volume) || volume < 0 || volume > 100)
            throw new Error("Invalid volume value");
        this._volume = volume;
        this.pause();
        this.resume();
    }
}

// Exports
export default Sound;
