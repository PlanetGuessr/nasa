"use client"

import { useEffect, useState } from "react";
import SolarSystem from './components/solar-system';
import dynamic from 'next/dynamic';

const dynamicComponent = dynamic(
  () => import('./main'),
  {ssr: false}
)

export default function Home() {


  useEffect(() => {
  }, [])

  return (
    <>
      <dynamicComponent/>
    </>
  );
}
