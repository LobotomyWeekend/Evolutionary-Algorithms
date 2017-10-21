function DNA(genes){
    // Creates DNA based on genes, or random if none recieved
    if (genes){
        this.genes = genes;
    } else {
        this.genes = [];
        for (var i = 0; i < maxCount; i++ ){
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxForce)
        }
    }

    // "Mating" with another vehicle
    this.mating = function(partner){
        var newGenes = [];

        // Finds a midpoint, one side parentA, other side parentB
        var mid = floor(random(this.genes.length));
        for (var i = 0; i < this.genes.length; i++){
            if (i > mid){
                newGenes[i] = this.genes[i];
            } else {
                newGenes[i] = partner.genes[i];
            }
        }

        return new DNA(newGenes);
    }
}