"use client"
import { useContext, useEffect } from "react";
import IPlanet from "../interfaces/iplanet";
import Planet from "./planet";
import hudContext from "../context/hud-context";

const SolarSystem = () => {

	const { hudOptions, setHudOptions } = useContext(hudContext);

	useEffect(() => {
		console.log(hudOptions);
	}, [hudOptions])

	const planets: IPlanet[] = [
		{ id: 1, planetName: "Mercury", eccentricity: 0.20563661, inclination: 0 /*7.00559432*/, rotation: 0, rot_speed: 700000, speed: 0.0016, sunDistance: 25, size: 1 },
		{ id: 2, planetName: "Venus", eccentricity: 0.00676399, inclination: 0 /*3.39777545*/, rotation: 177.4, rot_speed: 1400000, speed: 0.0014, sunDistance: 40, size: 2 },
		{ id: 3, planetName: "Earth", eccentricity: 0.01673163, inclination: 0 /*-0.00054346*/, rotation: 23.4, rot_speed: 175000, speed: 0.0012, sunDistance: 55, size: 2 },
		{ id: 4, planetName: "Mars", eccentricity: 0.09336511, inclination: 0 /*1.85181869*/, rotation: 25.2, rot_speed: 350000, speed: 0.0010, sunDistance: 75, size: 1 },
		{ id: 5, planetName: "Jupiter", eccentricity: 0.04853590, inclination: 0 /*1.29861416*/, rotation: 3.1, rot_speed: 10000, speed: 0.0008, sunDistance: 100, size: 5 },
		{ id: 6, planetName: "Saturn", eccentricity: 0.05550825, inclination: 0 /*2.49424102*/, rotation: 26.7, rot_speed: 12500, speed: 0.0006, sunDistance: 120, size: 3.5 },
		{ id: 7, planetName: "Uranus", eccentricity: 0.04685740, inclination: 0 /*0.77298127*/, rotation: 97.8, rot_speed: 21875, speed: 0.0004, sunDistance: 140, size: 2.5 },
		{ id: 8, planetName: "Neptune", eccentricity: 0.04685740, inclination: 0 /*1.77005520*/, rotation: 28.3, rot_speed: 43750, speed: 0.0001, sunDistance: 160, size: 2.5 },
	]

	return (
		<>
			<a-entity id="centro" position="0 0 -12">
				<a-sphere
					animation="property:rotation; dur:2160000000; easing:linear; to:0 360 0; loop:true;"
					id="sun"
					material="src:textures/sun.jpg"
					position="0 0 0"
					// color="#FFC65D"
					radius="8">
				</a-sphere>
				{/* Invisible sunlight */}
				<a-entity
					id="sun-light"
					light="type: directional; intensity: 1.2; castShadow: true; shadowBias: -0.00005; shadowCameraNear: 0.1; shadowCameraFar: 5000; shadowMapWidth: 2048; shadowMapHeight: 2048"
					position="0 0 0"
					rotation="0 0 0"
				></a-entity>

                {/* Ambient fill light (soften shadows) */}
                <a-entity
                    light="type: ambient; intensity: 0.25; color: #555555"
                ></a-entity>

                {/* Planets */}
                {planets.map((planet, index) => (
                    <Planet
                        key={index}
                        id={planet.id}
                        planetName={planet.planetName}
                        sunDistance={planet.sunDistance}
                        eccentricity={planet.eccentricity}
                        rotation={planet.rotation}
                        rot_speed={planet.rot_speed}
                        speed={planet.speed}
                        inclination={planet.inclination}
                        size={planet.size}
                    />
                ))}
            </a-entity>
        </>
    );
}

export default SolarSystem;