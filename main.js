// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function for organism Pila aequor (returns an object)
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    // Mutating DNA method
    mutate() {
      // creating a random base number from the length of .dna array
      let base = Math.floor(Math.random() * this.dna.length);

      // checking if the base needs to be changed
      if (this.dna[base] === this.dna[base]) {
        let newBase = returnRandBase();
        // checking if the new base is not equal to old base if it is run the functon again
        if (newBase != this.dna[base]) {
          this.dna[base] = newBase;
          return this.dna;
        } else {
          this.mutate();
          return this.dna;
        }
      }
    },
    // Comparing DNA method
    compareDNA(pAequor) {
      // setting up a counter for same bases
      let count = 0;

      // looping through both current dna & passed in dna, finding the same bases and couting them
      for (let index = 0; index < this.dna.length; index++){
        if (this.dna[index] === pAequor.dna[index]){
          count++;
        }
      }

      // calculating the percentage of common bases
      let percentCommon = count / this.dna.length;
      let roundedPercent = percentCommon.toFixed(2) * 100;

      // returning a statement of what percent the two specimens have in common
      return `Specimen #` + this.specimenNum + ` and specimen #` + pAequor.specimenNum + ` have ` + roundedPercent + `% DNA in common.`;
    },
    // Will Likely Survive method
    willLikelySurvive() {
      // setting up a counter for both C & G
      let countC = 0;
      let countG = 0;

      // looping through the current dna to find elements that contain bases of 'C' or 'G'
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C') {
          countC++;
        } else if (this.dna[i] === 'G') {
          countG++;
        }
      }

      // calculating ratio of appearance for C & G
      let cPercent = countC / this.dna.length;
      let gPercent = countG / this.dna.length;

      // calculating the percentage
      let cgPercent = cPercent + gPercent
      let roundcgPercent = cgPercent.toFixed(2) * 100;

      // checking if the specimen will survive.
      if (roundcgPercent >= 60) {
        return true;
      } else {
        return false;
      }
    },
    // Extra Challenge - created a function to find the complementary strand of the original specimen.
    complementStrand(regularSpecimen) {
      let complementSpecimen = [];

      // looping through the parameter, while finding the bases complement bases and pushing them to the new array.
      for (let i = 0; i < regularSpecimen.length; i++){
        if (regularSpecimen[i] === 'A') {
          regularSpecimen[i] = 'T';
          complementSpecimen.push(regularSpecimen[i]);
        } else if (regularSpecimen [i] === 'T') {
          regularSpecimen[i] = 'A';
          complementSpecimen.push(regularSpecimen[i]);
        } else if (regularSpecimen [i] === 'C') {
          regularSpecimen[i] = 'G';
          complementSpecimen.push(regularSpecimen[i]);
        } else if (regularSpecimen[i] === 'G') {
          regularSpecimen[i] = 'C';
          complementSpecimen.push(regularSpecimen[i]);
        }
      }

      return complementSpecimen;
    }
  };
}

// Creating a function to find 30 instances of survivable organism

const survivingArray = (factoryFunction) => {
  
  let survivingSpecimen = [];
  let specimenCount = 0;

  do {
    specimenCount++;
    if (factoryFunction(specimenCount, mockUpStrand()).willLikelySurvive() === true){
      survivingSpecimen.push(factoryFunction(specimenCount, mockUpStrand()));
    }
  }
  while (survivingSpecimen.length < 30);

 return survivingSpecimen;
}

// ***************TEST CODE*************************


// let specimen1 = pAequorFactory(1, mockUpStrand());
// let specimen2 = pAequorFactory(2, mockUpStrand());



// console.log(specimen1.dna);
// console.log(specimen1.mutate());
// console.log(specimen1.compareDNA(specimen2));
// console.log(specimen1.willLikelySurvive());
// console.log(survivingArray(pAequorFactory));
// console.log(specimen1.complementStrand(specimen1.dna));