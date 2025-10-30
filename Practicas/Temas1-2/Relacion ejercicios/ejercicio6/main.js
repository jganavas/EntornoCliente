array1 = ["Ray", "Jose", "Dani"]; 
array2 = ["Dani", "Jose", "Ivan"];

//MAS ARRAYS DE COMPROBACION

/*array1 = [1, 2, 3, 3]; 
array2 = [3, 2, 1, 4, 5];*/

/*array1 = [77, "ciao"] 
array2 =  [78, 42, "ciao"];*/


let arrayResultante = [];
let aux = 0;
let auxArray = [];

 for (let i = 0; i < array1.length; i++) {
     if(!array2.includes(array1[i])){
        auxArray = [...array1];
        aux = auxArray.splice(i, 1)[0];
        arrayResultante.splice(0, 0, aux);
    }
 }

 for (let i = 0; i < array2.length; i++) {
     if(!array1.includes(array2[i])){
        auxArray = [...array2];
        aux = auxArray.splice(i, 1)[0];
        arrayResultante.splice(0, 0, aux);
    }
 }


console.log(arrayResultante);
