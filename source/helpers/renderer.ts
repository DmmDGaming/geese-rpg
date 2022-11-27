// Imports
import blessed from "blessed";
import blessedContrib from "blessed-contrib";

// Variables
let screen = blessed.screen({
    smartCSR: true
});

// Tests
let box = blessed.box({
    top: "center",
    left: "center",
    width: "50%",
    height: "50%",
    // content: "hello",
    tags: true,
    // border: {
    //     "type": "line"
    // },
    // style: {
    //     fg: "white",
    //     bg: "magenta"
    // }
})

let image = blessed.image({
    parent: box,
    top: 0,
    left: 0,
    type: "overlay",
    width: "shrink",
    height: "shrink",
    file: "D:/projects/geese-rpg/textures/stick.png",
    search: false
});
screen.append(box);

    // Render
screen.render();
