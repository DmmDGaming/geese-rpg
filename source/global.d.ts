declare global {
    namespace Raw {
        interface eggData {
            id: string,
            sounds: string[],
            tags: string[],
            textures: string[]
        }

        interface gooseData {
            id: string,
            sounds: string[],
            tags: string[],
            textures: string[]
        }

        interface itemData {
            attack?: number,
            attackDeviation?: number,
            defense?: number,
            defenseDeviation?: number,
            healing?: number,
            id: string,
            rarity: string,
            sounds: string[],
            stack: number,
            tags: string[],
            textures: string[]
        }

        interface languageData {
            id: string,
            [ source: string ]: string
        }

        interface mapData {
            lootTable: {
                count: number,
                countDeviation: number,
                countTrend:
                    "exponentialDecay" | "exponentialGrowth" |
                    "linearDecay" | "linearGrowth" |
                    "logarithmicDecay", "logarithmicGrowth",
                id: string,
            }[],
            id: string,
            sounds: string[],
            textures: string[]
        }

        interface recipeData {
            count: number,
            id: number,
            items: {
                count: number,
                id: string
            }[],
        }
    }

    namespace Save {  
        interface eggData {
            hatchTime: number,
            id: string,
            tags: string[]
        }

        interface gooseData {
            armor: itemData | null,
            id: string,
            inventory: inventoryData,
            name: string,
            weapon: itemData | null
        }

        interface itemData {
            attack?: number,
            count: number,
            defense?: number,
            healing?: number,
            id: string,
            rarity: string,
            tags: string[]
        }

        interface inventoryData {
            capacity: number,
            items: itemData[]
        }

        interface playerData {
            gaggle: {
                capacity: number,
                geese: gooseData[],
                tags: string[]
            },
            gold: number,
            inventory: inventoryData,
            name: string
            nest: {
                capacity: number,
                eggs: eggData[]
            }
        }
    }
       
    interface playSoundOptions {
        file: string,
        time: number,
        volume: number,
    }
}

// Exports
export {};