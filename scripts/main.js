let snakehead = { x: 10, y: 10 };
let apple = { x: 5, y: 5 };
let lastlocation = { x: ["10"], y: ["10"] };
let snakelength = 1;
let moving = 'right';
let go = 0;
let gameover = false;
let eaten = true;
let score = 0;
let endgame = false;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const size = canvas.width / 30;
const scoreboard = document.querySelector("h3")

function drawnewapple(dx, dy){
  let x, y
  eaten = false;
  while(true){
    let trueBp = true;
    x = Math.floor(Math.random() * 19) + 1
    y = Math.floor(Math.random() * 19) + 1
    console.log(`try apple ${x}, ${y}`)
    for(let i = 0; i < dx.length; i++){
      if(dx[i] == x && dy[i] == y){
        trueBp = false;
        break;
      }
    };
    if(trueBp) break;
  };
  apple = { x, y };
  console.log(`new apple in ${apple.x} ${apple.y}`)
};

function clearSceen(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 600, 600);
};

function drawsnake(){
  clearSceen();
  let snakebody = {x: [], y:[]};
  for(let i = -1; i <= snakelength; i++){
    if(snakelength <= 0) break;
    ctx.fillStyle = "green";
    ctx.fillRect(lastlocation.x[go - i] * 30, lastlocation.y[go - i] * 30, size, size);
    snakebody.x.push(lastlocation.x[go - i]);
    snakebody.y.push(lastlocation.y[go - i]);
  };
  for(let i = 0; i < snakebody.x.length; i++){
    if(snakebody.x[i] == snakehead.x && snakebody.y[i] == snakehead.y){
      return gameover = true;
    }
  };
  if(eaten){
    drawnewapple(snakebody.x, snakebody.y);
  } else {
    if(snakehead.x == apple.x && snakehead.y == apple.y){
      score++;
      snakelength++;
      scoreboard.textContent = `Scores: ${score}/351 | game running`
      eaten = true;
    }
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * 30, apple.y * 30, size, size);
  }
  ctx.fillStyle = "yellow";
  ctx.fillRect(snakehead.x * 30, snakehead.y * 30, size, size);
  go++
};

function keyDown(event){
  if(event.keyCode == 38){
    moving = 'up';
  };
  if(event.keyCode == 40){
    moving = 'down';
  };
  if(event.keyCode == 37){
    moving = 'left';
  };
  if(event.keyCode == 39){
    moving = 'right';
  };
};

document.body.addEventListener('keydown', keyDown);

setInterval(() => {
  if(endgame) return;
  lastlocation.x.push(snakehead.x);
  lastlocation.y.push(snakehead.y);
  if(moving == 'up') snakehead.y -= 1;
  if(moving == 'down') snakehead.y += 1;
  if(moving == 'left') snakehead.x -= 1;
  if(moving == 'right') snakehead.x += 1;
  if(snakehead.x >= 20) snakehead.x = 0;
  if(snakehead.x < 0) snakehead.x = 20;
  if(snakehead.y >= 20) snakehead.y = 0;
  if(snakehead.y < 0) snakehead.y = 20;
  drawsnake();
  if(score > 350){
    gameover = true;
  }
  if(gameover){
    console.log(gameover);
    scoreboard.textContent = `Scores: ${score}/351 | game finish`;
    endgame = true;
  }
}, 125)
