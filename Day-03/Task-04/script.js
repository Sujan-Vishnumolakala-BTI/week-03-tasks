let array = [10, 4, 10, 3, 5, 6, 7, 3, 4, 7, 8, 9, 10, 4, 5, 2, 1, 10, 5, 6, 7, 3, 5];

let count = new Map();

array.map((value) => {
    if(count.has(value)){
        count.set(value,count.get(value) + 1);
    }else{
        count.set(value,1);
    }
});

console.log(count);

console.log(Object.fromEntries(countMap));
