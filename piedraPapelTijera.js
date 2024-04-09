// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

/* Variables y objetos globales */
var partidas = 0; //total de partidas
var partidaActual=1;
var nombre="";
var miMarcador=0;
var marcadorPc=0;
var seleccionado=posibilidades[0]; //seleccion del jugador por defecto
var seleccionadoPc=posibilidades[0]; //selecion del pc por defecto
var ganadoresList=[];
class Ganador {
    constructor(name,choice,choicePc){
        this.name=name;
        this.choice=choice;
        this.choicePc=choicePc;
    };
};

/*---------------------------------------------------------*/

/* Sección de eventos*/
var botonJugar=document.getElementsByTagName("button")[0];//captura del primer elemento boton
botonJugar.addEventListener("click",jugar,false); //creacion de la escucha del evento click sobre el botonJugar, para realizar la accion jugar.
var botonYa=document.getElementsByTagName("button")[1];//captura del segundo elemento boton
botonYa.addEventListener("click",ya,false);//creacion de la escucha del evento click sobre el botonYa, para realizar la accion ya.
for (let i=0; i<3;i++){//for para añadir addEventListener a las tres imagenes con su funcion seleccion, pasando el argumento i
    document.getElementsByTagName("img")[i].addEventListener("click",function(){seleccion(i);},false);
};
document.getElementsByTagName("button")[2] .addEventListener("click",reset,false);




/*----------------------------------------------------- */


/*FUNCIONES PRINCIPALES */

function jugar(){ //funcion para obtener valor de los inputs y posicionar las imágenes
    nombre=document.getElementsByName("nombre")[0].value; //dato del input nombre
    partidas=parseInt(document.getElementsByName("partidas")[0].value); //dato del input partida parseado a Int;
    if (/^\d/.test(nombre)){ //utilizo una expresión regular que devuelve true si el nombre empieza por dígito
        alert("El nombre no puede empezar por un numero");
        document.getElementsByName("nombre")[0].className="fondoRojo";
    }
    else if (partidas<=0){
        alert("el número de partidas tiene que ser mayor a 0");
        document.getElementsByName("partidas")[0].className="fondoRojo";
    }
    else{
        document.getElementsByName("nombre")[0].className="";//quitamos fondo rojo si lo tenía
        document.getElementsByName("partidas")[0].className="";//quitamos fondo rojo si lo tenía
        document.getElementById("actual").innerHTML=partidaActual; // cambiamos contenido html actual de 0 a 1
        document.getElementById("total").innerHTML=partidas; // cambiamos contenido html total al total de partidas
        document.getElementsByTagName("img")[0].src="img/piedraJugador.png";//cambiamos las imágenes por la de piedra, papel y tijera.
        document.getElementsByTagName("img")[1].src="img/papelJugador.png";
        document.getElementsByTagName("img")[2].src="img/tijeraJugador.png";
        for (let i=0; i<2;i++){ //desactivamos los 2 inputs
            document.getElementsByTagName("input")[i].disabled=true;
        }
    }
};
//------------------------------------------------------

function  ya(){ //función para jugar contra el pc
    let random=Math.round(Math.random()*2); //random entre 0 y 2
    seleccionadoPc = posibilidades[random]; //seleccion del pc al azar
    document.getElementsByTagName("img")[3].src="img/"+ posibilidades[random]+"Ordenador.png"; // ponemos la imagen correspondiente al pc
    setTimeout(function(){//le ponemos tiempo a la realización de la funcion para que de tiempo a ver la imagen del Pc (0.7 seg)
        if (seleccionado!=seleccionadoPc){//si son diferentes se entra en la logica
            if(seleccionado=="piedra"){ //jugador escoge piedra
                if (seleccionadoPc=="papel"){
                    ganador(false);//gana pc
                }
                else {
                    ganador(true);//gana jugador
                }
            }
            else if (seleccionado=="papel"){ //jugador escoge papel
                if (seleccionadoPc=="piedra"){
                    ganador(true);
                }
                else{
                    ganador(false);
                }
            }
            else{ //jugador escoge tijeras
                if (seleccionadoPc=="piedra"){
                    ganador(false);
                }
                else{
                    ganador(true);
                }
            }
        }
        else{ //si son iguales, empate
            alert("Ha habido un empate, esta partida no cuenta y hay que repetirla!");
        }
    },700);
};
//-----------------------------------------------------------------------------------------------------------------------

function seleccion(numeroImagen){ /*función para obtener la imagen que selecciona el usuario y la variable seleccionado,
 ya que coinciden en el mismo orden que en el array posibilidades;*/
    for(let i=0;i<3;i++){
        if (i==numeroImagen){
            document.getElementsByTagName("img")[i].className="seleccionado";
            seleccionado= posibilidades[i];
        }
        else{
            document.getElementsByTagName("img")[i].className="noSeleccionado";
        }
    }
};
//------------------------------------------------------------------------------------------------------
function ganador(winner){//funcion que crea la instancia ganador, la añade a ganadoresList, actualiza el historial y actualiza marcadores.
    if (winner){
        const ganador=new Ganador(nombre,seleccionado,seleccionadoPc);
        ganadoresList.push(ganador);
        miMarcador++;
    }
    else{
        const ganador=new Ganador("Máquina",seleccionado,seleccionadoPc);
        ganadoresList.push(ganador);
        marcadorPc++;
    }
    let lista= document.getElementById("historial");
    let linea= document.createElement("li");
    linea.innerHTML=partidaActual + ". Gana: "+ganadoresList[ganadoresList.length-1].name+" ("+nombre+" saca: "+seleccionado+" | Máquina saca: "+seleccionadoPc+")";
    lista.appendChild(linea);
    partidaActual++
    if (partidaActual>partidas){//comprobamos si era la ultima partida
        
        if (miMarcador>marcadorPc){
            setTimeout(function(){alert("Juego terminado.\nEnhorabuena, según la última serie de partidas has ganado!!!!! "+miMarcador+" vs "+marcadorPc);},2000);
        }
        else if (miMarcador<marcadorPc){
            setTimeout(function(){alert("Juego terminado.\nLo siento, según la última serie de partidas has perdido!!! "+miMarcador+" vs "+marcadorPc)},2000);
        }
        else{
            setTimeout(function(){alert("Juego terminado.\n según la última serie de partidas Habéis empatado!!! "+miMarcador+" vs "+marcadorPc)},2000);
        }
        setTimeout(function(){location.reload();},2500);
    }
    else{
        document.getElementById("actual").innerHTML=partidaActual;
    }
};
//--------------------------------------------------------------------------

function reset(){ //reinicia el número de partidas y marcadores
    alert("Nueva partida")
    partidas=0;
    partidaActual=1;
    miMarcador=0;
    marcadorPc=0;
    document.getElementById("actual").innerHTML=partidaActual;
    document.getElementById("total").innerHTML=partidas;
    document.getElementsByTagName("img")[3].src="img/defecto.png";
    document.getElementsByTagName("input")[1].disabled=false;
    document.getElementsByTagName("img")[0].className="seleccionado";
    document.getElementsByTagName("img")[1].className="noSeleccionado";
    document.getElementsByTagName("img")[2].className="noSeleccionado";
};



