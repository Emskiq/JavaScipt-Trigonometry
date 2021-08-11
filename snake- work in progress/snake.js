var snake=[];
snake[0]={x:400,y:120,};
var score=0;
var lost=0;

window.onload = function() {
    var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
    document.addEventListener("keydown",direction);
    let game = setInterval(update,100);
    
    function update() {
        context.clearRect(0, 0, width, height);
        drawSnake();
        if(lost==0){
        context.font = "30px Comic Sans MS";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText(score, 20, 30); 
        }
	 }
}
let d="";
function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}
let food={
    x : Math.floor(Math.random()*15+1) * 40,
    y : Math.floor(Math.random()*12+1) * 40,
}
function drawSnake(){
    var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
    for (let i=0;i<snake.length;i++){
        temp=snake[i];
        if(temp.x>width){
            temp.x=0;
        }
        if(temp.x<0){
            temp.x=width-40;
        }
        if(temp.y>height){
            temp.y=0;
        }
        if(temp.y<0){
            temp.y=height+23;
        }
        context.fillStyle="green";
        context.beginPath();
        context.fillRect(temp.x,temp.y,40,40);
        context.beginPath();
        context.strokeStyle="black";
        context.rect(temp.x,temp.y,40,40);
        context.stroke();
    }
    context.fillStyle="red";
    context.beginPath();
    context.fillRect(food.x,food.y,40,40);
    context.beginPath();
        // old head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        if(snakeX == food.x && snakeY == food.y){
                food.x = Math.floor(Math.random()*15+1) * 40;
                food.y = Math.floor(Math.random()*12+1) * 40;
                score++;
        }else{
            
            snake.pop();
        }
        // which direction
        if( d == "LEFT") snakeX -= 40;
        if( d == "UP") snakeY -= 40;
        if( d == "RIGHT") snakeX += 40;
        if( d == "DOWN") snakeY += 40;
    let newHead = {
        x : snakeX,
        y : snakeY,
    }
    
    snake.unshift(newHead);
    for(let i=1;i<snake.length;i++){
        if(newHead.x==snake[i].x&&newHead.y==snake[i].y){
            console.log("op");
            d="";
            weLoastIt();
        }
    }
}
function weLoastIt(){
    var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
    for (let i=0;i<snake.length;i++){
        temp=snake[i];
        if(temp.x>width){
            temp.x=0;
        }
        if(temp.x<=0){
            temp.x=width;
        }
        if(temp.y>height){
            temp.y=0;
        }
        if(temp.y<0){
            temp.y=height+23;
        }
        context.fillStyle="green";
        context.beginPath();
        context.fillRect(temp.x,temp.y,40,40);
        context.beginPath();
        context.strokeStyle="black";
        context.rect(temp.x,temp.y,40,40);
        context.stroke();
    }
    lost=1;
    s="Game over :( Score: "+score;
    s+="\n";
    s1="Press any key to continue";
        context.clearRect(0, 0, width, height);
        context.font = "30px Comic Sans MS";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText(s, width/2, height/2);
        context.fillText(s1, width/2, height/2+30); 
    //location.reload();
}