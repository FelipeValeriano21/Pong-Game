const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



const num2 = document.getElementById('num2');
const num1 = document.getElementById('num1');



var placar2 = 0;

var placar1 = 0;

var a1 = true;
var a2 = false;

var a3 = true;
var a4 = false;

const jog1 = {

    P1PosY: 250, 
    P1PosX: 795,  
    VelY: -20, 
    color: "green",
    width: 20, 
    height: 100,
  
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.P1PosX, this.P1PosY,this.width,this.height); // desenha o jogador 1 
    },
  };

  const jog2 = {

    P2PosY: 240, 
    P2PosX: -5,  
    VelY: -20, 
    color: "red",
    width: 20, 
    height: 100,
  
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.P2PosX, this.P2PosY,20,100); // desenha o jogador 2
    },
  };

  jog1.draw();
  jog2.draw();  


  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    jog1.draw();
    jog2.draw();
    verificacolisao();
    verificacolisaojog2();

  }  


  window.addEventListener('keydown', controlajog1); //controla jogador 1 

  function controlajog1(e) {
   
    if (e.code === "ArrowDown" && a2){

        jog1.P1PosY -= jog1.VelY;
        
    } else if (e.code === "ArrowUp" && a1){

        jog1.P1PosY += jog1.VelY;


    }

    draw();
  }

  window.addEventListener('keydown', controlajog2); //controla jogador 1 

  function controlajog2(e) {
   
    if (e.code === "KeyW" &&  a3){

        jog2.P2PosY += jog2.VelY;
        
    } else if (e.code === "KeyS" && a4){

        jog2.P2PosY -= jog2.VelY;
    }

    draw();
  }



  ///// Colisão 

  function verificacolisao () {

    if(jog1.P1PosY + jog1.VelY < -20) {
        a2 = true;
        a1 = false;  
       jog1.color = "green";

} else if(jog1.P1PosY - jog1.VelY > 510){
         a1 = true; 
         a2 = false;
        jog1.color = "green";
    }else{
        jog1.color = "green"
        a2 = true;
        a1 = true; 
    }
  }


  function verificacolisaojog2 () {

    if(jog2.P2PosY + jog2.VelY < 0) {
        a4 = true;
        a3 = false;  
        jog2.color = "red";

}else if(jog2.P2PosY + jog2.VelY > 470){
      a3 = true; 
      a4 = false;
     jog2.color = "red";
}else{
        jog2.color = "red "
        a4 = true;
        a3 = true; 
    }
  }


  ////////////////////////////////////////////////////////////////// funcionando


  const ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    color: "white",
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y,20,20); 
    },
  };

  function drawball() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;

    jog1.draw();
    jog2.draw();

  
    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
      ball.vy = -ball.vy;
    }
     
    if (ball.x + ball.vx > canvas.width ){

      alert("Red Score")

      ball.x = 700;
      ball.y = 70;
   
      ball.vx = -ball.vx;

      ball.draw();

      placar1++; 

      num1.textContent = placar1;




    }

    if (ball.x + ball.vx < 0){

      alert("Green Score")
      ball.x = 100;
      ball.y = 100;
   
      ball.vx = -ball.vx;

      ball.draw();

      placar2++; 

      num2.textContent = placar2;

    }

     if (ball.x + 20 > jog1.P1PosX && ball.x < jog1.P1PosX + jog1.width && ball.y + 20 > jog1.P1PosY && ball.y < jog1.P1PosY + jog1.height){

      ball.vx = -ball.vx;

     }

     if (ball.x + 20 > jog2.P2PosX && ball.x < jog2.P2PosX + jog2.width && ball.y + 20 > jog2.P2PosY && ball.y < jog2.P2PosY + jog2.height){

      ball.vx = -ball.vx;

     }
  
    raf = window.requestAnimationFrame(drawball);
  }
  
  canvas.addEventListener("click", (e) => {
    raf = window.requestAnimationFrame(drawball);
  });
  
  canvas.addEventListener("mouseout", (e) => {
    window.cancelAnimationFrame(raf);
  });
  
  ball.draw();
