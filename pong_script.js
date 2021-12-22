const cvs= document.getElementById("pong");
const ctx= cvs.getContext("2d");
const ball={
    x:cvs.width/2,
    y:cvs.width/2,
    radius:10,
    velocityX:5,
    velocityY:5,
    speed:5,
    color:"white"
}
const user={
    x:0,
    y:(cvs.height-100)/2,
    width:10,
    height:100,
    score: 0,
    color:"white"
}
const com={
    x:cvs.width-10,
    y:(cvs.height-100)/2,
    width:10,
    height:100,
    score: 0,
    color:"white"
}
 const net={
     x:cvs.width/2,
     y:0,
     height:10,
     width:2,
     color:"white"
 }

function drawrect(x,y,w,h,color){
     ctx.fillStyle=color;
     ctx.fillRect(x,y,w,h);
 }
 function drawcircle(x,y,r,color){
     ctx.fillStyle=color;
     ctx.beginPath();
     ctx.arc(x,y,r,0,Math.PI*2,false);
     ctx.closePath();
     ctx.fill();
 }
cvs.addEventListener("mousemove",getMousePos)
function getMousePos(){
    let rect=cvs.getBoundingClientRect;
    user.y = evt.clientY - rect.top - user.height/2;
}
 function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}


 function drawnet(){
     for(let i=0;i<=(cvs.height);i+=15){
         drawrect(net.x,net.y+i,net.width,net.height,net.color);
     }
 }

 function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}
function collision(b,p){
    p.top=p.y;
    p.bottom=p.y+p.height;
    p.left=p.x;
    p.right=p.x+width;

    b.top=b.y-b.radius;
    b.bottom=b.y+b.radius;
    b.left=b.x-b.radius;
    b.right=b.x+b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}
function update(){
    if(ball.x-ball.radius<0){
        com.score++;
        resetBall();
    }
    else if(ball.x+ball.radius>cvs.width){
        user.score++;
        resetBall();
    }
    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
    com.y += ((ball.y - (com.y + com.height/2)))*0.1;
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > cvs.height){
        ball.velocityY = -ball.velocityY;
    }
    let player= (ball.x+ ball.radius<cvs.width/2)?user:com;
   if(collision(ball,player)){
       let collidepoint= (ball.y-(user.y+(user.height/2)));
       collidepoint=collidepoint/(user.height/2);
       let angle= (Math.PI/4)*collidepoint;
       let direction = (ball.x+ball.radius<cvs.width)?1:-1;
       ball.velocityX+=direction*ball.speed*Math.cos(angle);
       ball.velocityY+=ball.speed*Math.sin(angle);
       ball.speed += 0.1;
    }   
}
function render(){
      drawrect(0, 0, cvs.width, cvs.height, "#000");
      drawText(user.score,cvs.width/4,cvs.height/5);
      drawText(com.score,3*cvs.width/4,cvs.height/5);
      drawnet();
      drawrect(user.x, user.y, user.width, user.height, user.color);
      drawrect(com.x, com.y, com.width, com.height, com.color);
      drawcircle(ball.x, ball.y, ball.radius, ball.color);
}
function game(){
    update();
    render();
}
let framePerSecond = 50;
let loop = setInterval(game,1000/framePerSecond);