const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;

var YES = true;
var NO = true;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 10,
  color: "blue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

const jog1 = {

  P1PosY: 250, 
  P1PosX: 795,  
  VelY: 20, 
  color: "red",
  width: 20, 
  height: 100,

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.P1PosX, this.P1PosY,this.width,this.height); // desenha o obstaculo
  },
};


const jog2 = {

  P2PosY: 260, 
  P2PosX: 0,  
  VelY: 20, 
  color: "black",

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.P2PosX, this.P2PosY,20,100); // desenha o obstaculo
  },
};

function drawjog1 () {


  jog1.draw();

   
  if(jog1.P1PosY + jog1.VelY > canvas.height || jog1.P1PosY - jog1.VelY < 0) {

    jog1.color = "green";
    
    NO = true;
    YES = false;
  
  
  
    } else if(jog1.P1PosY + jog1.VelY > 0){

      jog1.color = "yellow";

      YES = true;
      NO = false;
     


    }
    
    
    else{
  
     
    jog1.color = "red"; 
    YES = true;
    NO = true;
  
    }
  

}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  //ball.x += ball.vx;
  //ball.y += ball.vy;


 jog2.draw();
 jog1.draw();




  
  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }


 


  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener("click", (e) => {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout", (e) => {
  window.cancelAnimationFrame(raf);
});

ball.draw();
jog1.draw();
jog2.draw();

////Codigo da bola





window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    if (event.code === "ArrowDown" && NO){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
     jog1.P1PosY += jog1.VelY;
     jog1.draw();
     jog2.draw();
     ball.draw();
     drawjog1();

    } else if (event.code === "ArrowUp" &&  YES){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      jog1.P1PosY -= jog1.VelY;
      jog1.draw();
      jog2.draw();
      ball.draw();
      drawjog1();
    }
    else if (event.code === "KeyW"){
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      jog2.P2PosY -= jog2.VelY;
      jog2.draw();
      jog1.draw();
      ball.draw();
  }
  else if (event.code === "KeyS"){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      jog2.P2PosY += jog2.VelY;
      jog2.draw();
      jog1.draw();
      ball.draw();
}
    
  
  }, true);


  