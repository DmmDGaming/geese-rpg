// Imports
import os from "node:os";
import soundPlayer from "./helpers/soundPlayer";

if(await soundPlayer.checkLinux() === false) await soundPlayer.installLinux();

let time = Date.now();
let proc = soundPlayer.playSoundLinux({
    file: "D:/projects/geese-rpg/sounds/megalovania.mp3",
    time: 0,
    volume: 100
})

setTimeout(() => {
    let proc2 = soundPlayer.playSoundLinux({
        file: "D:/projects/geese-rpg/sounds/megalovania.mp3",
        time: Date.now() - time,
        volume: 50
    })
    proc.kill("SIGINT");
    console.log("HIII")
}, 5000)