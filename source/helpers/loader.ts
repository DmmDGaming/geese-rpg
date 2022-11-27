// Imports
import fs from "node:fs/promises";
import path from "node:path";

// Functions
async function loadEggs(): Promise<{ [egg: string ]: Raw.eggData }> {
    let files = await fs.readdir("./eggs/");
    let eggs: { [ egg: string ]: Raw.eggData } = {};
    for(let i = 0; i < files.length; i++) {
        let file = await fs.readFile(path.resolve("./eggs/", files[i]));
        let egg: Raw.eggData = JSON.parse(file.toString());
        eggs[egg.id] = egg;
    }
    return eggs;
}

async function loadGeese(): Promise<{ [ goose: string ]: Raw.gooseData }> {
    let files = await fs.readdir("./geese/");
    let geese: { [ goose: string ]: Raw.gooseData } = {};
    for(let i = 0; i < files.length; i++) {
        let file = await fs.readFile(path.resolve("./geese/", files[i]));
        let goose: Raw.gooseData = JSON.parse(file.toString());
        geese[goose.id] = goose;
    }
    return geese;
}

async function loadItems(): Promise<{ [item: string ]: Raw.itemData }> {
    let files = await fs.readdir("./items/");
    let items: { [ item: string ]: Raw.itemData } = {};
    for(let i = 0; i < files.length; i++) {
        let file = await fs.readFile(path.resolve("./items/", files[i]));
        let item: Raw.itemData = JSON.parse(file.toString());
        items[item.id] = item;
    }
    return items;
}

async function loadLanguages(): Promise<{ [ language: string ]: Raw.languageData }> {
    let files = await fs.readdir("./languages/");
    let languages: { [ languages: string ]: Raw.languageData } = {};
    for(let i = 0; i < files.length; i++) {
        let file = await fs.readFile(path.resolve("./languages/", files[i]));
        let language: Raw.languageData = JSON.parse(file.toString());
        languages[language.id] = language;
    }
    return languages;
}

async function loadRecipes(): Promise<{ [recipe: string ]: Raw.recipeData }> {
    let files = await fs.readdir("./recipes/");
    let recipes: { [ recipe: string ]: Raw.recipeData } = {};
    for(let i = 0; i < files.length; i++) {
        let file = await fs.readFile(path.resolve("./recipes/", files[i]));
        let recipe: Raw.recipeData = JSON.parse(file.toString());
        recipes[recipe.id] = recipe;
    }
    return recipes;
}

async function loadSounds(): Promise<{ [ file: string ]: string }> {
    let files = await fs.readdir("./sounds/");
    let sounds: { [ file: string ]: string } = {};
    for(let i = 0; i < files.length; i++) sounds[files[i]] = path.resolve("./sounds/" + files[i]);
    return sounds;
}

async function loadTextures(): Promise<{ [ file: string ]: string }> {
    let files = await fs.readdir("./textures/");
    let textures: { [ file: string ]: string } = {};
    for(let i = 0; i < files.length; i++) textures[files[i]] = path.resolve("./textures/" + files[i]);
    return textures;
}

// Exports
export default {
    loadEggs,
    loadGeese,
    loadItems,
    loadLanguages,
    loadRecipes,
    loadSounds,
    loadTextures
}