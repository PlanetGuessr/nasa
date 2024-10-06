import { useEffect } from "react"

export default function Planet(
    name: string, eccentricity: number, speed: number,
    x: number, y: number, z: number,
) {

    let element: HTMLElement = document.querySelector("#");

    // function moveElementInEllipse(element, a, eccentricity, cX, cZ, speed) {
    //     let t = 0 // time variable
      
    //     // Calculate the semi-minor axis (b) based on the eccentricity
    //     let b = a * Math.sqrt(1 - Math.pow(eccentricity, 2))
      
    //     setInterval(() => {
    //       // Compute the position in 3D space (ellipse on x and z axes)
    //       let x = a * Math.cos(t) + cX
    //       let z = b * Math.sin(t) + cZ
      
    //       // Update the element's position using 3D transformation
    //       element.setAttribute('position', { x: x, y: 0, z: z })
      
    //       // Increment time
    //       t += speed
    //     }, 1000 / 60) // 60 FPS
    //   }

    useEffect(() => {

    }, [])
 

    return (
        <>
            <a-entity
                id={`${name}-orbit`}
                ellipse-contour-geometry="xRadius: 10;"
                position="0 0 0"
                rotation="90 0 0"></a-entity>
            <a-entity id={`${name}-container`} position="6 0 0" rotation="0 0 -23.5">
                <a-text position="-1 1.3 0" color="white" value={name}></a-text>
                <a-text
                    position="-1 1 0.1"
                    color="white"
                    value={name}
                    rotation="0 180 0"></a-text>
                <a-entity
                    animation="property:rotation; dur:10000; easing:linear; to:0 360 0; loop:true;">
                    <a-sphere id={name} material="src:Public/earth.jpg" radius="1.25">
                        <a-cylinder
                            id="earth-pincho"
                            position="0 0 0"
                            radius="0.05"
                            height="8"
                            color="#FFC65D">
                        </a-cylinder>
                    </a-sphere>
                </a-entity>
            </a-entity>
        </>
    )
}