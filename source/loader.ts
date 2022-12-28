// Imports
import getPixels from "get-pixels";
import klaw from "klaw";
import path from "node:path";
import { pathAssets } from "./variables";

// Functions
function chunkAsset(asset: Loader.assetData, height: number, width: number): Loader.assetData[] {
    let chunks: Loader.assetData[] = [];
    for(let i = 0; i < asset.height; i += height) {
        for(let j = 0; j < asset.width; j += width) {
            let chunk: Loader.assetData = { data: [], height, width };
            for(let k = 0; k < height; k++)
                chunk.data = chunk.data.concat(asset.data.slice((i + k) * asset.height + j, (i + k) * asset.height + j + width));
            chunks.push(chunk);
        }
    }
    return chunks;
}

async function loadAssets(): Promise<{ [ file: string ]: Loader.assetData }> {
    let assets: { [ file: string ]: Loader.assetData } = {};
    for await(let file of klaw(pathAssets)) {
        if(path.extname(file.path) !== ".png") continue;
        let asset: Loader.assetData = await new Promise((resolve, reject) => {
            getPixels(file.path, (error, pixels) => {
                if(error) reject(error);
                let [ width, height, channels ] = pixels.shape;
                let data = [];
                for(let i = 0; i < pixels.data.length; i += channels) {
                    let [ r, g, b, a ] = pixels.data.slice(i, i + channels);
                    data.push({ r, g, b, a: parseFloat((a / 255).toFixed(3)) });
                }
                resolve({ data, height, width });
            })
        });
        assets[path.relative(pathAssets, file.path).replaceAll("\\", "/")] = asset;
    }
    return assets;
}

// Exports
export const assets = await loadAssets();
export {
    chunkAsset,
    loadAssets
};
