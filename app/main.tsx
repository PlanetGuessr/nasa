"use client"
import SolarSystem from "./components/solar-system";
import 'aframe';

const Main = () => {

    return (
        <a-scene
            device-orientation-permission-ui="enabled: false"
            webxr="requiredFeatures: hit-test,local-floor; optionalFeatures: dom-overlay,unbounded; overlayElement: #overlay;"

            xrweb="mode: immersive-ar; requiredFeatures: hit-test; optionalFeatures: dom-overlay; overlayElement: #overlay"
            xr-mode-ui="enabled: true; enterAREnabled: true; enterARButton: #myEnterARButton;  XRMode: xr;"
            renderer="alpha: true; colorManagement: true; antialias: true; foveationLevel: 1; physicallyCorrectLights: true"
        >
            <a id="myEnterARButton" href="#">TOCAME AR PLS</a>
            <a-entity camera look-controls wasd-controls="acceleration:250; fly:true" position="0 10 150">
            </a-entity>
            <SolarSystem/>
        </a-scene>
    )
}

export default Main;