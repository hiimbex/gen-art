const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
const randomEmoji = require('random-emoji');

// $ canvas-sketch sketch.js

const settings = {
  dimensions: [ 512, 512 ]
  // orientation: 'portrait',
  // pixelsPerInch: 300
};

//random.setSeed(12)

const sketch = () => {
  const colorCount = random.rangeFloor(4,6)
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount)
  const createGrid = () => {
    const  points = []
    const count = 20
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? .5 : x/(count - 1)
        const v = count <= 1 ? .5 : y/(count - 1)
      //  const radius = Math.abs(random.noise2D(u,v))
      //console.log(random.value(u,v))
        const radius = Math.abs(random.value(u,v))
        points.push({
          color: random.pick(palette),
          radius,
          position: [u, v],
          rotation: random.noise2D(u,v)
        //  rotation: random.value(u,v)
        })
      }
    }
    return points
  }

  const points = createGrid().filter(() => random.value() > .6)
  const margin = 0

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)
    // let emojis = randomEmoji.random({count: random.rangeFloor(4,9)})
    // I really need emoji palettes
    //let emojis = ['📒','📓','📔','📕','📖','📗','📘','📙','📚']
    //let emojis = ['📕','📗','📘','📚']

    //random.shuffle(points).forEach(data => {
    points.forEach(data => {
      const {position, radius, color, rotation} = data
      const [u, v] = position
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, width - margin, v)

      context.save()
      // context.fillStyle = color
      // context.font = `${radius * width * .8}px Futura`
      // //context.font = `${500}px Futura`
      // context.translate(x, y)
      // context.rotate(rotation)
      //
      // //let emoji = random.pick(emojis).character
      // let emoji = random.pick(emojis)
      // context.fillText('o', 0, 0)

      context.beginPath()
      context.arc(y, x, x * .15, 0, Math.PI*2, false)
      context.translate(x, y)
      context.strokeStyle = 'gray'
      context.stroke()
      context.rotate(rotation)
      context.fillStyle = color
      context.fill()
      context.restore()
    })

  };
};

canvasSketch(sketch, settings);


// random or Gaysien random distribution
// noise function to acheive ovulating-feel
// context.fillStyle = 'pink'
// context.fillRect(0, 0, width, height)
//
// // Now draw a white rectangle in the center
// context.strokeStyle = 'white'
// context.lineWidth = 40
// context.strokeRect(width / 4, height / 4, width / 2, height / 2)
//
// context.beginPath()
// context.arc(width/2, height/2, width*.1, 0, Math.PI*2, false)
// context.fillStyle = 'blue'
// context.fill()
// context.strokeStyle = 'purple'
// context.lineWidth = 100
// context.stroke()
