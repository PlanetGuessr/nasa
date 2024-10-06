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
    let orbitScale = 2;

    const planets: IPlanet[] = [
        {id: 1, name: "Mercury", eccentricity: 0.20563661, inclination: 0 /*7.00559432*/, speed: 0.0009 * hudOptions.speed, sunDistance: 25 * orbitScale, size:1 },
        {id: 2, name: "Venus", eccentricity: 0.00676399, inclination: 0 /*3.39777545*/, speed: 0.0002* hudOptions.speed , sunDistance: 40 * orbitScale, size:2 },
        {id: 3, name: "Earth", eccentricity: 0.01673163, inclination: 0 /*-0.00054346*/, speed: hudOptions.speed, sunDistance: 55 * orbitScale, size:2 },
        {id: 4, name: "Mars", eccentricity: 0.09336511, inclination: 0 /*1.85181869*/, speed: 0.1 * hudOptions.speed, sunDistance: 75 * orbitScale, size:1 },
        {id: 5, name: "Jupiter", eccentricity: 0.04853590, inclination: 0 /*1.29861416*/, speed: 0.1* hudOptions.speed , sunDistance: 100 * orbitScale, size:5 },
        {id: 6, name: "Saturn", eccentricity: 0.05550825, inclination: 0 /*2.49424102*/, speed: 0.1* hudOptions.speed, sunDistance: 120 * orbitScale, size:3.5 },
        {id: 7, name: "Uranus", eccentricity: 0.04685740, inclination: 0 /*0.77298127*/, speed: 0.1 * hudOptions.speed, sunDistance: 140 * orbitScale, size:2.5 },
        {id: 8, name: "Neptune", eccentricity: 0.04685740, inclination: 0 /*1.77005520*/, speed: 0.1* hudOptions.speed, sunDistance: 160 * orbitScale, size:2.5 },
    ]

    return (
        <>
            <a-entity id="centro" position="0 0 -12">
                <a-sphere
                    animation="property:rotation; dur:100000; easing:linear; to:0 360 0; loop:true;"
                    id="sun"
                    material="src:textures/sun.jpg"
                    position="0 0 0"
                    // color="#FFC65D"
                    radius="8">
                </a-sphere>
                {
                    planets.map((planet, index) => (
                        <Planet id={planet.id} name={planet.name} key={index}
                        sunDistance={planet.sunDistance}
                        eccentricity={planet.eccentricity}
						speed={planet.speed}
                        inclination={planet.inclination}
                        size={planet.size}/>
                    ))
                }
            </a-entity>
        </>
    );
}

export default SolarSystem;
