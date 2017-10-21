Vehicle = function(){
    // Initial Conditions
    this.pos = createVector(width/2, height - 30);
    this.vel = createVector();
    this.acc = createVector();

    // Initial States
    this.completed = false;
    this.crashed = false;
    this.fitness = 0;

    // Give vehicle its DNA
    if (dna) this.dna = dna;
    else this.dna = new DNA();

    this.render = function(){
        noStroke();
        fill(255,50,10);
        ellipse(this.x,this.y, 10, 10);
    }

    this.update = function(count){
        // Calculate distance to region
        var d = dist(this.x, this.y, targetLoc.x, targetLoc.y);
        // Change of states
        if (d < 10){
            // reached target
            this.completed = true;
            this.pos = targetLoc.copy();
        } if (this.pos.x > width  || this.pos.x < 0 || this.pos.y > height || this.pos.x < 0){
            // hit edge of window
            this.crashed = true;
        }
        // Physics
        this.acc.add(this.dna.genes[count]);
        if (!this.completed && !this.crashed){
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }

    this.getScore = function(){
        // Map range
        var d = dist(this.x, this.y, targetLoc.x, targetLoc.y);        
        this.score = map (d, 0, width, width, 0);
        // Special cases
        if (this.completed) this.score *= 10;
        if (this.crashed) this.score /= 10;
    }
    
}