"use client";

import SolarSystem from "./components/solar-system";
import "aframe";
import { useEffect } from "react";
import * as THREE from "three";

const Main = () => {
    useEffect(() => {
        const scene = document.querySelector("a-scene") as any;
        const reticle = document.getElementById("reticle") as any;
        const planets = document.getElementById("planets") as any;

        if (!scene || !reticle || !planets) return;

        // Handle VR entry + select placement
        scene.addEventListener("enter-vr", () => {
            const xrSession = scene.renderer?.xr?.getSession?.();
            console.log("SESSION IS WORKING: ", xrSession);
            if (!xrSession) return;

            xrSession.addEventListener("select", () => {
                if (reticle.visible) {
                    const pos = reticle.object3D.position;
                    const rot = reticle.object3D.rotation;

                    planets.setAttribute("position", `${pos.x} ${pos.y} ${pos.z}`);
                    planets.setAttribute("rotation", `0 ${THREE.MathUtils.radToDeg(rot.y)} 0`);
                }
            });
        });

        // Reticle update loop
        scene.addEventListener("loaded", () => {
            scene.renderer.xr.addEventListener("sessionstart", () => {
                const xrSession = scene.renderer.xr.getSession();
                xrSession.requestReferenceSpace("viewer").then((refSpace: any) => {
                    xrSession
                        .requestHitTestSource({ space: refSpace })
                        .then((hitTestSource: any) => {
                            scene.renderer.xr.setAnimationLoop((_: any, frame: any) => {
                                const refSpace = scene.renderer.xr.getReferenceSpace();
                                const hitTestResults = frame.getHitTestResults(hitTestSource);

                                if (hitTestResults.length > 0) {
                                    const hit = hitTestResults[0];
                                    const pose = hit.getPose(refSpace);
                                    reticle.visible = true;
                                    reticle.object3D.position.set(
                                        pose.transform.position.x,
                                        pose.transform.position.y,
                                        pose.transform.position.z
                                    );
                                    reticle.object3D.updateMatrixWorld(true);
                                } else {
                                    reticle.visible = false;
                                }
                            });
                        });
                });
            });
        });
    }, []);

    return (
        <a-scene
            device-orientation-permission-ui="enabled: false"
            background="color: black"
            vr-mode-ui="enabled: true"
            webxr="requiredFeatures: hit-test, local-floor;"
            renderer="colorManagement: true; physicallyCorrectLights: true"
        >
            <a-entity
                camera
                look-controls
                wasd-controls="acceleration:250; fly:true"
                position="0 10 150"
            ></a-entity>

            {/* planets group wrapper (must have id for placement) */}
            <a-entity id="planets">
                <SolarSystem />
            </a-entity>

            {/* reticle */}
            <a-ring
                id="reticle"
                color="lime"
                radius-inner="0.05"
                radius-outer="0.06"
                rotation="-90 0 0"
                visible="visible"
            ></a-ring>
        </a-scene>
    );
};

export default Main;