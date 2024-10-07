import { ChangeEvent, useContext } from "react";
import hudContext from "../context/hud-context";

const Hud = () => {

    const { hudOptions, setHudOptions } = useContext(hudContext);

    const changeSpeed = (ev: any) => {
        setHudOptions({ ...hudOptions, speed: Number(ev.target.value)});
    }

    const changeOrbitScale = (ev: any) => {
        setHudOptions({ ...hudOptions, orbitScale: Number(ev.target.value)});
    }

    return 
	{/*
        <div className="bg-gray-800 rounded-md border-gray-600 border
         w-44 h-50 absolute flex flex-col top-2 left-2 z-50 text-white justify-center items-center">
            <div>
                <label htmlFor="speed-range" className="block mb-2 text-sm font-medium dark:text-white">Speed</label>
                <input id="speed-range" type="range" onChange={(ev) => changeSpeed(ev)} defaultValue={1}
                min={1} max={10} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            </div>
            <div>
                <label htmlFor="orbit-scale" className="block mb-2 text-sm font-medium dark:text-white">Scale</label>
                <input id="orbit-scale" type="range" onChange={(ev) => changeOrbitScale(ev)} defaultValue={1}
                min={1} max={10} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            </div>
        </div>
	*/}
    
}

export default Hud;
