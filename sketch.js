let vehicles = [];
let noVehicles = 100;
let targetLoc = [320,30];
let count;
let maxCount = 1000;

function setup() {
    createCanvas(640, 480);
    count = 0;

    // point vehicles are aiming for
    target = point(targetLoc);

    // create array of vehicles
    newVehicles();


}


function draw() {
    background(30,180,240,);

    // Motion
    if ( count < maxCount ){
        // visualise target location
        fill(0);
        ellipse(width/2,30, 10,10);

        // update and draw current vehicles
        for (var i = 0; i < noVehicles; i++){
            vehicles[i].render();
            vehicles[i].update(count);
        }

        count = count+1;
    }
    // Mutate & Reset
    else if (count == maxCount){
        // assign scores
        for (var i = 0; i < noVehicles; i++){
            vehicles[i].score();
        }
        // genetic mutation

        // restart
        newVehicles(); //holder for now
        count = 0;
    }

    
}

Vehicle = function(){
    this.x = width/2;
    this.y = height-30;

    this.velX = [];
    this.velY = [];

    this.render = function(){
        noStroke();
        fill(255,50,10);
        ellipse(this.x,this.y, 10, 10);
    }

    this.randomVelocity = function(){
        for (i = 0; i < 1000; i++){
            this.velX[i] = random(-10,10);
            this.velY[i] = random(-10,10);
        }
    }

    this.update = function(count){
        this.x = this.x + this.velX[count];
        this.y = this.y + this.velY[count];  

        if (this.x == targetLoc[0] && this.y == targetLoc[1]){
            this.velX = this.velX*0;
            this.velY = this.velY*0;
        }
    }

    this.score = function(){
        //inverse of distance from target in x & y
        this.scoreX = 1/(this.x - targetLoc[0]);
        this.scoreY = 1/(this.y - targetLoc[1]);
        //average
        this.score = abs(this.scoreX + this.scoreY) / 2;
    }
    
}

function newVehicles(){
    for (var i = 0; i < noVehicles; i++){
        vehicles[i] = new Vehicle();
        vehicles[i].randomVelocity();
    }
}