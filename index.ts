/****************
 Задача 1
 ****************/
console.log('\nЗадача 1\n')

interface innerAdder {
    (n: number): innerAdder;
    (n?: undefined): number
}

const  add = ((num: number) => {
    let sum: number = num;

    function innerAdd(nextNum?: number): number | typeof innerAdd {
        if (nextNum === undefined) {
            return sum;
        }

        sum += nextNum;
        return innerAdd;
    }

    return innerAdd;
}) as innerAdder


console.log(add(2)(1)(1)(1))


/****************
 Задача 2
 ****************/
console.log('\nЗадача 2\n')

function anagram(str1: string, str2:string): boolean {

    // const arr1 = str1.replace(' ', '').split('');
    // const arr2 = str2.replace(' ', '').split('');

    const arr1: string[] = str1.toLowerCase().replace(/\s/g, '').split('');
    const arr2: string[] = str2.toLowerCase().replace(/\s/g, '').split('');

    const sort1: string = arr1.sort().join('');
    const sort2: string = arr2.sort().join('');

    return sort1 === sort2;
}

console.log(anagram('Слово', 'волос'));
console.log(anagram('привіт', 'салам'));

/****************
 Задача 3
 ****************/
console.log('\nЗадача 3\n')

const user1 = {
    name: "John",
    data: {
        surname: 'Smith'
    }
};

const user2 = structuredClone(user1)

console.log(user1 === user2)
console.log(user1.data === user2.data)

/****************
 Задача 4
 ****************/
console.log('\nЗадача 4\n')

function wrapper(fn: (...args: number[]) => number): (...args: number[]) => number {
    const cache: { [key: string]: number } = {};

    return function (...args: number[]): number {
        const key = JSON.stringify(args);

        if (cache[key]) {
            console.log('Кєш:', cache[key]);
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;
        console.log('Функція:', result);
        return result;
    };
}

const calc = (a: number, b: number, c: number) => a+b+c;
const calc2 = (a: number, b: number, c: number, d: number) => a+b+c+d;

let cachedCalc = wrapper(calc)
let cachedCalc2 = wrapper(calc2)

cachedCalc(2,2,3)
cachedCalc(5,8,1)
cachedCalc(2,2,3)

console.log('\n---===---\n')

cachedCalc2(2,2,3,9)
cachedCalc2(5,8,1,9)
cachedCalc2(2,2,3,9)
