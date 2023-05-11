const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

console.log('c', c)

const GameOverText = document.getElementById('GG')
GameOverText.style.display = 'none'
let GameOver = false

canvas.width = 1024
canvas.height = 576
const gravity = 0.5
const borders = []

const scaledCanvas = {
	width: canvas.width / 2,
	height: canvas.height / 2
}

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
		;(this.height = 50), (this.width = 50)
	}

	draw() {
		c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	update() {
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (this.position.y + this.height + this.velocity.y < canvas.height) {
			this.velocity.y += gravity
		} else {
			//this.velocity.y = 0
			if (this.position.y + this.height > canvas.height + 100) {
				GameOver = true
			}
		}

		this.velocity.x = 0
		if (keys.d.pressed) {
			this.velocity.x = 5
		} else if (keys.a.pressed) {
			this.velocity.x = -5
		}

		// Check for collision
		let horizontalRect = {
			x: this.position.x + this.velocity.x,
			y: this.position.y,
			width: this.width,
			height: this.height
		}

		let verticalRect = {
			x: this.position.x,
			y: this.position.y + this.velocity.y,
			width: this.width,
			height: this.height
		}

		for (let i = 0; i < borders.length; i++) {
			let borderRect = {
				x: borders[i].x,
				y: borders[i].y,
				width: borders[i].width,
				height: borders[i].height,
				type: borders[i].type
			}

			if (checkCollision(horizontalRect, borderRect)) {
				while (checkCollision(horizontalRect, borderRect)) {
					horizontalRect.x -= Math.sign(this.velocity.x)
				}
				this.position.x = horizontalRect.x

				this.velocity.x = 0
				//console.log('type', borderRect.type)
				if (borderRect.type === 'Death') {
					GameOver = true
				}
			}

			if (checkCollision(verticalRect, borderRect)) {
				while (checkCollision(verticalRect, borderRect)) {
					verticalRect.y -= Math.sign(this.velocity.y)
				}
				this.velocity.y = 0
				//console.log('type', borderRect.type)
				if (borderRect.type === 'Death') {
					GameOver = true
				}
			}
		}
	}
}

//let y = 100
//let x = 100

//let y2 = 200
//let x2 = 200

const player1 = new Player({
	x: 100,
	y: 100
})

const keys = {
	d: {
		pressed: false
	},
	a: {
		pressed: false
	},
	w: {
		pressed: false
	},
	s: {
		pressed: false
	}
}

const background = new Sprite({
	position: {
		x: 0,
		y: 0
	},
	imageSrc: './img/Frame1.png'
})

function animate() {
	const anim = window.requestAnimationFrame(animate)
	//console.log('anim', anim)
	c.fillStyle = 'white'
	c.fillRect(0, 0, canvas.width, canvas.height)

	c.save()
	//c.scale(2, 2)
	//c.translate(0, -background.image.height + scaledCanvas.height)
	// create background
	background.update()
	// place borders
	CreateBorders()

	c.restore()

	player1.update()
	if (GameOver) {
		GameOverText.style.display = 'block'
		window.cancelAnimationFrame(anim)
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
			console.log('w')
			console.log('py', player1.position.y)
			console.log('ph', player1.height)
			console.log('ch', canvas.height)
			console.log('res', player1.position.y + player1.height < canvas.height)
			if (player1.velocity.y !== 0) return
			// keys.w.pressed = true
			player1.velocity.y = -10
			break
		case 's':
			if (player1.position.y + player1.height >= canvas.height) return

			// keys.s.pressed = truew
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
			//if (player1.position.y + player1.height < canvas.height) return
			if (player1.velocity.y !== 0) return

			// keys.w.pressed = false
			player1.velocity.y = -10
			break
		case 's':
			if (player1.position.y + player1.height >= canvas.height) return
			// keys.s.pressed = false
			player1.velocity.y = 10
			break
	}
})

function checkCollision(r1, r2) {
	if (r1.x >= r2.x + r2.width || r1.x + r1.width <= r2.x || r1.y >= r2.y + r2.height || r1.y + r1.height <= r2.y) {
		return false
	} else {
		return true
	}
}
