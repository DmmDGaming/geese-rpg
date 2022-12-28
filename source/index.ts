// for(let i = 0; i < 50; i++) {
//     console.log("█".repeat(200))
// }

import { assets, chunkAsset } from "./loader";
import { deltaFrame, drawFrame, generateElementAsset, renderFrame } from "./renderer";
let heart = chunkAsset(assets["test.png"], 8, 8)[0];
let x = 0, y = 0;
process.stdin.on("keypress", (str, key) => {
    if(key.ctrl && key.name === "c") process.exit();
    if(key.name === "left") x--;
    if(key.name === "right") x++;
    if(key.name === "up") y--;
    if(key.name === "down") y++;
    console.clear();
    console.log(x, y)
    let element = generateElementAsset(heart, x, y);
    let frame = renderFrame([ element ]);
    process.stdout.write("\x1b[?25l")
    // let delta = deltaFrame(frame, { data: [], height: 50, width: 200 });
    // drawFrame(delta);
    for(let i = 0; i < 25 i++) {
        for(let j = 0; j < 100; j++) {
            let cell = frame[i * 200 + j];
            process.stdout.write(`\x1b[48;2;${cell.r};${cell.g};${cell.b}m `)
        }
        process.stdout.write("\x1b[49m\n")
    }
})