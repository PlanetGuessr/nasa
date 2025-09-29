"use client";
import "aframe";
import SolarSystem from "@/app/components/solar-system";

const Main = () => {
    return (
        <a-scene
            xr-mode-ui="enabled: true; enterAREnabled: true; XRMode: xr;"
            webxr="mode: ar; requiredFeatures: hit-test,local-floor; optionalFeatures: dom-overlay; overlayElement: #overlay;"
            renderer="alpha: true; colorManagement: true; physicallyCorrectLights: true"
            embedded
        >
            <a-entity id="solar-system" position="0 0 -3" scale="0.05 0.05 0.05">
                <SolarSystem />
            </a-entity>

            {/* Overlay container for DOM overlay in AR */}
            <div id="overlay" style={{ position: "absolute", top: 0, left: 0, color: "white" }}>
            </div>

            {/* Camera */}
            <a-entity camera look-controls></a-entity>

            {/*/!* Simple object *!/*/}
            {/*<a-box position="0 0 -2" color="red"></a-box>*/}

            {/* Custom AR button */}
            <a id="myEnterARButton" href="#" style={{ color: "yellow" }}>
                ENTER AR
            </a>

        </a-scene>
    );
};

export default Main;