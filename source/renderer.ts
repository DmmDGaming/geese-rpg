// Imports
// @ts-ignore
import ansiAlign from "ansi-align";
import chalk from "chalk";
import colorBlend from "color-blend";
import readline from "node:readline";
import stringWidth from "string-width";
import wordWrap from "word-wrap";

// Keypress
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.resume();

// Functions
function deltaFrame(frame: Renderer.frameData, lastFrame: Renderer.frameData): Renderer.drawData[] {
    
}

function drawFrame(delta: Renderer.deltaData[]): void {

}

function isElement(element: unknown): element is Renderer.elementData {
    return element !== null && typeof element === "object" && "type" in element && element.type === "element";
}

function isText(element: unknown): element is Renderer.textData {
    return element !== null && typeof element === "object" && "type" in element && element.type === "text";
}

function generateElementAsset(asset: Loader.assetData, x: number, y: number): Renderer.elementData {
    return {
        data: asset.data,
        height: asset.height,
        type: "element",
        width: asset.width,
        x, y
    };
}

function generateElementSolid(
    color: Renderer.colorData,
    height: number, width: number,
    x: number, y: number
): Renderer.elementData {
    return {
        data: new Array(height * width).fill(color),
        height, type: "element", width, x, y
    };
}

function generateText() {

}

function getSize(): { area: number, height: number, width: number } {
    let height = process.stdout.rows * 2;
    let width = process.stdout.columns
    return { area: height * width, height, width };
}

function renderFrame(elements: (Renderer.elementData | Renderer.textData)[]): Renderer.frameData {
    let size = getSize();
    let canvas = new Array(10000).fill({ r: 0, g: 0, b: 0, a: 1 });
    for(let i = 0; i < elements.length; i++) {
        let element = elements[i];
        if(isElement(element)) {
            for(let j = Math.abs(Math.min(element.y, 0)); j < element.height - Math.max(element.y + element.height - 50, 0); j++) {
                for(let k = Math.abs(Math.min(element.x, 0)); k < element.width - Math.max(element.x + element.width - 200, 0); k++) {
                    canvas[(element.y + j) * 200 + element.x + k] = element.data[j * element.width + k];
                }
            }
        }
        else if(isText(element)) {}
    }
    return canvas;
}

// Exports
export {
    deltaFrame,
    drawFrame,
    generateElementAsset,
    generateElementSolid,
    generateText,
    getSize,
    renderFrame
};
