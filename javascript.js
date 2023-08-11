const container = document.querySelector('#container');
const squareCountSlider = document.querySelector('#squareCountSlider');
const sliderValue = document.querySelector('#sliderValue');
const colorModeButton = document.querySelector('#colorModeButton');
const rainbowModeButton = document.querySelector('#rainbowModeButton');
const eraserButton = document.querySelector('#eraserButton');
const clearButton = document.querySelector('#clearButton');
const colorPicker = document.querySelector('#colorPicker');

let currentColor = 'black';
let rainbowMode = false;

function createGrid(squareCount) {
	container.innerHTML = '';

	const cellSize = 500 / squareCount + 'px';

	container.style.gridTemplateColumns = `repeat(${squareCount}, ${cellSize})`;
	container.style.gridTemplateRows = `repeat(${squareCount}, ${cellSize})`;

	for (let i = 0; i < squareCount * squareCount; i++) {
		const content = document.createElement('div');
		content.classList.add('content');
		container.appendChild(content);
	}

	sliderValue.textContent = `${squareCount}x${squareCount}`;

	addHoverEffect();
}

function addHoverEffect() {
	const squares = container.querySelectorAll('.content');
	squares.forEach((square) => {
		square.addEventListener('mouseover', () => {
			if (rainbowMode) {
				square.style.backgroundColor = generateRandomColor();
			} else {
				square.style.backgroundColor = currentColor;
			}
		});
  });
}

colorModeButton.addEventListener('click', () => {
	rainbowMode = false;
});

colorPicker.addEventListener('input', (event) => {
	currentColor = event.target.value;
});

rainbowModeButton.addEventListener('click', () => {
	rainbowMode = !rainbowMode;
});

eraserButton.addEventListener('click', () => {
	rainbowMode = false;
	currentColor =  '#f0f0f0';
});

clearButton.addEventListener('click', () => {
	const squares = container.querySelectorAll('.content');
	squares.forEach((square) => {
		square.style.backgroundColor = '';
	});
});

squareCountSlider.addEventListener('input', (event) => {
	const newCount = event.target.value;
	createGrid(newCount);
});

function generateRandomColor() {
	const randomColor = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
	return randomColor;
}

createGrid(2);

