let xBolinha = 300;
let yBolinha = 200;
let diametro = 30;
let vxBolinha = 6;
let vyBolinha = 6;
let raio = diametro / 2;

let xRaquete1 = 10;
let yRaquete1 = 150;
let xRaquete2 = 580;
let yRaquete2 = 150;
let comprimento = 10;
let largura = 100;
let velocidadeRaquete = 10;

let pontosJogador1 = 0;
let pontosJogador2 = 0;
let jogoIniciado = false;
let jogoPausado = false;

function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  background(0);

  if (!jogoIniciado) {
    mostrarMenu();
    return;
  }

  if (jogoPausado) {
    mostrarPausa();
    return;
  }

  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < height; i += 20) {
    line(width / 2, i, width / 2, i + 10);
  }

  fill(255);
  rect(xBolinha - raio, yBolinha - raio, diametro, diametro);

  xBolinha += vxBolinha;
  yBolinha += vyBolinha;

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    vyBolinha *= -1;
  }

  rect(xRaquete1, yRaquete1, comprimento, largura);
  rect(xRaquete2, yRaquete2, comprimento, largura);
  
  if (keyIsDown(87) && yRaquete1 > 0) {
    yRaquete1 -= velocidadeRaquete;
  }
  if (keyIsDown(83) && yRaquete1 < height - largura) {
    yRaquete1 += velocidadeRaquete;
  }

  if (keyIsDown(UP_ARROW) && yRaquete2 > 0) {
    yRaquete2 -= velocidadeRaquete;
  }
  if (keyIsDown(DOWN_ARROW) && yRaquete2 < height - largura) {
    yRaquete2 += velocidadeRaquete;
  }
  
  // Colisão com a raquete 1
  if (xBolinha - raio < xRaquete1 + comprimento && yBolinha > yRaquete1 && yBolinha < yRaquete1 + largura) {
    vxBolinha *= -1;
    fill(random(255), random(255), random(255)); // Cor aleatória após a colisão com a raquete 1
  }
  
  // Colisão com a raquete 2
  if (xBolinha + raio > xRaquete2 && yBolinha > yRaquete2 && yBolinha < yRaquete2 + largura) {
    vxBolinha *= -1;
    fill(random(255), random(255), random(255)); // Cor aleatória após a colisão com a raquete 2
  }
  
  if (xBolinha - raio < 0) {
    pontosJogador2 += 1;
    resetarBolinha();
  }
  if (xBolinha + raio > width) {
    pontosJogador1 += 1;
    resetarBolinha();
  }

  // Pontuação sem animação
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(pontosJogador1, width / 4, 50);
  text(pontosJogador2, (3 * width) / 4, 50);
}

function resetarBolinha() {
  xBolinha = width / 2;
  yBolinha = height / 2;
  vxBolinha = random([-6, 6]);
  vyBolinha = random([-6, 6]);
}

function mostrarMenu() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Ping Pong do Rodrigo", width / 2, height / 3);
  
  textSize(24);
  text("Pressione ENTER para começar", width / 2, height / 2);
  
  if (keyIsPressed && keyCode === ENTER) {
    jogoIniciado = true;
  }
}

function mostrarPausa() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Jogo Pausado", width / 2, height / 3);
  textSize(24);
  text("Pressione ESC para continuar", width / 2, height / 2);
}

function keyPressed() {
  if (keyCode === ENTER && !jogoIniciado) {
    jogoIniciado = true;
  }
}
