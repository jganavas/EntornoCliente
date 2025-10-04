let num_mesas = prompt("Cuántas mesas tendrá el restaurante?");
//let num_mesas = 8;
let mesas = [];
let max_comensales = 4;

for (let i = 0; i < num_mesas; i++) {
    mesas[i] = Math.floor(Math.random()*4);
}

let comensales = 1;
let sientese = "Por favor, siéntese en la mesa ";

while(comensales != 0){
    let encontrada = false;
    comensales = prompt("Cuántas personas sois?");
    if(comensales > max_comensales){
        alert("Lo siento, no se admiten más de 4 personas por mesa");
        comensales = prompt("Cuántas personas sois?");
    }

    for (let i = 0; i < num_mesas; i++) {
        if(mesas[i] == 0){
            mesas[i] = comensales;
            alert(`${sientese} ${[i+1]}`);
            encontrada = true;
            break;
        }else if((mesas[i] + comensales) <= 4){
            mesas[i] += comensales;
            alert(`${sientese} ${[i+1]}`);
            encontrada = true;
            break;
        }else{
            continue;
        }
    }
    if(!encontrada){
        alert("No hay mesas, váyase a su casa por favor queremos cerrar y descansar.");
        break;
    }
}





