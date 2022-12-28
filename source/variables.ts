// Imports
import path from "node:path";
import url from "node:url";

// Variables
let pathRoot = path.resolve(url.fileURLToPath(import.meta.url), "../../");
let pathAssets = path.resolve(pathRoot, "assets/"); 
let pathVendors = path.resolve(pathRoot, "vendors/");

// Exports
export {
    pathAssets,
    pathRoot,
    pathVendors
};
