let vehicles;
let noVehicles = 10;
let targetLoc = createVector(width/2, 30);
let count = 0;
let maxCount = 400;
let maxForce = 0.4;

function setup() {
    createCanvas(640, 480);
    population = new Population(noVehicles);
}


function draw() {
    background(30,180,240,);   
    fill(0);
    ellipse(width/2,30, 10,10);
    
    // Update + Draw Vehicles
    population.run();
    count++;

    // End of lifespan
    if (count == maxCount){
        population.evaluate();
        population.evolution();
        count = 0;       
    }   
}
