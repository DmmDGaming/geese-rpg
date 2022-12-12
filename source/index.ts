import soundPlayer from "./helpers/soundPlayer";
import readline from "node:readline";
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

if(!(await soundPlayer.checkPlayer())) {
    console.log("i need to download ffmpeg plz giv permission")
    await soundPlayer.installPlayer();
}
else console.log("ffmpeg found i commit play sick musik")
console.log("enjoy - DUET (Omori) by Omocat")
console.log(await soundPlayer.playSound({
    file: "sounds/omori.mp3",
    time: 0,
    volume: 100
}))
