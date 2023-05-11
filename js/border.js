class Border {
	constructor({ x, y, width, height, type }) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.type = type
	}

	draw() {
		if (this.type === BorderType[0]) {
			c.fillStyle = 'green'
		} else if (this.type === BorderType[1]) {
			c.fillStyle = 'blue'
		} else if (this.type === BorderType[2]) {
			c.fillStyle = 'orange'
		} else if (this.type === BorderType[3]) {
			c.fillStyle = 'red'
		}

		c.fillRect(this.x, this.y, this.width, this.height)
	}
}

const BorderType = ['Ground', 'Wall', 'Platform', 'Death']

//create borders
const CreateBorders = () => {
	// Ground
	// for loop to create blocks
	// for (let i = 0; i < 12; i++) {
	// 	borders.push(
	// 		new Border({
	// 			x: 0 + 30 * i,
	// 			y: 576 - 30,
	// 			width: 30,
	// 			height: 30,
	// 			type: 1
	// 		})
	// 	)
	// }

	borders.push(new Border({ x: 0, y: 576 - 30, width: 500, height: 30, type: 'Ground' }))
	borders.push(new Border({ x: 690, y: 576 - 30, width: 300, height: 30, type: 'Ground' }))

	// Left wall
	borders.push(new Border({ x: -20, y: 0, width: 30, height: 576 - 30, type: 'Wall' }))

	// platforms
	borders.push(new Border({ x: 200, y: 450, width: 200, height: 30, type: 'Platform' }))
	borders.push(new Border({ x: 500, y: 370, width: 200, height: 30, type: 'Platform' }))

	// Death
	borders.push(new Border({ x: 900, y: 476, width: 20, height: 40, type: 'Death' }))

	// Draw the borders
	for (let i = 0; i < borders.length; i++) {
		borders[i].draw()
	}
}
