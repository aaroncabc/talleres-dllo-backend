function findMax(arr){
    let max = 0
    arr.forEach(e => {
        max = e>max? e: max
    })
    return max
}

function findMin(arr){
    let min = arr[0]
    arr.forEach(e => {
        min = e<min? e: min
    })
    return min
}

function includes(arr,val){
    for (let e of arr){
        if (e === val) return true
    }
    return false
}

function sum(arr){
    cont = 0
    for (let e of arr){
        cont += e
    }
    return cont
}

function missingNumbers(arr){
    start = findMin(arr)
    finish = findMax(arr)
    faltantes = []
    for (let i = start; i < finish; i++) {
        if(!includes(arr, i)){
            faltantes.push(i)
        }
    }
    return faltantes
}



