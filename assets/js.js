const btns = document.querySelector('.tablero');
let turno = 0;
let comprobarUltimaJugada;
let puntuacionJugador = 0;
let puntuacionMaquina = 0;
let posicionJugador = [];
let posicionMaquina = [];
let contador = 0;
class Casilla{
    constructor(a1, a2){
        this.fila = a1,
        this.celda = a2;
    }
}
const maquina = (turno, event, fila, celda) =>{
    if(turno%2==0){
        event.target.classList.add('x');
        posicionJugador.push(new Casilla(fila, celda));
    }else{
        event.target.classList.add('o');
        posicionMaquina.push(new Casilla(fila, celda));
    }
}
const borradoClases = () =>{
    puntitos();
    posicionMaquina = [];
    posicionJugador = [];
    const divX = document.querySelectorAll('.x');
    const divO = document.querySelectorAll('.o');
    divX.forEach((element)=>{
        element.className='';
    })
    divO.forEach((element)=>{
        element.className='';
    })
}
const comrpobarSiEsta = (fila, celda) => {
    let valor = posicionJugador.find((element)=> element.fila==fila && element.celda==celda);
    let valor2 = posicionMaquina.find((element)=> element.fila==fila && element.celda==celda);
    if(valor==undefined && valor2==undefined){
        valor = false;
    }else{
        valor = true;
    }
    return valor;
}
const helperDiagonales = (player) =>{
    if(player==true){
        const centro = posicionJugador.some((element)=>element.fila==1 && element.celda==1);
        if(centro==true){
            const diagonalIzqSup = posicionJugador.some((element)=>element.fila==0 && element.celda==0);
            const diagonalDchaSup = posicionJugador.some((element)=>element.fila==0 && element.celda==2);
            const diagonalIzqInf = posicionJugador.some((element)=>element.fila==2 && element.celda==0);
            const diagonalDechaInf = posicionJugador.some((element)=>element.fila==2 && element.celda==2);
            if(diagonalDchaSup==true && diagonalIzqInf ==true){
                return true;
            }
            if(diagonalIzqSup== true && diagonalDechaInf==true){
                return true;
            } 
        }
    }else{
        const centro = posicionMaquina.some((element)=>element.fila==1 && element.celda==1);
        if(centro==true){
            const diagonalIzqSup = posicionMaquina.some((element)=>element.fila==0 && element.celda==0);
            const diagonalDchaSup = posicionMaquina.some((element)=>element.fila==0 && element.celda==2);
            const diagonalIzqInf = posicionMaquina.some((element)=>element.fila==2 && element.celda==0);
            const diagonalDechaInf = posicionMaquina.some((element)=>element.fila==2 && element.celda==2);
            if(diagonalDchaSup==true && diagonalIzqInf ==true){
                return true;
            }
            if(diagonalIzqSup== true && diagonalDechaInf==true){
                return true;
            } 
        }
    }
}
const winCondition = (player) => {
    if(player==true){
        let diagonalUno = false;
        let victoriaFila0 = posicionJugador.filter((element)=>element.fila==0);
        let victoriaFila1 = posicionJugador.filter((element)=>element.fila==1);
        let victoriaFila2 = posicionJugador.filter((element)=>element.fila==2);
        let victoriaCelda0 = posicionJugador.filter((element)=>element.celda==0);
        let victoriaCelda1 = posicionJugador.filter((element)=>element.celda==1);
        let victoriaCelda2 = posicionJugador.filter((element)=>element.celda==2);
        diagonalUno = helperDiagonales(player);
        if(victoriaCelda0.length==3 || victoriaCelda1.length==3 || victoriaCelda2.length==3 || victoriaFila0.length==3 || victoriaFila1.length==3 || victoriaFila2.length==3){
            puntuacionJugador++;
            setTimeout(()=>{
                alert('Jugador 1 gana de fila o columna');
                comprobarUltimaJugada = false;
                borradoClases();
            }, 250);
        }else if(diagonalUno==true){
            puntuacionJugador++;
            setTimeout(()=>{
                alert('Jugador 1 gana de tremenda diagonal');
                comprobarUltimaJugada = false;
                borradoClases();
            }, 250);
        }else if(posicionJugador.length==5){
            comprobarUltimaJugada = true;
        }
    }else{
        let diagonalUno = false;
        let victoriaFila0 = posicionMaquina.filter((element)=>element.fila==0);
        let victoriaFila1 = posicionMaquina.filter((element)=>element.fila==1);
        let victoriaFila2 = posicionMaquina.filter((element)=>element.fila==2);
        let victoriaCelda0 = posicionMaquina.filter((element)=>element.celda==0);
        let victoriaCelda1 = posicionMaquina.filter((element)=>element.celda==1);
        let victoriaCelda2 = posicionMaquina.filter((element)=>element.celda==2);
        diagonalUno = helperDiagonales(player);
        if(victoriaCelda0.length==3 || victoriaCelda1.length==3 || victoriaCelda2.length==3 || victoriaFila0.length==3 || victoriaFila1.length==3 || victoriaFila2.length==3){
            puntuacionMaquina++;
            setTimeout(()=>{
                alert('Jugador 2 gana de fila o columnas');
                comprobarUltimaJugada = false;
                borradoClases();
            }, 250);
        }else if(diagonalUno==true){
            puntuacionMaquina++;
            setTimeout(()=>{
                alert('Jugador 2 ha ganado de tremenda diagonal');
                comprobarUltimaJugada = false;
                borradoClases();
            }, 250);
        }else if(posicionMaquina.length==5){
            comprobarUltimaJugada = true;
        }
    }
    puntitos();
}
const puntitos = () =>{
    document.getElementById('marcadorJugadorUno').innerHTML=puntuacionJugador;
    document.getElementById('marcadorJugadorDos').innerHTML=puntuacionMaquina;
}
puntitos();
btns.addEventListener('click', (event)=>{
    const fila = event.path[1].getAttribute('value');
    const celda = event.target.getAttribute('value');
    if(fila!=null && celda!=null){
        const casillaValida = comrpobarSiEsta(fila, celda);
        console.log(casillaValida);
        if(casillaValida==false){
            maquina(turno, event, fila, celda);
            turno++;
            winCondition(true);
            winCondition(false);
            if(comprobarUltimaJugada==true){
                if(posicionJugador.length==5){
                    setTimeout(()=>{
                        alert('La partida ha acabado en un empate');
                        borradoClases();
                    }, 250);
                }
                if(posicionMaquina.length==5){
                    setTimeout(()=>{
                        alert('La partida ha acabado en un empate');
                        borradoClases();
                    }, 250);
                }
            }
        }else{
            alert('Esa casilla está ocupada por una pieza, presiona en otra.')
        }
    }
    console.log('fila: ',fila);
    console.log('celda ',celda);
    console.log(posicionJugador);
})