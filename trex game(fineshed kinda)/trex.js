var path = new Image(); 
path.src = 'path.png';
var trex = new Image(); 
trex.src = 'trex.png';
var trex1 = new Image(); 
trex1.src = 'trex1.png';
var trex2 = new Image(); 
trex2.src = 'trex2.png';

var globalID;
var obstacles=[];
var score=0;
var speed=8;
var player;

window.onload=function(){
var canvas=document.getElementById("canvas"),
        context=canvas.getContext("2d"),
        width=canvas.width=window.innerWidth,
        height=canvas.height=window.innerHeight,
        myHeight=(height*2)/2.7,
        jump=vector.create(0,-14),
        onGround=true;

    player=particle.create(70,myHeight-40,0,0,0.5);
    player.radius=60;
    
    document.body.addEventListener("keydown",function(event){
        switch(event.keyCode){
            case 32: //spacebar
                if(onGround){
                    player.velocity.setLength(1);
                    player.velocity.addTo(jump);
                    onGround=false;
                }
                break;
            default:
                break;
        }
    });
    
    newObs();
    update();
    
    function update(){
        context.clearRect(0,0,width,height);

        drawRandomObs();
        player.update();
        if(player.position.getY()+player.radius>myHeight){
            player.position.setY(myHeight-player.radius);
            onGround=true;
        }
        context.drawImage(path,0,myHeight);
        //context.drawImage(trex,player.position.getX(),player.position.getY());
        context.drawImage(trex2,player.position.getX(),player.position.getY()); 
        context.font = "30px Comic Sans MS";
        context.fillText("Score:"+Math.round(score),width/2+450,30);
        score+=0.2;

        if(Math.round(score)%50==0){
            speed*=1.01;
        }
        if(Math.round(score)%2==0){
            context.drawImage(trex1,player.position.getX(),player.position.getY());
            
        }
        
        var rand=utils.randomInt(0,120);
        if(rand==3){
            newObs();
        }
        if(collision){
            context.font = "30px Comic Sans MS";
            context.fillText("Game over..",width/2-50,height/2);
            globalID=requestAnimationFrame(update);
            cancelAnimationFrame(globalID);
            document.body.addEventListener("keydown",function(event){
                switch(event.keyCode){
                    case 32: //spacebar
                        location.reload();
                        break;
                    default:
                        break;
                }
            });
        }
        else{
            globalID=requestAnimationFrame(update);
        }
    }
}

function drawPath(){
    var canvas=document.getElementById("canvas"),
        context=canvas.getContext("2d"),
        width=canvas.width=window.innerWidth,
        height=canvas.height=window.innerHeight,
        myHeight=(height*2)/2.7;

    context.beginPath();
    context.moveTo(0,myHeight);
    context.lineTo(width,myHeight);
    context.stroke();
}

var collision=false;

function drawRandomObs(){
    var canvas=document.getElementById("canvas"),
        context=canvas.getContext("2d"),
        width=canvas.width=window.innerWidth,
        height=canvas.height=window.innerHeight,
        myHeight=(height*2)/2.7;

    for(var i=0;i<obstacles.length;i++){
        obstacles[i].speed=speed;
        obstacles[i].x-=obstacles[i].speed;
        var obsX=obstacles[i].x;
        var obsY=obstacles[i].y;
        var obsWidth=obstacles[i].width;
        var obsHeight=obstacles[i].height;

        if(obstacles.length>1){         //distance between obs
            if(i<obstacles.length-1){
                if(obstacles[i].x+obstacles[i].width+380>=obstacles[i+1].x){
                    obstacles.splice(i+1,1);
                }
            }
        }
        if(obsX>0-obsWidth){            //on screen
            context.beginPath();
            context.rect(obsX+3,obsY+3,obsWidth-3,obsHeight-3);
            context.fill();

            if(obsWidth==22)context.drawImage(cactus1,obsX,obsY);
            if(obsWidth==49)context.drawImage(cactus2,obsX,obsY);
            if(obsWidth==47)context.drawImage(cactus3,obsX,obsY);
            if(containsRect(obstacles[i])){
                console.log("collison");
                player.velocity.setLength(0);
                obstacles[i].speed=0;
                collision=true;
                break;
            }
        }
        else{
            obstacles.splice(i,1);
        }
    }
}

var cactus1 = new Image(); 
cactus1.src = 'cactus1.png';
var cactus2 = new Image(); 
cactus2.src = 'cactus2.png';
var cactus3 = new Image(); 
cactus3.src = 'cactus3.png';

function newObs(){
    var canvas=document.getElementById("canvas"),
        context=canvas.getContext("2d"),
        width=canvas.width=window.innerWidth,
        height=canvas.height=window.innerHeight,
        myHeight=(height*2)/2.7;

    var size=utils.randomInt(0,2);

    if(size==0){
        var newObs=obs.create(width-10,myHeight-46,22,46);
        obstacles.push(newObs);
    }
    else if(size==1){
        var newObs=obs.create(width-10,myHeight-47,49,47);
        obstacles.push(newObs);
    }
    else {
        var newObs=obs.create(width-10,myHeight-47,47,47);
        obstacles.push(newObs);
    }
}

var temp={
    x:0,
    y:0,
    width:0,
    height:0,
};

function partToRect(player){
    temp.x=player.position.getX();
    temp.y=player.position.getY();
    temp.width=player.radius;
    temp.height=player.radius;
}

function containsRect(rect2) {
    partToRect(player);
    if (temp.x < rect2.x + rect2.width &&
        temp.x + temp.width > rect2.x &&
        temp.y < rect2.y + rect2.height &&
        temp.y + temp.height > rect2.y) {
        return true;
     }
}