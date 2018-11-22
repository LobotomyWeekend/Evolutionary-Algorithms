let vehicles;
let targetLoc;
let count = 0;
let evolutions = 0;
let maxCount = 400;
let maxForce = 3;

function setup() {
    createCanvas(640, 480);
    targetLoc = createVector(width/2, height/2);
    population = new Population();
}


function draw() {
    background(255);   
    fill(0);
    ellipse(targetLoc.x, targetLoc.y, 20,20);
    var n = evolutions.toString();
    textSize(16);
    text ("Evolutions:", 10, height-10);
    text(n, 90, height-10);
    
    // Update + Draw Vehicles
    population.run();
    count++;

    // End of lifespan
    if (count == maxCount){
        population.evaluate();
        population.evolve();
        count = 0;
        evolutions++;       
    }  
}
