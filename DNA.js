function DNA(genes) {
    // Recieves genes and create a dna object
    if (genes) {
      this.genes = genes;
    }
    // If no genes just create random dna
    else {
      this.genes = [];
      for (var i = 0; i < maxCount; i++) {
        // Gives random vectors
        this.genes[i] = p5.Vector.random2D();
        // Sets maximum force of vector to be applied to a rocket
        this.genes[i].setMag(maxForce);
      }
    }
    // Performs a crossover with another member of the species
    this.mating = function(partner) {
      var newGenes = [];
      // Picks random midpoint
      var mid = floor(random(this.genes.length));
      for (var i = 0; i < this.genes.length; i++) {
        // If i is greater than mid the new gene should come from this partner
        if (i > mid) {
          newGenes[i] = this.genes[i];
        }
        // If i < mid new gene should come from other partners gene's
        else {
          newGenes[i] = partner.genes[i];
        }
      }
      // Gives DNA object an array
      return new DNA(newGenes);
    }
  
    // Adds random mutation to the genes to add variance.
    this.mutation = function() {
      for (var i = 0; i < this.genes.length; i++) {
        // if random number less than 0.01, new gene is then random vector
        if (random(1) < 0.1) {
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(maxForce);
        }
      }
    }
  
  }