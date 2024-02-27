const gameBoard = document.querySelector('#gameBoard');
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector('#score');
const resetBtn = document.querySelector('#resetBtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black"
const foodColor = "red"
const unitSize = 25
let running = false
let xVelocity = unitSize 
let yVelocity = 0
let foodX
let foodY
let score = 0
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();


function gameStart() {
    running = true
    score.textContent = score
    createFood();
    drawFood();
    nextTick();
}
function nextTick() {
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else{
        displayGameOver();
    }
}
function clearBoard() {
    context.fillStyle = boardBackground
    context.fillRect(0, 0, gameWidth, gameHeight)
}
function createFood() {
    function     randomFood(min, max) {
        const randNum = Math.round((Math.random() *(max-min)+min)/ unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)

}
function drawFood() {
    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity}

    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score
        createFood()
    }else{
        snake.pop()
    }
}
function drawSnake() {
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    }
    )
}
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const left = 65;
    const right = 68;
    const up = 87;
    const down = 83;

    const goingup = (yVelocity == -unitSize);
    const goingleft = (xVelocity == -unitSize);
    const goingright = (xVelocity == unitSize);
    const goingdown = (yVelocity == unitSize);

    switch(true){
        case(keyPressed == left && !goingright):
            xVelocity = -unitSize;
            yVelocity = 0;
            break
        case(keyPressed == right && !goingleft):
            xVelocity = unitSize
            yVelocity = 0;
            break;
        case(keyPressed == down && !goingup):
            xVelocity = 0
            yVelocity = unitSize
            break;
        case(keyPressed == up && !goingdown):
            xVelocity = 0
            yVelocity = -unitSize
    }
}
function checkGameOver() {
    switch(true){
        case(snake[0].x < 0):
            running = false
            break;
        case(snake[0].x >= gameWidth):
            running = false
            break
        case(snake[0].y < 0):
            running = false
            break
        case(snake[0].y >= gameHeight):
            running = false
            break
    }

    for(let i = 1; i < snake.length; i++) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false
        }
    }
}
function displayGameOver() {
    context.font = "50px MV Boli"
    context.fillStyle = "black"
    context.textAlign = "center"
    context.fillText("GAME OVER!", gameWidth/ 2, gameHeight/2)
    running = false
}
function resetGame() {
    score = 0
    xVelocity = unitSize
    yVelocity = 0
    snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];
gameStart()
}