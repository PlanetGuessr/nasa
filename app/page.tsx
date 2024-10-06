"use client"
import 'aframe';
import Image from "next/image";
import { useEffect } from "react";
import SolarSystem from './components/solar-system';

export default function Home() {

  useEffect(()=> {

    if (typeof window !== 'undefined') {
      require('aframe');
    }

  }, [])

  return (
    <>
      <a-scene
        device-orientation-permission-ui="enabled: false"
        background="color: black">
        <a-entity camera look-controls wasd-controls position="0 2 4">
          <SolarSystem/>
        </a-entity>
      </a-scene>
    </>
  );
}
