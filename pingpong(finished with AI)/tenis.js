window.onload=function(){    
    var canvas=document.getElementById("canvas"),
        context=canvas.getContext("2d"),
        width=canvas.width=window.innerWidth,
        height=canvas.height=window.innerHeight,
        bWidth=width/2,
        bHeight=height/2,
        ballSpeed=8,
        player1=player.create(0,height/2-80,25,150),
        player2=player.create(width-25,height/2-80,25,150),
        player1Score=0,
        player2Score=0;
        
    var ball=particle.create(bWidth,bHeight,ballSpeed,Math.PI/1.35);
    ball.radius=25; 
    document.body.addEventListener("keydown",function(event){
        switch(event.keyCode){
            case 38: //up
            player1.y=player1.y-45;
                break;
            case 40: //down
                player1.y=player1.y+45;
                break;
            case 87: //up
            player2.y=player2.y-45;
                break;
            case 83: //down
                player2.y=player2.y+45;
                break;
            default:
                break;
        }
    });
    update();
    function update(){
    context.clearRect(0,0,width,height);
    var hitPlayer1=1,
        hitPlayer2=1;
    if(player1.y>=height-160){
        player1.y=height-160;
    }
    if(player1.y<=0){
        player1.y=0;
    }
    if(player2.y>=height-160){
        player2.y=height-160;
    }
    if(player2.y<=0){
        player2.y=0;
    }
    
    context.beginPath();
    context.fillStyle = "#000000";
    context.fillRect(player1.x,player1.y,player1.width,player1.height);
    context.fillRect(player2.x,player2.y,player2.width,player2.height);
    
    
        

    if(ball.position.getX()+ball.radius> width-25){
        if(crashWithLeft(player2,ball)){
            ball.position.setX(width-2*ball.radius);
            ball.velocity.setX(ball.velocity.getX()* -1);
            ballSpeed+=2;
            ball.velocity.setLength(ballSpeed);
        }
        else{
            player1Score++;
            ball.position.setX(width/2);
            ball.position.setY(height/2);
            ball.velocity.setAngle(Math.PI/1.35);
            ballSpeed=8;
            ball.velocity.setLength(ballSpeed);
        }
    }  
    if(ball.position.getX()-ball.radius<25){
        if(crashWithLeft(player1,ball)){
            if(isDown==1){
            ball.position.setX(ball.radius+25);
            ball.velocity.setX(ball.velocity.getX()* -1);
            ballSpeed+=2;
            ball.velocity.setLength(ballSpeed);
            ball.velocity.setAngle(Math.PI/4);
            isDown=0;
        }
        else if(isUp==1){
                ball.position.setX(ball.radius+25);
                ball.velocity.setX(ball.velocity.getX()* -1);
                ballSpeed+=2;
                ball.velocity.setLength(ballSpeed);
                ball.velocity.setAngle(-Math.PI/4);
                isUp=0;
            }
        }
        else{
            player2Score++;
            ball.position.setX(width/2);
            ball.position.setY(height/2);
            ball.velocity.setAngle(Math.PI/1.35);
            ballSpeed=8;
            ball.velocity.setLength(ballSpeed);
        }
    }
    if(ball.position.getY()+ball.radius> height){
        ball.position.setY(height-ball.radius);
        ball.velocity.setY(ball.velocity.getY()*-1);
    }  
    if(ball.position.getY()-ball.radius<0){
        ball.position.setY(ball.radius);
        ball.velocity.setY(ball.velocity.getY()*-1);
    }
    context.font = "50px Comic Sans MS";
    context.fillStyle = "blue";
    context.textAlign = "center";
    context.fillText(player1Score, (canvas.width/2.5), 50); 
    context.font = "50px Comic Sans MS";
    context.fillStyle = "blue";
    context.textAlign = "center";
    context.fillText(player2Score, (canvas.width/1.75), 50); 
    ball.update();

    context.beginPath();
    context.fillStyle = "#FF0000";
    context.arc(ball.position.getX(),ball.position.getY(),ball.radius,0,Math.PI*2,false);
    context.fill();
    var comCenter=player2.y;
    if(ball.position.getY()>=comCenter){
        if(ballSpeed>=12&&ballSpeed<=16){
            player2.y+=9;
        }
        else if(ballSpeed>=16){
            player2.y+=12;
        }
        else{
            player2.y+=7;
        }
    }
    else if(ball.position.getY()<=comCenter){
        if(ballSpeed>=14&&ballSpeed<16){
            player2.y-=9;
        }
        else if(ballSpeed>=16){
            player2.y-=12;
        }
        else{
            player2.y-=7;
        }
    }
    requestAnimationFrame(update);
    }
}
var isUp=0,
    isDown=0;
function crashWithLeft(player,ball){
    playerTop=player.y;
    playerBottom=player.y+player.height;
    playerLeft=player.x-player.width;
    playerRight=player.x+player.width;

    ballTop=ball.position.getY()-ball.radius;
    ballBottom=ball.position.getY()+ball.radius;
    ballLeft=ball.position.getX()-ball.radius;
    ballRight=ball.position.getX()+ball.radius;
    
    var ballCenter=ball.position.getY(),
        playerCenterPoint=player.y+player.height/2;
    if(ballRight>playerLeft&&ballBottom>playerTop&&ballLeft<playerRight&&ballTop<playerBottom){
        
        if(ballCenter>playerCenterPoint){
            isUp=1;
            isDown=0;
        }
        else if(ballCenter<=playerCenterPoint){
            isDown=1;
            isUp=0;
        }
        return true;
    }
    else{
        return false;
    }
}
function positonPL(ball,player){
    var compLevel=0.1
    player.y+=(ball.position.y-(player.y+player.height/2))*compLevel;
}




/*function randomAngle(){
    var temp=Math.floor(Math.random() * 7) +4;
    var temp2=Math.floor(Math.random() * 2) + 1; 
    if(temp2==1){
        temp=temp/10+1;
        let angle=Math.PI/temp;
        return angle;
    }
    else{
        let angle=Math.PI/temp;
        return angle;
    }
}*/