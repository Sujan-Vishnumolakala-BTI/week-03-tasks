let array3d = [
    [
        [10,20,90],
        [30,40,100]
    ],
    [
        [50,60,110],
        [70,80,120]
    ]
]

let sum = 0;

for(let i = 0; i < array3d.length; i++){
    for(let j = 0; j < array3d[i].length; j++){
        for(let k = 0; k < array3d[i][j].length; k++){
            sum += array3d[i][j][k];
        }
    }
}

console.log("Sum : ",sum);