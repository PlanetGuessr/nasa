const earth = document.querySelector('#earth')
const earth_orbit = document.querySelector('#earth-orbit')
const earth_container = document.querySelector('#earth-container')
const earth_pincho = document.querySelector('#earth-pincho')

// With .setAttribute (less recommended).
//earth.setAttribute('rotation', { x: 0, y: 0, z: 0 })
//earth_pincho.setAttribute('rotation', { x: 0, y: 0, z: 0 })

moveElementInEllipse(earth_container, 10, 0, 0, 0, 0.001)

// function rotation() {
//   var x = 0
//   var y = 0
//   var z = 0
//   setInterval(() => {
//     y += 0.1
//     z += 0.1
//     earth.setAttribute('rotation', { x: 0, y: y, z: 0 })
//     // earth_pincho.setAttribute('rotation', { x: 0, y: 0, z: 0 })
//   }, 60 / 60)
// }

function traslation() {
  var x = 0
  var y = 0

  setInterval(() => {
    x += 0.1
    z += 0.1
    earth.setAttribute('position', { x: 0, y: 0, z: 0 })
  }, 60 / 60)
}

function moveElementInEllipse(element, a, eccentricity, cX, cZ, speed) {
  let t = 0 // time variable

  // Calculate the semi-minor axis (b) based on the eccentricity
  let b = a * Math.sqrt(1 - Math.pow(eccentricity, 2))

  setInterval(() => {
    // Compute the position in 3D space (ellipse on x and z axes)
    let x = a * Math.cos(t) + cX
    let z = b * Math.sin(t) + cZ

    // Update the element's position using 3D transformation
    element.setAttribute('position', { x: x, y: 0, z: z })

    // Increment time
    t += speed
  }, 1000 / 60) // 60 FPS
}
