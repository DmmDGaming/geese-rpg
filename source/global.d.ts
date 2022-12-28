declare global {
    namespace Loader {
        interface assetData {
            data: Renderer.colorData[];
            height: number;
            width: number;
        }
    }

    namespace Renderer {
        interface colorData {
            r: number;
            g: number;
            b: number;
            a: number;
        }

        interface deltaData {
            data: colorData[];
            x: number;
            y: number;
        }

        interface elementData {
            data: colorData[];
            height: number;
            type: "element";
            width: number;
            x: number;
            y: number;
        }

        interface frameData {
            data: colorData[];
            height: number;
            width: number;
        }

        interface textData {
            align: string;
            height: number;
            text: string;
            type: "text";
            width: number;
            x: number;
            y: number;
        }
    }

    namespace Shader {
        
    }

    namespace SoundPlayer {
        interface soundData {
            file: string;
            time?: number;
            volume?: number;
        }
    }
}

// Exports
export {};
