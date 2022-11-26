import path from "path";
import Sound from "./classes/Sound";

let sound = new Sound(path.resolve("./sounds/megalovania.mp3"));
sound.resume();

setTimeout(() => {
    sound.volume = 50;
    console.log("test")
}, 5000)

// setTimeout(() => {
//     sound.resume();
//     console.log("resume")
// }, 10000)