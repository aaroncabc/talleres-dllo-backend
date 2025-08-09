function convertidorT(C){
    return C*(9/5)+32
};

function resolvedor(a,b,c,op){
    let discriminante = b**2-4*a*c
    if (discriminante>0){
        if(op){
            return (-b+(discriminante)**(1/2))/2*a
        };
        return(-b-(discriminante)**(1/2))/2*a
    };
    if(discriminante = 0){
        return -b/(2*a)
    };
    return "No solutions"
};

function mejorParidad(num){
    return num%2 === 0
};

function peorParidad(num){
    for (let index = 0; index < 100; index++) {
        console.log("Try #"+(index+1));
        
        if (2*index === num){
            return "Par"
        };
    };
    return "Impar"
};


console.log("ConvertidorT");
console.log("-----------------------------");
console.log(convertidorT(0));
console.log(convertidorT(100));

console.log("Resolvedor");
console.log("-----------------------------");
console.log(resolvedor(1,5,4,true));
console.log(resolvedor(1,5,4,false));

console.log("mejorParidad");
console.log("-----------------------------");
console.log(mejorParidad(2));
console.log(mejorParidad(3));


console.log("peorParidad");
console.log("-----------------------------");
console.log("ejemplo par");
console.log(peorParidad(10));
console.log("---");
console.log("ejemplo impar");
console.log(peorParidad(11));
