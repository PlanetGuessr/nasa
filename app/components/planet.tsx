import { useContext, useEffect, useRef } from "react"
import IPlanet from "../interfaces/iplanet";
import 'aframe';

AFRAME.registerComponent('ellipse-contour-geometry', {
    schema: {
      xRadius: { type: 'number', default: 10 }, // Horizontal sunDistance (semi-major axis)
      eccentricity: { type: 'number', default: 0 }, // Eccentricity of the ellipse (0 to <1)
      inclination: { type: 'number', default: 0 }, // Inclination of the ellipse
      segments: { type: 'int', default: 128 }, // Number of segments for smoothness
    },
    init: function () {
      const data = this.data;
  
      // Calculate the yRadius (semi-minor axis) based on xRadius and eccentricity
      const yRadius = data.xRadius * Math.sqrt(1 - Math.pow(data.eccentricity, 2));
  
      const points = [];
  
      // Generate the points for the elliptical contour
      for (let i = 0; i <= data.segments; i++) {
        const angle = (i / data.segments) * Math.PI * 2;
        const x = data.xRadius * Math.cos(angle);
        const y = yRadius * Math.sin(angle);
        points.push(new AFRAME.THREE.Vector3(x, y, 0)); // Add each point in the contour
      }
  
      // Create a curve from the points
      const ellipseGeometry = new AFRAME.THREE.BufferGeometry().setFromPoints(points);
  
      // Create the line that follows the ellipse shape
      const material = new AFRAME.THREE.LineBasicMaterial({ color: '#FFF' });
      const ellipseLine = new AFRAME.THREE.Line(ellipseGeometry, material);
  
      // Set the created line geometry as the object in the scene
      this.el.setObject3D('mesh', ellipseLine);
    },
  });


const Planet: React.FC<IPlanet> = ({id, name, eccentricity, inclination, rotation, rot_speed, speed, sunDistance, size}) => {


    const planet = useRef<HTMLElement | null>(null);

    function moveElementInEllipse(element: any, a: number, eccentricity: number, inclination: number,
        cX: number, cZ: number, speed: number) {
        let t = 0; // time variable
      
        // Calculate the semi-minor axis (b) based on the eccentricity
        let b = a * Math.sqrt(1 - Math.pow(eccentricity, 2));

        setInterval(() => {
          // Compute the position in 3D space (ellipse on x and z axes)
          let x = a * Math.cos(t) + cX;
          let z = b * Math.sin(t) + cZ;
      
          // Update the element's position using 3D transformation
          if (element && typeof element.setAttribute === 'function') {
            // Update the element's position using A-Frame's setAttribute
            element.setAttribute('position', { x, y: 0, z });
          }
        //   element.setAttribute('position', `${x} 0 ${z}`);
      
          // Increment time
          t += speed;
        }, 1000 / 60); // 60 FPS
      }

    useEffect(() => {
        if(planet.current){
            moveElementInEllipse(planet.current, sunDistance, eccentricity, inclination, 0, 0, speed + 0.001)
        }
    }, )
 

    return (
        <>
            <a-entity
                id={`${name}-orbit`}
                ellipse-contour-geometry={`eccentricity: ${eccentricity}; xRadius: ${sunDistance};`}
                position="0 0 0"
                rotation={`${inclination+90} 0 0`}
				></a-entity>
            <a-entity id={`${name}-container`} ref={planet} position="6 0 0" rotation={`0 0 ${rotation}`}>
                <a-text position="-1 1.3 0" color="white" value={name}></a-text>
                <a-text
                    position="-1 1 0.1"
                    color="white"
                    value={name}
                    rotation="0 180 0"></a-text>
                <a-entity
                    animation={`property:rotation; dur:${rot_speed}; easing:linear; to:0 360 0; loop:true;`}>
                    <a-sphere id={name} material={`src:/docs/assets/${name.toLowerCase()}.jpg`} radius={size}>
                        {/* <a-cylinder
                            id="earth-pincho"
                            position="0 0 0"
                            sunDistance="0.05"
                            height="8"
                            color="#FFC65D">
                        </a-cylinder> */}
                    </a-sphere>
                </a-entity>
            </a-entity>
        </>
    )
}

export default Planet;
