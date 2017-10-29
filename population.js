function Population(){
    // Assign and populate arrays
    this.vehicles = [];
    this.parents = [];
    this.noVehicles = 100;
    for (var i = 0; i < this.noVehicles; i++) {
        this.vehicles[i] = new Vehicle();
    }

    // Function run each frame
    this.run = function(){
        for (var i = 0; i < this.noVehicles; i++){
            this.vehicles[i].update();
            this.vehicles[i].render();
        }
    }

    // Evaluate scores
    this.evaluate = function(){
        // Iterate and calculate each vehicle's score, and maximum score
        var maxScore = 0;
        for (i = 0; i < this.noVehicles; i++){
            this.vehicles[i].getScore();
            if (this.vehicles[i].score > maxScore){
                maxScore = this.vehicles[i].score;
            }
        }
        // Normalize
        for (var i = 0; i < this.noVehicles; i++){
            this.vehicles[i].score /= maxScore;
        }
        this.parents = [];
        // Generate matrix with strong vehicles more often
        for (var i = 0; i < this.noVehicles; i++){
            var m = this.vehicles[i].score * 100;
            for (var j = 0; j < m; j++){
                this.parents.push(this.vehicles[i]);
            }
        }
    }

    // Evolution function
    this.evolve = function(){
        var newVehicles = [];
        for (var i = 0; i < this.vehicles.length; i++){
            // Mix parent A and B's DNA
            var parentA = random(this.parents).dna;
            var parentB = random(this.parents).dna;
            var child = parentA.mating(parentB);
            child.mutation();
            newVehicles[i] = new Vehicle(child);
        }
        this.vehicles = newVehicles;
    }
}