AFRAME.registerComponent('ellipse-contour-geometry', {
  schema: {
    xRadius: { type: 'number', default: 10 }, // Horizontal radius (semi-major axis)
    eccentricity: { type: 'number', default: 0 }, // Eccentricity of the ellipse (0 to <1)
    segments: { type: 'int', default: 64 }, // Number of segments for smoothness
  },
  init: function () {
    var data = this.data

    // Calculate the yRadius (semi-minor axis) based on xRadius and eccentricity
    var yRadius = data.xRadius * Math.sqrt(1 - Math.pow(data.eccentricity, 2))

    var points = []

    // Generate the points for the elliptical contour
    for (var i = 0; i <= data.segments; i++) {
      var angle = (i / data.segments) * Math.PI * 2
      var x = data.xRadius * Math.cos(angle)
      var y = yRadius * Math.sin(angle)
      points.push(new THREE.Vector3(x, y, 0)) // Add each point in the contour
    }

    // Create a curve from the points
    var ellipseGeometry = new THREE.BufferGeometry().setFromPoints(points)

    // Create the line that follows the ellipse shape
    var material = new THREE.LineBasicMaterial({ color: '#FFF' })
    var ellipseLine = new THREE.Line(ellipseGeometry, material)

    // Set the created line geometry as the object in the scene
    this.el.setObject3D('mesh', ellipseLine)
  },
})
