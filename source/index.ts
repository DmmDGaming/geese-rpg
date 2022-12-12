import soundPlayer from "./helpers/soundPlayer";
import readline from "node:readline";
import chalk from "chalk";

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {
    if(key.ctrl && key.name === "c") process.exit();
})
if(!(await soundPlayer.checkPlayer())) {
    console.log(chalk.redBright("i need to download ffmpeg plz giv permission"))
    console.log(chalk.yellowBright("press enter to allow"))
    console.log(chalk.yellowBright("press ctrl + c to exit"))
    let installed = false;
    process.stdin.on("keypress", async (key, str) => {
        if(key.name === "return" && !installed) {
            installed = true;
            console.log("downloading...")
            await soundPlayer.installPlayer();
            console.log("complete")
            play();
        }
    })
}
else {
    console.log(chalk.greenBright("ffmpeg found i commit play sick musik"))
    console.log(chalk.yellowBright("press ctrl + c to exit"))
    play();
}

async function play() {    
    console.log("enjoy - DUET (Omori) by Omocat")
    await soundPlayer.playSound({
        file: "sounds/omori.mp3",
        time: 0,
        volume: 100
    })
}