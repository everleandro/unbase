//Crear una función de multiplicación sin usar el signo de multiplicar.
const ex1 = (factor1, factor2) => {
  if (factor2 === 0) return 0;
  if (factor2 > 0) return factor1 + ex1(factor1, factor2 - 1);
  if (factor2 < 0) return -ex1(factor1, -factor2);
};
//Crear una función que permita obtener el número mayor de un array, iterando sólo
// una vez.
const ex2 = (array) => {
  return Math.max.apply(Math, array);
};
//Crear una función que elimine los valores: undefined, zeros, false ó un null,
// iterando sólo una vez un objeto.
const ex3 = (object) => {
  const newObj = {};
  Object.entries(object).forEach(([k, v]) => {
    if (v === Object(v)) {
      newObj[k] = ex3(v);
    } else if (v) {
      newObj[k] = object[k];
    }
  });
  return newObj;
};
//Crear una función que permita contar la cantidad de veces que se repita una
// palabra en una oración.
const ex4 = (str, word) => {
  return str.split(" ").filter((e) => e.trim() === word).length;
};
/*Ordenar un objeto en base a un campo de mayor a menor o alfabéticamente según
 el tipo de dato. (Números o palabras).

 aca he tenido mis dudas sobre si el "tipo de dato" se refiere al key o al value; he colocado un metodo que reordena el objeto ascendentemente
  teniendo en cuenta las keys pero el ejercicio lo vi algo ambiguo y no logre comprender exactamente lo que se pedia. Mis disculpas por ello. */

const ex5 = (object) => {
  return Object.keys(object)
    .sort()
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
};
// Crear una función que permita identificar si una palabra es palíndromo (Palabra o
// expresión que es igual si se lee de izquierda a derecha que de derecha a izquierda.)
// Ej: “Anita lava la tina”
const ex6 = (str) => {
  return str === str.split("").reverse().join("");
};
export default { ex1, ex2, ex3, ex4, ex5, ex6 };
