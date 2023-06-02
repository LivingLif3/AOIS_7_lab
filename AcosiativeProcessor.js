// Выполнил Летко Александр Юрьевич
// Вариант 1 и 4

class AssociativeProcessor {
    constructor(lengthForWord, tableLength) {
        this.lengthForWord = lengthForWord
        this.tableLength = tableLength
        this.memoryTable = []
    }

    findNextMin(word) {
        let bigger = []
        let smaller = []
        for(let i = 0; i < this.memoryTable.length; i++) {
            if(this.compareWords(this.memoryTable[i], word) === 1) {
                bigger.push(this.memoryTable[i])
            } else if(this.compareWords(this.memoryTable[i], word) === -1) {
                smaller.push(this.memoryTable[i])
            }
        }
        let smallestInBigger = this.findSmallerInBigger(bigger)
        let biggestInSmaller = this.findBiggerInSmaller(smaller)

        console.log(`Nearest bigger word is ${smallestInBigger}`)
        console.log(`Nearest smaller word is ${biggestInSmaller}`)

    }

    findSmallerInBigger(bigger) {
        let smallest = bigger[0]
        for(let i = 1; i < bigger.length; i++) {
            if(this.compareWords(smallest, bigger[i]) === 1) {
                smallest = bigger[i]
            }
        }
        return smallest
    }

    findBiggerInSmaller(smaller) {
        let biggest = smaller[0]
        for(let i = 1; i < smaller.length; i++) {
            if(this.compareWords(biggest, smaller[i]) === -1) {
                biggest = smaller[i]
            }
        }
        return biggest
    }

    enterWords() {
        for (let i = 0; i < this.tableLength; i++) {
            this.memoryTable[i] = Array.from({length: this.lengthForWord},
                () => Math.floor(Math.random() * 2)).join('');
        }
    }

    checkFlags(word, neededWord) {
        let g = false;
        let l = false;
        for (let i = 0; i < this.lengthForWord; i++) {
            const wordDigit = Boolean(Number(word[i]));
            const neededWordDigit = Boolean(Number(neededWord[i]));
            const nextG = g || (!neededWordDigit && wordDigit && !l);
            const nextL = l || (neededWordDigit && !wordDigit && !g);
            g = nextG;
            l = nextL;
        }
        return {g, l};
    }

    compareWords(memory_word, search_word) {
        const comparedFlags = this.checkFlags(memory_word, search_word);
        if (!comparedFlags['g'] && !comparedFlags['l']) {
            return 0;
        } else if (comparedFlags['g'] && !comparedFlags['l']) {
            return 1;
        } else if (!comparedFlags['g'] && comparedFlags['l']) {
            return -1;
        }
    }

    closestPatternSearch(pattern) {
        const differences = [];
        for (const word of this.memoryTable) {
            let differenceRank = 0;
            for (let i = 0; i < this.lengthForWord; i++) {
                differenceRank += word[i] !== pattern[i] && pattern[i] !== 'x' ? 1 : 0;
            }
            differences.push([word, differenceRank]);
        }
        const minDifferenceRank = Math.min(...differences.map(i => i[1]));
        const filteredList = differences.filter(i => i[1] === minDifferenceRank);
        return filteredList.map(i => i[0]);
    }

    comparingBinaryNumbers(num1, num2) {
        for(let i = 0; i < num1.length; i++) {
            if(num1[i] === '1' && num2[i] === '0') {
                return 1
            } else if(num1[i] === '0' && num2[i] === '1') {
                return -1
            }
        }
        return 0
    }



}

let obj = new AssociativeProcessor(3, 10)
obj.enterWords()
console.log(obj.memoryTable)
let prot = obj.closestPatternSearch('0x1')
console.log(prot[0], "- closest pattern")
console.log(`Finding nearest from bigger values and nearest from smaller values for ${prot[0]}`)
obj.findNextMin(prot[0])
