const hola = (()=>{ //Agregamos seguridad al codigo
     'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    let puntosJugadores=[];

   const btnPedir = document.querySelector('#btnPedir'),
         btnDetener = document.querySelector('#btnDetener'),
         btnNuevo = document.querySelector('#btnNuevo');
   const divCartasJugadores = document.querySelectorAll('.divCartas'),
         scoreJugador = document.querySelectorAll('small');
       
    const inicializarJuego = (numJugadores=2)=>{
        deck = crearDeck();
        puntosJugadores=[];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        scoreJugador.forEach(element =>element.innerText=0);
        scoreJugador.forEach(element =>element.innerText=0);
        divCartasJugadores.forEach(element => element.innerHTML='');
        btnPedir.disabled=false;
        btnDetener.disabled=false;
    }
    const crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
          for (let tipo of tipos) {
              deck.push(i+tipo);
          }
        }
        for (const tipo of tipos) {
            for (const esp of especiales) {
                deck.push(esp+tipo);
            }
        }
        return _.shuffle(deck);
    }
   
   //Esta funcion me permite pedir una carta
   const pedirCarta=()=>{
       if(deck.length>0)
       {
           return deck.pop();
       }
       else{
           console.log('No hay cartas!!');
       }
   }
   //Ahora necesitamos saber le valor de la carta
   const valorCarta=(carta)=>{
       //Ya tendo el valor de la cartas numericas 
       let valor = carta.substring(0, carta.length-1);
       return (isNaN(valor)) ? 
       (valor=='A')? 11:10
       :valor*1; 
   }
   
   const acumularPunto =(carta,turno)=>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    scoreJugador[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
   }

    const crearCarta = (carta, turno)=>{
        
        const imgCarta = document.createElement('img');
        imgCarta.src   = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador=()=>{

        const [puntsMinimos,puntosComputadora]=puntosJugadores;
        setTimeout(() => {
            if(puntsMinimos==puntosComputadora){
                alert('Empates!! XD');
            }else if(puntsMinimos>21)
            {
                alert('Computadora gana!! :(');
            }else if(puntosComputadora>21){
                alert('Jugador Gana!! :D');
            }else{
                alert('Computadora Gana!!');
            }
        }, 100);
    }

   //Turno de la computadora
   const turnoComputadora = (puntsMinimos)=>{
        let puntosComputadora=0;
       do {
           const carta   = pedirCarta();
           //================= Este el turno del jugador
           puntosComputadora = acumularPunto(carta,puntosJugadores.length-1);
           crearCarta(carta,puntosJugadores.length-1);
       } while ((puntosComputadora<puntsMinimos)&& puntsMinimos<=21);
       determinarGanador();
   }
   
   btnPedir.addEventListener('click', ()=>{
       const carta   = pedirCarta();
       const puntosJugador= acumularPunto(carta,0);
       //Creacion de la carta
       crearCarta(carta,0);
    
       if(puntosJugador>21)
       {
           console.warn('lo siento perdiste');
           btnPedir.disabled=true;
           btnDetener.disabled=true;
           turnoComputadora(puntosJugador);
           
       }else if(puntosJugador==21)
       {
          console.warn('21 Genial tu ganas!!');
          btnPedir.disabled=true;
          btnDetener.disabled=true;
          turnoComputadora(puntosJugador);
       }
   
   });
   
   btnDetener.addEventListener('click', ()=>{
        btnDetener.disabled=true;
       turnoComputadora(puntosJugadores[0]);
   });
   
   btnNuevo.addEventListener('click',()=>{
       inicializarJuego();
   });
   
   //Con esto doy permiso que la gente externa pueda acceder a mi 
   // Codigo pero solo a la funcion o b¿ibjeto que retorne
   return {
       nuevoJuego: inicializarJuego
   };
})();

