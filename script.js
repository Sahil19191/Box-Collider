let canvas = document.getElementById('paintbox');
let context = canvas.getContext('2d');
let gameon = true;
class Box{
    constructor(size,color){
        this.size = size;
        this.color = color;
        this.x = 0;
        this.y = 0;
    }
}


class Player extends Box {
    constructor(){
        super(50,'blue');
        this.x = 0;
        this.y = 250;
        this.speed = 10;
    }

    move_up(){
        if(this.y > 0){
            this.y -= this.speed;
            if(this.y < 0)  this.y = 0;
        }
    }
    move_down(){
        if(this.y < 500){
            this.y += this.speed;
            if(this.y > 450)  this.y = 450;
        }
    }

    move_left(){
        if(this.x > 0){
            this.x -= this.speed;
            if(this.x < 0)  this.x = 0;
        }
    }
    move_right(){
        if(this.x < 500){
            this.x += this.speed;
            if(this.x > 450)    this.x = 450;
        }
    }
}


class Enemy extends Box {
    constructor(speed){
        super(50,'red');
        this.speed = speed;
    }

    move(){
        this.y += this.speed;
        if(this.y > 450)
            this.speed = -(Math.abs(this.speed));
        
        if(this.y < 0)
            this.speed = (Math.abs(this.speed));
    }
}

class Finish extends Box{
    constructor(){
        super(50,'green');
        this.x = 450;
        this.y = Math.floor(Math.random()*450 + 1);
        if(this.y % 10 !=0){
            let b = this.y %10;
            b = 10 - b;
            if(this.y+b<=500)   this.y+=b;
            else{
                this.y -= (10-b);
            }
        }
    }
}

let player = new Player();

let e1 = new Enemy(2);
let e2 = new Enemy(4);
let e3 = new Enemy(6);
let e4 = new Enemy(8);
let finish = new Finish();

e1.x = 120;
e2.x = 220;
e3.x = 300;
e4.x = 400;

function drawBox(box){
    context.fillStyle = box.color;
    context.fillRect(box.x,box.y,box.size,box.size);
}



// setInterval(() => {
//     context.clearRect(0,0,500,500);
//     if(e1.y + e1.speed > 500){
//         e1.y = 0;
//     }
//     else
//     e1.y += e1.speed;

//     if(e2.y + e2.speed >500){
//         e2.y = 0;
//     }
//     else
//     e2.y += e2.speed;

//     drawBox(e1);
//     drawBox(e2);
// },100);


document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            // alert('left');
            player.move_left();
            break;
        case 38:
            player.move_up();
            break;
        case 39:
            // alert('right');
            player.move_right();
            break;
        case 40:
            player.move_down();
            break;
    }
};


function isCollided(box1,box2){
    if(Math.abs(box1.x - box2.x) < 50 && Math.abs(box1.y - box2.y) < 50){
        return true;
    }
    return false;
}


function checkWin(box1,box2){
    if(box1.x === box2.x && box1.y === box2.y){
        return true;
    }
    return false;
}


function gameLoop(){

    if(!gameon){
        return;
    }
    context.clearRect(0,0,500,500);
    
    e1.move();
    e2.move();
    e3.move();
    e4.move();
    if(checkWin(player,finish)){
        window.alert("you won");
        gameon = false;
        location.reload();
    }
    if(isCollided(e1,player) || isCollided(e2,player) || isCollided(e3,player) || isCollided(e4,player)){
        gameon = false;
        window.alert("Game Over");
        location.reload();
    }
    drawBox(player);
    drawBox(e1);
    drawBox(e2);
    drawBox(e3);
    drawBox(e4);
    context.fillStyle = finish.color;
    context.strokeRect(finish.x,finish.y,finish.size,finish.size);



    window.requestAnimationFrame(gameLoop);
}

gameLoop();
