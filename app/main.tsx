"use client"
import SolarSystem from "./components/solar-system";
import 'aframe';

const Main = () => {

    return (
        <a-scene
            device-orientation-permission-ui="enabled: false"
            xr-mode-ui="enabled: true"
            webxr="mode: ar; optionalFeatures: hit-test; requiredFeatures: local-floor;"
            renderer="alpha: true; colorManagement: true; physicallyCorrectLights: true"
            background="transparent: true"
        >
            <a-entity camera look-controls wasd-controls="acceleration:250; fly:true" position="0 10 150">
            </a-entity>
            <SolarSystem />
        </a-scene>
    )
}

export default Main;