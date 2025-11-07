function convertidorT(C) {
  return C * (9 / 5) + 32;
}

function resolvedor(a, b, c, op) {
  let discriminante = b ** 2 - 4 * a * c;
  if (discriminante > 0) {
    if (op === true || op === 'true') {
      return (-b + Math.sqrt(discriminante)) / (2 * a);
    }
    return (-b - Math.sqrt(discriminante)) / (2 * a);
  }
  if (discriminante === 0) {
    return -b / (2 * a);
  }
  return 'No solutions';
}

function mejorParidad(num) {
  return num % 2 === 0 ? 'Par' : 'Impar';
}

function peorParidad(num) {
  for (let index = 0; index < 100; index++) {
    console.log('Try #' + (index + 1));
    if (2 * index === num) {
      return 'Par';
    }
  }
  return 'Impar';
}

module.exports = {
  convertidorT,
  resolvedor,
  mejorParidad,
  peorParidad
};
