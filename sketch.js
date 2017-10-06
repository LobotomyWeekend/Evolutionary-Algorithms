let vehicles = [];
let noVehicles = 100;
let targetLoc = [320,30];
let count;
let maxCount = 500;
let PI = 3.14159;

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
        for (var i = 0; i < vehicles.length; i++){
            vehicles[i].render();
            vehicles[i].update(count);
        }

        count = count+1;
    }
    // Mutate & Reset
    else if (count == maxCount){
        // assign scores
        for (var i = 0; i < vehicles.length; i++){
            vehicles[i].getScore();
        }
        // genetic mutation
        mutate();
        count = 0;
    }

    
}

Vehicle = function(){
    this.x = width/2;
    this.y = height-30;

    this.velX = [];
    this.velY = [];

    this.score = 0;

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

    this.getScore = function(){
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

function mutate(){

    //sort by descending score
    vehicles.sort(function(a,b){
        return parseFloat(a.score) - parseFloat(b.score)
    })
    vehicles.reverse();

    //probablistically generate parents
    let parents = [];
    let l = 0; 
    let m = 0;
    while (parents.length < noVehicles/2){
        odds = random(-0.1, cos(PI/200*l))

        if (odds > 0){
            parents[m] = vehicles[m];
            m = m+1;
        }

        l = l + 1;
        if (l > vehicles.length) l = 0;
    }
    
    //each parent has a child with random mutation
    let children = parents; 
    for (var i = 0; i < children.length; i++){
        for (var j = 0; j < children[i].velX.length; j++){
            children[i].velX[j] = children[i].velX[j] + random (-0.1,0.1);
            children[i].velY[j] = children[i].velY[j] + random (-0.1,0.1);
        }
    }

    //new vehicle set = parents + children
    let newVehicles = parents.concat(children);
    vehicles = newVehicles;

    console.log(vehicles)
}