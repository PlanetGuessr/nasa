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

        scene.addEventListener("enter-vr", () => {
            const session = scene.renderer?.xr?.getSession?.();
            if (!session) return;

            session.addEventListener("select", () => {
                if (reticle.visible) {
                    const pos = reticle.object3D.position;
                    const rot = reticle.object3D.rotation;
                    planets.setAttribute("position", `${pos.x} ${pos.y} ${pos.z}`);
                    planets.setAttribute("rotation", `0 ${THREE.MathUtils.radToDeg(rot.y)} 0`);
                }
            });

            session.requestReferenceSpace("viewer").then((refSpace: any) => {
                session.requestHitTestSource({ space: refSpace }).then((hitTestSource: any) => {
                    scene.renderer.xr.setAnimationLoop((_: any, frame: any) => {
                        const referenceSpace = scene.renderer.xr.getReferenceSpace();
                        const hitTestResults = frame.getHitTestResults(hitTestSource);

                        if (hitTestResults.length > 0) {
                            const hit = hitTestResults[0];
                            const pose = hit.getPose(referenceSpace);
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
    }, []);

    return (
        <a-scene
            vr-mode-ui="enabled: true"
            xr-mode-ui="enabled: true"
            webxr="optionalFeatures: hit-test; requiredFeatures: hit-test;"
            renderer="alpha: true; colorManagement: true; physicallyCorrectLights: true"
            embedded
        >
            {/* Device-tracked camera */}
            <a-entity camera look-controls></a-entity>

            {/* planets wrapper */}
            <a-entity id="planets">
                <SolarSystem />
            </a-entity>

            {/* placement reticle */}
            <a-ring
                id="reticle"
                color="lime"
                radius-inner="0.05"
                radius-outer="0.06"
                rotation="-90 0 0"
                visible="false"
            ></a-ring>
        </a-scene>
    );
};

export default Main;