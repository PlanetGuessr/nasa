"use client"
import 'aframe';
import { useState } from "react";
import SolarSystem from './components/solar-system';
import Hud from './components/hud';
import hudContext, { HudOptions } from './context/hud-context';

export default function Home() {

  const [hudOptions, setHudOptions] = useState<HudOptions>({ speed: 1, orbitScale: 1 });

  return (
    <>
      <hudContext.Provider value={{hudOptions, setHudOptions}}>
        <Hud />
        <a-scene
          device-orientation-permission-ui="enabled: false"
          background="color: black">
          <a-entity camera look-controls wasd-controls="acceleration:250; fly:true" position="0 10 150">
          </a-entity>
          <SolarSystem />
        </a-scene>
      </hudContext.Provider>
    </>
  );
}
