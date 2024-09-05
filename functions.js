const cartas = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,10,10,10,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,10,10,10,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,10,10,10,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,10,10,10
];

function embaralharBaralho(cartas) {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]]; 
    }
    return cartas;
}

let baralho = embaralharBaralho(cartas);
let parou = 0;
let cartasJogador = [];
let cartasMesa = [];

const visorBaralho = document.querySelector(".visorBaralho");

const visorCartasMesa = document.querySelector(".visorCartasMesa");
const visorCartasMesaTotal = document.querySelector(".visorCartasMesaTotal");
const visorCartasJogador = document.querySelector(".visorCartasJogador");
const visorCartasJogadorTotal = document.querySelector(".visorCartasJogadorTotal");
const statusDoJogo = document.querySelector(".status");
statusDoJogo.style.color = "white"

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");

button1.onclick = comecar;
button2.onclick = darCartasJogador;
button3.onclick = parar;
button4.onclick = resetar;

visorBaralho.innerHTML = baralho.length

function comecar(){
    statusDoJogo.innerHTML = "Novo jogo";
    cartasJogador.push(baralho.pop());
    darCartasMesa();
    cartasJogador.push(baralho.pop());
    parou = 1;
    atualizarVisor();
    parou = 0;
    darCartasMesa();
}

function darCartasJogador(){
    cartasJogador.push(baralho.pop());
    atualizarVisor();
    if (contarCartas(cartasJogador) > 21) {
        parou = 1;
        atualizarVisor();
        perdeu();
    }
}

function darCartasMesa(){
    cartasMesa.push(baralho.pop());
}

function parar(){
    parou = 1;
    while(contarCartas(cartasMesa) < 17){
        cartasMesa.push(baralho.pop());
        atualizarVisor();
    } 
    verificar(contarCartas(cartasJogador), contarCartas(cartasMesa));
}

function verificar(cartasJogador, cartasMesa){
    if(cartasJogador > 21){
        parou = 1;
        atualizarVisor();
        perdeu();
    } else if (cartasMesa > 21){
        atualizarVisor();
        ganhou();
    } else if (cartasJogador <= 21 && cartasJogador > cartasMesa){
        atualizarVisor();
        ganhou();
    } else if (cartasMesa <= 21 && cartasMesa > cartasJogador){
        atualizarVisor();
        perdeu();
    } else {
        atualizarVisor();
        empate();
    }
}

function contarCartas(cartas){
    let contagem = 0;
    for(let i = 0; i < cartas.length; i++){
        contagem += cartas[i];
    }
    return contagem;
}

function ganhou() {
    statusDoJogo.innerHTML = "Você ganhou."; 
    statusDoJogo.style.color = "green"
}

function empate() {
    statusDoJogo.innerHTML = "Você empatou."; 
    statusDoJogo.style.color = "yellow"
}

function perdeu() {
    statusDoJogo.innerHTML = "Você perdeu."; 
    statusDoJogo.style.color = "red"
}

function atualizarVisor(){
    if (parou == 1){
        visorCartasMesa.innerHTML = cartasMesa.join(' | ');  // Exibe as cartas da mesa separadas por espaço
        visorCartasMesaTotal.innerHTML = contarCartas(cartasMesa);
    }
    visorCartasJogador.innerHTML = cartasJogador.join(' | ');  // Exibe as cartas do jogador separadas por espaço
    visorCartasJogadorTotal.innerHTML = contarCartas(cartasJogador);

    visorBaralho.innerHTML = baralho.length
}

function resetar(){
    baralho = embaralharBaralho(cartas);
    cartasJogador = [];
    cartasMesa = [];
    statusDoJogo.innerHTML = "Novo jogo";
    atualizarVisor();
    parou = 0;
    statusDoJogo.style.color = "white"
}
