"use client"
import 'aframe';
import { useEffect } from "react";
import SolarSystem from './components/solar-system';

export default function Home() {



  return (
    <>
      <a-scene
        device-orientation-permission-ui="enabled: false"
        background="color: black">
        <a-entity camera look-controls wasd-controls position="0 10 150">
        </a-entity>
        <SolarSystem />
      </a-scene>
    </>
  );
}
