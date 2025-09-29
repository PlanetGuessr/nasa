"use client"
import 'aframe';
import { useEffect } from 'react';

const Main = () => {
    useEffect(() => {
        const scene = document.querySelector("a-scene");
        const reticle = document.getElementById("reticle");

        scene.addEventListener("enter-vr", () => {
            const session = scene.renderer.xr.getSession();
            if (!session) return;

            session.requestReferenceSpace("viewer").then((refSpace) => {
                session.requestHitTestSource({ space: refSpace }).then((hitTestSource) => {
                    scene.renderer.xr.setAnimationLoop((_, frame) => {
                        const referenceSpace = scene.renderer.xr.getReferenceSpace();
                        const results = frame.getHitTestResults(hitTestSource);

                        if (results.length > 0) {
                            const hit = results[0];
                            const pose = hit.getPose(referenceSpace);

                            reticle.object3D.visible = true;
                            reticle.object3D.position.set(
                                pose.transform.position.x,
                                pose.transform.position.y,
                                pose.transform.position.z
                            );
                        } else {
                            reticle.object3D.visible = false;
                        }
                    });
                });
            });
        });
    }, []);

    return (
        <a-scene
            background="color: black"
            webxr="requiredFeatures: hit-test, local-floor"
            renderer="colorManagement: true; physicallyCorrectLights: true"
        >
            <a-entity camera look-controls position="0 1.6 0"></a-entity>

            {/* 🔹 Reticle (big and always visible for testing) */}
            <a-ring
                id="reticle"
                color="lime"
                radius-inner="0.1"
                radius-outer="0.12"
                rotation="-90 0 0"
                visible="true"
            ></a-ring>
        </a-scene>
    );
};

export default Main;