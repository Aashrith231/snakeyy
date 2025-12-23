function drawRoundedRect(x, y, size, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + size, y, x + size, y + size, radius);
    ctx.arcTo(x + size, y + size, x, y + size, radius);
    ctx.arcTo(x, y + size, x, y, radius);
    ctx.arcTo(x, y, x + size, y, radius);
    ctx.closePath();
    ctx.fill();
}


const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const Score = document.querySelector("#Score");
const resetButton = document.querySelector("#resetButton");
const gameWidth = gameBoard.width;
const foodColor = "red";
const gameHeight = gameBoard.height;
// const boardcolor = "white";
const boardcolor = "#111";

const snakecolor = "lightgreen";
const snakeBorder = "none";
const unitsize = 25;
let running = false;
let xvel = unitsize;
let yvel =0;
let foodx;
let foody;
let score =0;
let snake =[
    {x:unitsize*4,y:0},
    {x:unitsize*3,y:0},
    {x:unitsize*2,y:0},
    {x:unitsize*1,y:0},
    {x:unitsize*0,y:0}
];

window.addEventListener("keydown",changeDirection);
resetButton.addEventListener("click",resetGame)

gameStart();
// createFood();
// drawfood();

function gameStart(){
    running = true;
    Score.textContent = score;
    createFood();
    drawfood();
    nextTick();

};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawfood();
            moveSnake();
            drawSnake();
            checkgameOver();
            nextTick();

        },75);

    } 
    else{
        displaygameOver();
    }
};
function clearBoard(){

    ctx.fillStyle = boardcolor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randFood(min,max) {
   const randNum = Math.round((Math.random()*(max-min) +min)/unitsize)*unitsize ;
        return randNum;
    }
    foodx= randFood(0,gameWidth-unitsize);
    foody= randFood(0,gameHeight-unitsize);
    console.log(foodx);

};


function drawfood(){
    ctx.fillStyle = "red";
    ctx.shadowColor = "red";
    ctx.shadowBlur = 15;
    ctx.fillRect(foodx, foody, unitsize, unitsize);
    ctx.shadowBlur = 0;
}

// function drawfood(){
//     // clearBoard();
//     ctx.fillStyle=foodColor;
//     ctx.fillRect(foodx,foody,unitsize,unitsize);
// };
// function drawSnake(){
//     ctx.fillStyle=snakecolor;
//     // ctx.strokeStyle=snakeBorder;
//     snake.forEach(snakePart =>{
//         ctx.fillRect(snakePart.x,snakePart.y,unitsize,unitsize);
//         ctx.strokeRect(snakePart.x,snakePart.y,unitsize,unitsize);

//     })
// };




function drawSnake(){
    snake.forEach((part, index) => {
        if(index === 0){
            
            drawRoundedRect(part.x, part.y, unitsize, 8, "#09bd42ff");
        } else {
            
            drawRoundedRect(part.x, part.y, unitsize, 6, "#3cffc0");
        }
    });
}

function moveSnake(){
    const head ={x:snake[0].x+xvel,
        y: snake[0].y+yvel
    }
    snake.unshift(head);
    if(snake[0].x==foodx&&snake[0].y==foody){
        score++;
        Score.textContent=score;
        createFood();
    } 
    else{
        snake.pop();
    }

};
function changeDirection(event){
    const key = event.key;
    console.log("key:", key);

    const goingUp = (yvel === -unitsize);
    const goingDown = (yvel === unitsize);
    const goingRight = (xvel === unitsize);
    const goingLeft = (xvel === -unitsize);

    
    if ((key === 'a' || key === 'A' || key === 'ArrowLeft') && !goingRight) {
        xvel = -unitsize;
        yvel = 0;
    } else if ((key === 'd' || key === 'D' || key === 'ArrowRight') && !goingLeft) {
        xvel = unitsize;
        yvel = 0;
    } else if ((key === 'w' || key === 'W' || key === 'ArrowUp') && !goingDown) {
        xvel = 0;
        yvel = -unitsize; 
    } else if ((key === 's' || key === 'S' || key === 'ArrowDown') && !goingUp) {
        xvel = 0;
        yvel = unitsize; 
    }
};
function checkgameOver(){
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;  
        case (snake[0].y >= gameHeight):
            running = false;
            break;    
      
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            running = false;
            break;
        }
    }
};
// function displaygameOver(){
//     ctx.font=" 50px MV Boli";
//     ctx.fillStyle="black";
//     ctx.textAlign="center";
//     ctx.fillText("GAME OVER!",gameWidth/2,gameHeight/2);
//     running = false;

// };



function displaygameOver(){
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0,0,gameWidth,gameHeight);

    ctx.font = "48px system-ui";
    ctx.fillStyle = "#ff4c4c";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", gameWidth/2, gameHeight/2);

    ctx.font = "18px system-ui";
    ctx.fillStyle = "#ccc";
    ctx.fillText("Press Reset", gameWidth/2, gameHeight/2 + 40);

    running = false;
}

function resetGame(){
    score=0;
    xvel=unitsize;
    yvel=0;
     snake =[
    {x:unitsize*4,y:0},
    {x:unitsize*3,y:0},
    {x:unitsize*2,y:0},
    {x:unitsize*1,y:0},
    {x:unitsize*0,y:0}
];
gameStart();

};




