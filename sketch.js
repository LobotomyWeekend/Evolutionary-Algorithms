let vehicles;
let targetLoc;
let count = 0;
let maxCount = 400;
let maxForce = 10;

function setup() {
    createCanvas(640, 480);
    targetLoc = createVector(width/2, 30);
    population = new Population();
}


function draw() {
    background(30,180,240);   
    fill(0);
    ellipse(targetLoc.x, targetLoc.y, 10, 10);
    
    // Update + Draw Vehicles
    population.run();
    count++;

    // End of lifespan
    if (count == maxCount){
        population.evaluate();
        population.evolve();
        count = 0;       
    }   
}
