"use client"
import SolarSystem from "./components/solar-system";
import 'aframe';
import {useEffect} from "react";

const Main = () => {
    useEffect(() => {
        const debugEl = document.getElementById("debugText");
        const log = (msg: any) => {
            console.log(msg);
            if (debugEl) {
                debugEl.setAttribute("text", msg);
            }
        };

        const scene = document.querySelector("a-scene");
        scene.addEventListener("enter-vr", () => {
            log("XR session started");
        });

        scene.addEventListener("loaded", () => {
            log("Scene loaded");
        });
    }, []);

    return (
        <a-scene
            device-orientation-permission-ui="enabled: false"
            webxr="requiredFeatures: hit-test local-floor; optionalFeatures: dom-overlay unbounded; overlayElement: #overlay;"

            xr-mode-ui="enabled: true; enterAREnabled: true; enterARButton: #myEnterARButton;  XRMode: xr;"
            renderer="alpha: true; colorManagement: true; antialias: true; foveationLevel: 1; physicallyCorrectLights: true"
        >
            <a-entity id="debugText"
                      position="0 2 -2"
                      text="value: Loading...; color: lime; width: 4">
            </a-entity>
            <a id="myEnterARButton" href="#">TOCAME AR PLS</a>
            <a-entity camera look-controls wasd-controls="acceleration:250; fly:true" position="0 10 150">
            </a-entity>
            <SolarSystem/>
        </a-scene>
    )
}

export default Main;