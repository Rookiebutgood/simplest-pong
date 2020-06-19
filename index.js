
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const bgWidth = 600
const bgHeight = 500
const barWidth = 100
const barHeight = 20
const ballSize = 20


ctx.fillRect(0, 0, bgWidth, bgHeight)


class Bar {
  constructor(width, height, x, y){
    this.width = width
    this.height = height
    this.x = x
    this.y = y
  }
  draw(startCoord) {
    this.x = startCoord - this.width / 2
    ctx.fillStyle = 'white'
    ctx.fillRect(this.x - this.width / 2, this.y - this.height, this.width, this.height)
  }
}

class Ball {
  constructor(size, x, y) {
    this.size = size
    this.x = x
    this.y = y
  }
  reverse = false
  dirY = 1
  dirX = 0
  angle = 0
  draw(startCoordX, startCoordY) {
    startCoordY += this.y
      this.y += 5 * this.dirY
      this.x += 5 * Math.sin(this.angle) * this.dirX
    ctx.fillStyle = 'white'
    ctx.fillRect(this.x - this.size / 2, startCoordY - this.size, this.size, this.size)
  }
  colision (bar) {
    if(this.y > bar.y - 20 && this.x > bar.x - bar.width / 2 && this.x < bar.x + bar.width / 2) {
      this.dirY = -1
      this.dirX = 1
      this.angle = Math.random() * 90
    } else if (this.y === 0) {
      this.dirY = 1
    } else if(this.y > bgHeight) {
      this.y = 200
      this.dirX = 0
    }
    else if (this.x < 0) {
      this.x = 0
      this.dirX = 1
      this.angle = Math.random() * 90
    } else if(this.x > bgWidth) {
      this.dirX = -1
    }
  }
}


let bar = new Bar(barWidth, barHeight, bgWidth / 2, bgHeight)
let ball = new Ball(ballSize, 200, 0)

let mousePos = bgWidth / 2
document.addEventListener('mousemove', (e)=>{
  mousePos = e.screenX
  if (mousePos < barWidth) {
    mousePos = barWidth
  } else if (mousePos > bgWidth) {
    mousePos = bgWidth
  }
})

function render() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, bgWidth, bgHeight)
  bar.draw(mousePos)
  ball.draw(200, 0)
  ball.colision(bar)
  requestAnimationFrame(render)
}

render()