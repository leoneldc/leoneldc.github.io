
setInterval(saludar, 1000);

function saludar(){
    var fecha = new Date();
    var hora = `${fecha.getHours()} ${fecha.getMinutes()} ${fecha.getSeconds()}`
    var clase = document.getElementsByClassName("saludar");

    if(fecha.getHours()>=4&&fecha.getHours()<12){
        document.getElementById("saludar").innerHTML = `Buenos días`;
        
    }else if(fecha.getHours()>=12&&fecha.getHours()<18){
        document.getElementById("saludar").innerHTML = `Buenas tardes`;
        
    }else if(fecha.getHours()>=18&&fecha.getHours()<4){
        document.getElementById("saludar").innerHTML = `Buenos noches`;
        
    }    

}