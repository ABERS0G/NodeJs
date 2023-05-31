/****************
 Задача 1
 ****************/
console.log('\nЗадача 1\n')

async function runSequent<T, R>(array: T[], callback: (item: T) => Promise<R>): Promise<R[]> {
    const results: R[] = [];

    for (const item of array) {
        const result = await callback(item);
        results.push(result);
    }

    return results;
}

async function reverseNumber(number: number): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(number * -1);
        }, 500);
    });
}

async function toUpperString(str: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(str.toUpperCase());
        }, 500);
    });
}

let numbers = [1, 2, 3, 4, 5];
let strings = ['john one', 'john two', 'john three'];

runSequent(numbers, reverseNumber)
    .then(results => console.log('задача1 - ' + results))

runSequent(strings, toUpperString)
    .then(results => console.log('задача1 - ' + results))

/****************
    Задача 2
 ****************/

console.log('\nЗадача 2\n')

function arrayChangeDelete<T>(array: T[], rule: (item: T) => boolean): T[] {
    const removedItems: T[] = [];

    for(let i = 0; i<array.length; i++){

        if (rule(array[i])) {
            removedItems.push(array.splice(i, 1)[0]);
        }
    }

    return removedItems;
}

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function removeEvenNumbers(number: number): boolean {
    return number % 2 === 0;
}

const removed = arrayChangeDelete(numbers, removeEvenNumbers);

console.log(numbers);
console.log(removed);

/****************
 Задача 3
 ****************/

console.log('\nЗадача 3\n')
