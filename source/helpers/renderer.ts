// Imports
import ansiAlign from "ansi-align";
import chalk from "chalk";
import colorBlend from "color-blend";
import getPixels from "get-pixels";
import readline from "node:readline";
import stringWidth from "string-width";
import wordWrap from "word-wrap";

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
  process.stdin.setRawMode(true);

// Functions
function parsePNG(path: string): Promise<pixelData[][]> {
    return new Promise((resolve, reject) => {
        getPixels(path, (error, ndarray) => {
            if(error) return reject(error);
            let width = ndarray.shape[0];
            let pixels: pixelData[][] = [];
            for(let i = 0; i < ndarray.data.length; i += 4 * width) {
                let row: pixelData[] = [];
                for(let j = i; j < i + 4 * width; j += 4) {
                    row.push({
                        r: ndarray.data[j],
                        g: ndarray.data[j + 1],
                        b: ndarray.data[j + 2],
                        a: ndarray.data[j + 3] / 255
                    });
                }
                pixels.push(row);
            }
            resolve(pixels);
        });
    });
}

function renderFrame(elements: elementData) {

}