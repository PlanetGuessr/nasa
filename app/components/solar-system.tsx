"use client"
import IPlanet from "../interfaces/iplanet";
import Planet from "./planet";

export default function SolarSystem() {

    const planets: IPlanet[] = [
        {id: 1, name: "Mercury", eccentricity: 0, speed: 0.0009, radius: 15},
        {id: 2, name: "Venus", eccentricity: 0, speed: 0.0002, radius: 25},
        {id: 3, name: "Earth", eccentricity: 0.5, speed: 0, radius: 40},
        {id: 4, name: "Mars", eccentricity: 0.5, speed: 0, radius: 55}

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
                        radius={planet.radius} key={index}
                        eccentricity={planet.eccentricity} speed={planet.speed}/>
                    ))
                }
            </a-entity>
        </>
    );
}