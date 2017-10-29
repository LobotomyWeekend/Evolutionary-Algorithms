function Vehicle(dna){
    // Initial Conditions
    this.pos = createVector(width/2, height - 30);
    this.vel = createVector();
    this.acc = createVector();

    // Initial States
    this.completed = false;
    this.crashed = false;
    this.fitness = 0;

    // Give vehicle its DNA
    if (dna){
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }

    this.render = function(){
        noStroke();
        fill(255,50,10);
        ellipse(this.pos.x,this.pos.y, 10, 10);
    }

    this.applyForce = function(force) {
        this.acc.add(force);
      }

    this.update = function() {
        // Checks distance from rocket to target
        var d = dist(this.pos.x, this.pos.y, targetLoc.x, targetLoc.y);
        // If distance less than 10 pixels, then it has reached target
        if (d < 10) {
            this.completed = true;
            this.pos = targetLoc.copy();
        }
        // Rocket has hit left or right of window
        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;
        }
        // Rocket has hit top or bottom of window
        if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;
        }

        //applies the random vectors defined in dna to consecutive frames of rocket
        this.applyForce(this.dna.genes[count]);

        // if rocket has not got to goal and not crashed then update physics engine
        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }

    this.getScore = function(){
        // Takes distance to target
        var d = dist(this.pos.x, this.pos.y, targetLoc.x, targetLoc.y);
        // Maps range of fitness
        this.score = map(d, 0, width, width, 0);
        // If rocket gets to target increase fitness of rocket
        if (this.completed) {
            this.score *= 10;
        }
        // If rocket does not get to target decrease fitness
        if (this.crashed) {
            this.score /= 10;
        }
    }
    
}