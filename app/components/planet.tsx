import { useEffect, useRef } from "react";
import IPlanet from "../interfaces/iplanet";
import "aframe";
import { THREE } from "aframe";

// Orbital periods in Earth days
const orbitalPeriods: Record<string, number> = {
    Mercury: 87.9691,
    Venus: 224.701,
    Earth: 365.256,
    Mars: 686.980,
    Jupiter: 4332.589,
    Saturn: 10759.22,
    Uranus: 30685.4,
    Neptune: 60189.0,
};

// Mean anomalies at J2000 (deg)
const meanAnomalies: Record<string, number> = {
    Mercury: 174.796,
    Venus: 50.115,
    Earth: 357.517,
    Mars: 19.373,
    Jupiter: 20.020,
    Saturn: 317.020,
    Uranus: 142.238,
    Neptune: 256.228,
};

AFRAME.registerComponent("ellipse-contour-geometry", {
    schema: {
        xRadius: { type: "number", default: 10 },
        eccentricity: { type: "number", default: 0 },
        inclination: { type: "number", default: 0 },
        segments: { type: "int", default: 128 },
    },
    init: function () {
        const data = this.data;
        const yRadius = data.xRadius * Math.sqrt(1 - Math.pow(data.eccentricity, 2));
        const points = [];
        for (let i = 0; i <= data.segments; i++) {
            const angle = (i / data.segments) * Math.PI * 2;
            const x = data.xRadius * Math.cos(angle);
            const y = yRadius * Math.sin(angle);
            points.push(new AFRAME.THREE.Vector3(x, y, 0));
        }
        const ellipseGeometry = new AFRAME.THREE.BufferGeometry().setFromPoints(points);
        const material = new AFRAME.THREE.LineBasicMaterial({ color: "#FFF" });
        const ellipseLine = new AFRAME.THREE.Line(ellipseGeometry, material);
        this.el.setObject3D("mesh", ellipseLine);
    },
});

const Planet: React.FC<IPlanet> = ({
                                       planetName,
                                       eccentricity,
                                       inclination,
                                       rotation,
                                       rot_speed,
                                       sunDistance,
                                       size,
                                   }) => {
    const planet = useRef<HTMLElement | null>(null);

    // --- SPEED NORMALIZATION ---
    // Instead of linear scaling (too extreme), use power scaling
    // All planets fit into a nice visible range [fast .. slow].
    const earthPeriod = orbitalPeriods["Earth"];
    const period = orbitalPeriods[planetName] ?? earthPeriod;

    // Compress long orbits by power function
    const scaledPeriod = Math.pow(period, 0.4); // tweak exponent (0.3–0.5 works well)

    // Target: Earth takes ~60 seconds
    const earthScaled = Math.pow(earthPeriod, 0.4);
    const orbitSpeed = (2 * Math.PI) / (earthScaled * 60 * 1000) * (earthScaled / scaledPeriod);

    // Phase offset from NASA data
    const phaseOffset = THREE.MathUtils.degToRad(meanAnomalies[planetName] ?? 0);

    function moveElementInEllipse(
        element: any,
        a: number,
        eccentricity: number,
        inclination: number,
        cX: number,
        cZ: number,
        orbitSpeed: number,
        phaseOffset: number
    ) {
        const b = a * Math.sqrt(1 - Math.pow(eccentricity, 2));
        function update() {
            const now = Date.now();
            const theta = now * orbitSpeed + phaseOffset;
            const x = a * Math.cos(theta) + cX;
            const z = b * Math.sin(theta) + cZ;
            if (element && typeof element.setAttribute === "function") {
                element.setAttribute("position", { x, y: 0, z });
            }
            requestAnimationFrame(update);
        }
        update();
    }

    useEffect(() => {
        if (planet.current) {
            moveElementInEllipse(
                planet.current,
                sunDistance,
                eccentricity,
                inclination,
                0,
                0,
                orbitSpeed,
                phaseOffset
            );
        }
    }, []);

    return (
        <>
            <a-entity
                id={`${planetName}-orbit`}
                ellipse-contour-geometry={`eccentricity: ${eccentricity}; xRadius: ${sunDistance};`}
                position="0 0 0"
                rotation={`${inclination + 90} 0 0`}
            ></a-entity>
            <a-entity id={`${planetName}-container`} ref={planet} rotation={`0 0 ${rotation}`}>
                <a-text
                    position={`0 ${size + 0.5} 0`}
                    align="center"
                    color="white"
                    value={planetName}
                    rotation="0 180 0"
                ></a-text>
                <a-entity
                    animation={`property:rotation; dur:${rot_speed}; easing:linear; to:0 360 0; loop:true;`}
                >
                    <a-sphere
                        id={planetName}
                        material={`src:textures/${planetName.toLowerCase()}.jpg`}
                        radius={size}
                    ></a-sphere>
                </a-entity>
            </a-entity>
        </>
    );
};

export default Planet;
