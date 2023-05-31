// Выполнил Летко Александр Юрьевич
// Вариант 1 и 4

class AssociativeProcessor {
    constructor(wordSize, matrixSize) {
        this.wordSize = wordSize
        this.matrixSize = matrixSize
        this.memoryTable = []
        this.fillMemoryTable()
    }

    fillMemoryTable() {
        for (let i = 0; i < this.matrixSize; i++) {
            this.memoryTable[i] = Array.from({length: this.wordSize},
                () => Math.floor(Math.random() * 2)).join('');
        }
    }

    comparisonFlags(memoryWord, searchWord) {
        let GFlag = false;
        let LFlag = false;
        for (let i = 0; i < this.wordSize; i++) {
            const memoryWordDigit = Boolean(Number(memoryWord[i]));
            const searchWordDigit = Boolean(Number(searchWord[i]));
            const next_g_flag = GFlag || (!searchWordDigit && memoryWordDigit && !LFlag);
            const next_l_flag = LFlag || (searchWordDigit && !memoryWordDigit && !GFlag);
            GFlag = next_g_flag;
            LFlag = next_l_flag;
        }
        return {'g_flag': GFlag, 'l_flag': LFlag};
    }

    compareWords(memory_word, search_word) {
        const comparison_flags = this.comparisonFlags(memory_word, search_word);
        if (!comparison_flags['g_flag'] && !comparison_flags['l_flag']) {
            return 0;
        } else if (comparison_flags['g_flag'] && !comparison_flags['l_flag']) {
            return 1;
        } else if (!comparison_flags['g_flag'] && comparison_flags['l_flag']) {
            return -1;
        } else {
            throw new Error('Flags can\'t be equal to 1 at the same time');
        }
    }

    closestPatternSearch(pattern) {
        const differences = [];
        for (const word of this.memoryTable) {
            let differenceRank = 0;
            for (let i = 0; i < this.wordSize; i++) {
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

}

let obj = new AssociativeProcessor(3, 10)
obj.fillMemoryTable()
console.log(obj.memoryTable)
let prot = obj.closestPatternSearch('0x1')
console.log(prot[0], "- closest pattern")
console.log(`Finding nearest from bigger values and nearest from smaller values for ${prot[0]}`)
obj.findNextMin(prot[0])
