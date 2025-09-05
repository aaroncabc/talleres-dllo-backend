// Punto 1
function desglosarString(cadena, tipo) {
  const vocales = new Set("aeiouAEIOU");
  const letras = [...cadena].filter(l => /[a-zA-Z]/.test(l));

  return letras.filter(l =>
    tipo === "vocales" ? vocales.has(l) : !vocales.has(l)
  ).length;
}

// Punto 2
function twoSum(nums, objetivo) {
  return nums.flatMap((n, i) =>
    nums.findIndex((m, j) => j !== i && n + m === objetivo) !== -1
      ? [[i, nums.findIndex((m, j) => j !== i && n + m === objetivo)]]
      : []
  )[0] || [];
}

// Punto 3
function conversionRomana(romano) {
  const valores = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  return [...romano].reduce(
    (acc, curr, i, arr) =>
      acc + (valores[curr] < (valores[arr[i + 1]] || 0) ? -valores[curr] : valores[curr]),
    0
  );
}

// Punto 4
function descomposicion(entrada) {
  const [objetivo, ...diccionario] = entrada.split(",");

  return diccionario.flatMap(w1 =>
    diccionario
      .filter(w2 => w1 !== w2 && w1 + w2 === objetivo)
      .map(w2 => [w1, w2])
  )[0] || [];
}

// Ejemplos de prueba
console.log(desglosarString("murcielagos", "vocales"));      // 5
console.log(desglosarString("murcielagos", "consonantes")); // 6
console.log(twoSum([2, 7, 11, 15], 9));                     // [0,1]
console.log(conversionRomana("MCMXCVII"));                  // 1997
console.log(descomposicion("malhumor,al,hum,humor,m,mal,malhu")); // ["mal", "humor"]
