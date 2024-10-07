import { createContext } from "react";

export type HudOptions = {
    speed: number,
    orbitScale: number;
}

const hudContext = createContext<any>({});

export default hudContext;