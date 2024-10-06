"use client"
import IPlanet from "../interfaces/iplanet";
import Planet from "./planet";

export default function SolarSystem() {

    const planets: IPlanet[] = [
        {id: 1, name: "Mercury", eccentricity: 0, speed: 0.0009, sunDistance: 15, size:1},
        {id: 2, name: "Venus", eccentricity: 0, speed: 0.0002, sunDistance: 25, size:2 },
        {id: 3, name: "Earth", eccentricity: 0.5, speed: 0, sunDistance: 40, size:2 },
        {id: 4, name: "Mars", eccentricity: 0.5, speed: 0, sunDistance: 55, size:1 },
        {id: 5, name: "Jupiter", eccentricity: 0.5, speed: 0, sunDistance: 80, size:5 },
        {id: 6, name: "Saturn", eccentricity: 0.5, speed: 0, sunDistance: 100, size:3.5 },
        {id: 7, name: "Uranus", eccentricity: 0.5, speed: 0, sunDistance: 120, size:2.5 },
        {id: 8, name: "Neptune", eccentricity: 0.5, speed: 0, sunDistance: 140, size:2.5 },
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
                        <Planet id={planet.id} name={planet.name} 
                        sunDistance={planet.sunDistance} key={index}
                        eccentricity={planet.eccentricity} speed={planet.speed}
                        size={planet.size}/>
                    ))
                }
            </a-entity>
        </>
    );
}