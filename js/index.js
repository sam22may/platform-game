const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

console.log('c', c)

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
	width: canvas.width / 2,
	height: canvas.height / 2
}

const gravity = 0.5

class Sprite {
	constructor({ position, imageSrc }) {
		this.position = position
		this.image = new Image()
		this.image.src = imageSrc
	}

	draw() {
		if (!this.image) return
		c.drawImage(this.image, this.position.x, this.position.y)
	}

	update() {
		this.draw()
	}
}

class Player {
	constructor(position) {
		this.position = position
		this.velocity = {
			x: 0,
			y: 1
		}
		this.height = 50
	}

	draw() {
		c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y, 50, this.height)
	}

	update() {
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (this.position.y + this.height + this.velocity.y < canvas.height) {
			this.velocity.y += gravity
		} else {
			this.velocity.y = 0
		}
	}
}

let y = 100
let x = 100

let y2 = 200
let x2 = 200

const player1 = new Player({
	x: 10,
	y: 10
})

const keys = {
	d: {
		pressed: false
	},
	a: {
		pressed: false
	}
}

const background = new Sprite({
	position: {
		x: 0,
		y: 0
	},
	imageSrc: './img/background.png'
})

function animate() {
	window.requestAnimationFrame(animate)
	c.fillStyle = 'white'
	c.fillRect(0, 0, canvas.width, canvas.height)

	c.save()
	c.scale(2, 2)
	c.translate(0, -background.image.height + scaledCanvas.height)
	background.update()
	c.restore()

	player1.update()

	player1.velocity.x = 0
	if (keys.d.pressed) {
		player1.velocity.x = 5
	} else if (keys.a.pressed) {
		player1.velocity.x = -5
	}
}

animate()

window.addEventListener('keydown', (event) => {
	switch (event.key) {
		case 'd':
			keys.d.pressed = true
			//player1.velocity.x = 5
			break
		case 'a':
			keys.a.pressed = true
			//player1.velocity.x = -5
			break
		case 'w':
			player1.velocity.y = -10
			break
		case 's':
			player1.velocity.y = 10
			break
	}
})

window.addEventListener('keyup', (event) => {
	switch (event.key) {
		case 'd':
			keys.d.pressed = false
			//player1.velocity.x = 5
			break
		case 'a':
			keys.a.pressed = false
			//player1.velocity.x = -5
			break
		case 'w':
			player1.velocity.y = -10
			break
		case 's':
			player1.velocity.y = 10
			break
	}
})
