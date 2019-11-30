const speedDash = document.querySelector('.speedDash');

//const enemyIMG = document.getElementById('enemyIMG');

const enemyIMG = new Image();
enemyIMG.src = './images/car9.png';


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    let canvas = document.getElementById('road');
    let ctx = canvas.getContext('2d');
    const f1Theme = document.getElementById('f1-theme');
    f1Theme.play();
    let obstacleArray = [];

//PT1

  //   class Obstacle {
  //     constructor(x, y, width, height){
  //         this.x = x;
  //         this.y = y;
  //         this.width = width;
  //         this.height = height;
  //     }

  //     drawObs = () => {
  //       ctx.fillStyle = 'red';
  //       ctx.fillRect(this.x, this.y, this.width, this.height);
  //     }
    
  //     moveDownForever(){
  //        let enemy = setInterval(()=>{
  //         //    each setInterval function gets a unique ID
  //         // were using blah here to save this ID
  //             this.y += 15;
  
  //             if(this.y > 500){
  //                 clearInterval(enemy)
  //             }
  //         },80)
  //     }
  // }



//PT2

    class Obstacle {
      constructor( x, y, width, height, enemyIMG){
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.enemyIMG = enemyIMG;
      }

      onEnemyLoad = () => {
        const enemyIMG = new Image();
        enemyIMG.src = './images/enemy.png';
    
        enemyIMG.onload = () => {
              this.enemyIMG = enemyIMG;
              this.drawEnemy();
          }
      }

      drawEnemy = () => {
        ctx.drawImage(this.enemyIMG, this.x, this.y, this.width, this.height);
      }
    
      moveDownForever(){
         let enemy = setInterval(()=>{

              this.y += 6;
  
              if(this.y > 500){
                  clearInterval(enemy)
              }
          }, 15)
      }
  }

  

  function spawnObstacle(){
    let rX = Math.floor(Math.random() * 200);
    // let rY = Math.floor(Math.random() * 200);
    // let rWidth = Math.floor(Math.random() * 1) + 10;
    // let rHeight = Math.floor(Math.random() * 35) + 10;
    //let obsLoad = new Obstacle(rX, rY, rWidth, rHeight);
    let obsLoad = new Obstacle(rX, 0, 40, 71, enemyIMG);
    obstacleArray.push(obsLoad);
    obsLoad.moveDownForever();
    CarsS();
    // console.log(obsLoad.x);

  }

  // console.log(obsLoad);
  console.log(obstacleArray);

    class Car {
      constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
      }

      onCarLoad = () => {
        const carImg = new Image();
        carImg.src = './images/car4.png';
    
        carImg.onload = () => {
              // ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
              this.img = carImg;
              this.drawCar;
          }
        }

      moveCar = (moveX) => {
        if(moveX + this.width <= 350 && moveX >= 0){
        this.x = moveX;
        // console.log("This move is " + moveX);
        } else {
          console.log("out the boundaries")
          }
        }

      drawCar = () => {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
    }

    let carLoading = new Car(150, 400, 40, 71);
    carLoading.onCarLoad();
    let speed = 20;

    function updateDash() {
    ////console.log(player);  
      speedDash.innerHTML = Math.round(score.speed * 13);  
    }

    function checkCollision (aframe) {
      obstacleArray.forEach((enemy) => {
      var rect1 = carLoading;
      var rect2 = enemy;

      if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
          // collision detected!

          console.log("collision!");
          cancelAnimationFrame(aframe);
          Crash();
          GameOver();
          
          return true;
          
      }
      return false;
      })
    }

    document.onkeydown = function(e){
      if(e.key === "ArrowLeft"){
        if(carLoading.x - speed >= 0){
          carLoading.moveCar(carLoading.x -= speed);
        }
      }
      if(e.key === "ArrowRight"){
        if(carLoading.x + speed <= 300){
        carLoading.moveCar(carLoading.x += speed);
        }
      }
  }
  let gameoverpopup = document.getElementById('gameover-screen');

  function GameOver() {
    gameoverpopup.style.display = "flex";
  }

  function Crash() {
    const crash = document.getElementById('crash');
    crash.play();
  }

  function CarsS() {
    const cars = document.getElementById('cars');
    cars.play();
  }

  let score = document.getElementById("score");
  let finalscore = document.getElementById("finalscore");
  let frames = 0;

  function mainLoop(){
    let aframe = requestAnimationFrame(mainLoop);

    frames++;

    ctx.clearRect(0,0,350,500);

    // this is where we draw the car
    carLoading.drawCar();

    // this is where we draw the obstacles
    // obsLoad.drawObs();

    obstacleArray.forEach((eachObstacle)=>{
      eachObstacle.drawEnemy();
    })

    if(checkCollision (aframe)) {
      cancelAnimationFrame(aframe);

    }

    if(frames % 100 === 0){
      score.innerText = frames/100;
      finalscore.innerText = frames/100;
      spawnObstacle();
    }
    
  }
  setTimeout(mainLoop, 200);


}

};