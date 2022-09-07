// variaveis bolinha

let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

let velocidadeYBolinha = 5;
let velocidadeXBolinha = 5;

// variaveis valor do react raquete

let xRaquete = 5;
let yRaquete = 177;
let wRaquete = 10;
let hRaquete = 70;
let raioRaquete = hRaquete / 2;
let velocidadeyRaquete = 0;

// variavesi valor do react rede centro 

let xRede = 290;
let yRede = 0;
let wRede = 6;
let hRede = 590;

// variaveis raquete oponente

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// placar do jogo 

let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo

let trilha;
let ponto;
let raquetada;

let colidiu = false;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostrarBolinha()
  movimentaBolinha()
  verificaColisao()
  redeCentro()
  mostraRaquete(xRaquete, yRaquete)
  movimentarMinhaRaquete ()
  colisaoBolinhaRaquete (xRaquete, yRaquete)
  mostraRaquete(xRaqueteOponente, yRaqueteOponente )
  movimenteRaqueteOponente()
  colisaoBolinhaRaquete (xRaqueteOponente, yRaqueteOponente)
  incluirPontos()
  marcaPontos()
  //opcaoMutiPlay()
  bolinhaNaoFicaPresa()
  
}

function mostrarBolinha(){
  stroke(color(255,215,0))
  fill(color(255,215,0))
  circle(xBolinha, yBolinha,diametro );
  
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisao(){
  if ( xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if ( yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function redeCentro(){
  stroke(255)
  fill(255)
  rect(xRede, yRede, wRede, hRede);
}

function mostraRaquete(x, y){
  stroke(color(255,0,0))
  fill(color(255,0,0))
  rect(x, y, wRaquete, hRaquete);
}

function movimentarMinhaRaquete (){
  
  if (keyIsDown(UP_ARROW)){
    if(podeSeMoverParaCima()){
    yRaquete -= 10;
      }
  }
  if (keyIsDown(DOWN_ARROW)){
    if(podeSeMoverParaBaixo()){
    yRaquete += 10;
      }
  }
}

function podeSeMoverParaBaixo(){
  return yRaquete < 320;
}

function podeSeMoverParaCima(){
  return yRaquete > 5;
}

function colisaoBolinhaRaquete (x,y){
colidiu = collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play()
  }
  
    
}

function movimenteRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - wRaquete / 2 - 50;
  yRaqueteOponente += velocidadeYOponente;
}

function opcaoMutiPlay(){
   
  if (keyIsDown(87)){
    if(podeSeMoverParaCimaOponente()){
    yRaqueteOponente -= 10;
      }
  }
  if (keyIsDown(83)){
    if(podeSeMoverParaBaixoOponente()){
    yRaqueteOponente += 10;
       }
  }
}

function podeSeMoverParaBaixoOponente(){
  return yRaqueteOponente < 320;
}

function podeSeMoverParaCimaOponente(){
  return yRaqueteOponente > 5;
}

function bolinhaNaoFicaPresa(){
   if (xBolinha - raio < 0){
      xBolinha = 23
    }
    if (xBolinha + raio > 600){
      xBolinha = 580
    }
}


function incluirPontos(){
  stroke(255)
  textAlign(CENTER)
  textSize(20)
  fill(color(255,140,0))
  rect(147, 10, 50, 28);
  fill(255)
  text(meusPontos, 170, 32)
  fill(color(255,140,0))
  rect(447, 10, 50, 28);
  fill(255)
  text(pontosOponente, 470, 32)
  }

function marcaPontos(){
  if (xBolinha > 590){
    meusPontos +=1;
    ponto.play()
  }
  if (xBolinha < 10){
    pontosOponente +=1;
    ponto.play()
  }
}
