document.addEventListener('DOMContentLoaded', ()=>{
	// DOMContentLoaded are helping us to make html loaded before js
	const grid = document.querySelector('.grid')
	let width = 10 // we need 10 square
	let squares = []
	let bombAmount = 20
	let isGameOver = false
	let flags = 0
	function createBoard(){

		const bombArray = Array(bombAmount).fill('bomb')
		const emptyArray = Array(width*width - bombAmount).fill('valid')
		// in the above two code we create the bomb and the empty space

		const gameArray = emptyArray.concat(bombArray)
		const shuffledArray = gameArray.sort(()=> Math.random()-0.5)

		// in the above two code we concatenate the bomb and empty array then shuffle the array

		for(let i=0 ; i < width*width;i++){
			const square = document.createElement('div')
			square.setAttribute('id',i)
			// in the above 2 code we create 100 square (each of the have 40 * 40 px) it is div and we set 
			// unique id
			square.classList.add(shuffledArray[i])
			// it will get the random shuffledArray in the class name
			grid.appendChild(square)
			squares.push(square)

			square.addEventListener('click', function(e){
				click(square)
			})

			square.oncontextmenu = function(e){
				e.preventDefault()
				addFlag(square)
			}

		}

		for (let i=0 ;i< squares.length;i++){
			let total = 0
			const isLeftEdge = i % width === 0
			// inorder to check the leftEdge the left edge when they divide by 10 the reminder is 0 only
			const isRightEdge = i % width === width - 1	
			// inorder to check the rightEdge the right edge reminder is 9 always

			if(squares[i].classList.contains('valid')){
				if (i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++
				// if the i > 0 then if it is not in the left edge and before that 
			    // the div id is the bomb add total ++
				if (i>9 && !isRightEdge && squares[i+1 - width].classList.contains('bomb')) total++
				// if the i>9 then if it is not in the right edge and the bomb is found in the above line square
				// have a bomb for example if it is i == 10 then squares[10+1-10] squares[1] have bomb or not 
				// if it have bomb total ++ 
				if(i>10 && squares[i-width].classList.contains('bomb')) total++
				// if i > 10 then if squares above it have bomb and one total
				if(i>11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) total++
				// if i>11 and not in the left edge and the bomb is found in the above line square
				// add a bomb for example if it is i == 12 then squares[12-1-10] squares[1] have bomb or not 
				// if it have bomb total ++   
				if(i<98 && !isRightEdge && squares[i+1].classList.contains('bomb')) total++
				// in simple term the bomb found in the right side and 1 to the total
				if (i<90 && !isLeftEdge && squares[i-1 + width].classList.contains('bomb')) total++
				// check the bomb found in the bottom line below the square in the left 
				// not in the left edge for example if it is
				// i == 12 then squares[12-1+10] squares[21] have bomb or not if it have bomb total ++ 
				if (i<88 && !isRightEdge && squares[i+1 + width].classList.contains('bomb')) total++
				// it say below 88 because 88 is found in the right and we are checking the bottom line and
				// in the right so if we say 88 the right is 99 and we do not want that since it is rightedge
				// for example if it is i == 87 then squares[87+1+10] squares[88] have bomb or not 
				// if it have bomb total ++ 
				if(i<89 && squares[i+width].classList.contains('bomb')) total++
				// if i < 89 then if squares below it have bomb and one total
				squares[i].setAttribute('data',total)
				console.log(squares[i])
			}
		}
	}



	createBoard()

	function addFlag(square){
		if (isGameOver) return
		if (!square.classList.contains('checked') && (flags < bombAmount)){
			if(!square.classList.contains('flag')){
				square.classList.contains('flag')
				square.innerHTML = "flag"
				flags ++
				checkformin()
			}else{
				square.classList.remove('flag')
				square.innerHTML = ""
				flags --
			}
		}
	}

	function click(square){
		let currentId = square.id
		// cache the current Id
		if (isGameOver) return
		if (square.classList.contains('checked') || square.classList.contains('flag') ) return
		if(square.classList.contains('bomb')){
			gameOver(square)
		// if class is bomb when it is clicked show us the alert message
		}else{
			let total = square.getAttribute('data')
			// get the total data or the number 
			// but display the number when it is greater than 0
			if(total!=0){
				square.classList.add('checked')
				// change the color by ading new class that is checked then the give the color in the css
				square.innerHTML = total
				// write the number in the div
				return
			}
			checkSquare(square,currentId)
			// used to check the neighbouring square if the empty square is checked it have 2 paremeter the square
			// and the id of that square
		}
		// if have 0 number or no coordinate simple change the color
		square.classList.add('checked')
	}

	function checkSquare(square,currentId){
		const isLeftEdge = currentId % width === 0
		const isRightEdge = currentId % width === width - 1	

		// getting the left and right edge

		setTimeout(()=>{
			if(currentId>0 && !isLeftEdge){
				const newId = squares[parseInt(currentId) - 1].id
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}

			if(currentId>9 && !isRightEdge){
				const newId = squares[parseInt(currentId) + 1 - width].id
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}

			if(currentId>10){
				const newId = squares[parseInt(currentId) - width].id
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}

			if(currentId>11 && !isLeftEdge){
				const newId = squares[parseInt(currentId) - 1 - width].id
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}


			if(currentId<98 && !isRightEdge){
				const newId = squares[parseInt(currentId) + 1].id
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}

			if(currentId<90 && !isLeftEdge){
				const newId = squares[parseInt(currentId) - 1 + width].id
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}

			if(currentId<88 && !isRightEdge){
				const newId = squares[parseInt(currentId) + 1 + width].id
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}

			if(currentId<89){
				const newId = squares[parseInt(currentId) + width].id
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}
		},10)
		// set Timeout give 10 millisecond before excute this code this hapen after click function
	}

	function gameOver(square){
		
		isGameOver = true
		// shows all the bobmbs 
		squares.forEach((square)=>{
			if(square.classList.contains("bomb")){
				square.innerHTML="*."
			}
		})
		alert("Game Over")
	}

	function checkformin(){
		for(let i=0;i< squares.length;i++){
			if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
				matches++
			}

			if(matches === bombAmount){
				console.log("You Win")
				isGameOver = true
			}
		}
	}
})