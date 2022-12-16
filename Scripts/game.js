var tela = document.querySelector('canvas')
var pincel = tela.getContext('2d')

//INSTANCIA DE OBJS
var linha = new LinhaVaraPesca(
  tela.width / 2 - 50,
  5,
  300,
  300,
  3,
  'Assets/linha.png'
)
var iscaObj = new Isca(658, 5, 60, 60, 3, 'Assets/minhoca.png')
var chao = new Img(0, 150, 1400, 300, 'Assets/chao.png')
var bauPeixe = new Img(400, 140, 132, 116, 'Assets/baupeixe.png')
var player = new Player(670, 10, 240, 220, 0, 'Assets/idle.png')
var linhaFix = new Img(
  tela.width / 2 - 50,
  5,
  300,
  150,
  'Assets/linha.png'
)

var iscandoPeixe = new Audio('sound/iscandopeixe.wav')
var peixeColetado = new Audio('sound/peixeguardado.wav')
var caranguejoSound = new Audio('sound/caranguejo.wav')
var tubaraoSound = new Audio('sound/tubarao.mp3')
var menuMusic = new Audio('sound/menu.wav')
menuMusic.loop = true
var inGameMusic = new Audio('sound/inGame.mp3')
inGameMusic.loop = true
var gameOverMusic = new Audio('sound/gameOver.wav')
gameOverMusic.loop = true



//MENU
var telaMenu = new Img(0, 0, 1200, 720, 'Assets/menu.png')
var telaInstrucoes = new Img(0, 0, 1200, 720, 'Assets/instrucoes.png')
//game over
var gameOverTela = new Img(0, 0, 1200, 720, 'Assets/gameOver.png')

//ICON
var minhocaIcon = new Img(0, 0, 120, 120, 'Assets/iconminhoca.png')


//VARIAVEIS DO JOGO
var rodandoJogo = false
var gameOver = false
var instrucoes = false
const peixesVivos = []
const caranguejoArray = []

var gerarPeixe = new invocarPeixe()


//Buttons
//Menu inicial

//TELA MENU
var jogarButton = new Button(465, 429, 278, 53, 'Assets/empty.png')
var instrucoesButton = new Button(465, 525, 278, 53, 'Assets/empty.png')

//TELA DE INSTRUCOES
var jogarInstrucoesButton = new Button(940, 615, 205, 57, 'Assets/empty.png')

//GAME OVER TELA
var gameOverButton = new Button(468, 418, 279, 55, 'Assets/empty.png')


//PEGAR O MOV DO MOUSE E MOVER A LARGURA DA LINHA COM ISSO E MOVER ISCA
document.addEventListener('mousemove', (event) => {
  var x = event.offsetX;
  var y = event.offsetY;

  if(player.tempoTubarao <= 0){
    if(linha.height >= 150 && linha.height <= 700){
      linha.height = y
    }else if(linha.height < 150){
      linha.height = 150
    }else if(linha.height > 700){
      linha.height = 700
    }
    // console.log(x, y)
  }

});

document.addEventListener('click', (event) => {
  var x = event.offsetX;
  var y = event.offsetY;

  if(!rodandoJogo && !gameOver){
      //MENU
      if(instrucoes){
        if(jogarInstrucoesButton.clickButton(x, y)){
          player.timer = 300
          player.tempoTubarao = 0
          player.score = 0
          player.iscas = 3
          gerarPeixe.peixesVivos.length = 0
          gerarPeixe.gerarPeixe()
          rodandoJogo = true;
          menuMusic.pause()
      }
    }else{
      if(jogarButton.clickButton(x, y)){
          player.timer = 300
          player.tempoTubarao = 0
          player.score = 0
          player.iscas = 3
          gerarPeixe.peixesVivos.length = 0
          gerarPeixe.gerarPeixe()
          rodandoJogo = true;
          menuMusic.pause()
      }
      if(instrucoesButton.clickButton(x, y)){
        instrucoes = true
      }
    }
  }
  else if(gameOver){
    //game over
    //volta pro menu
    if(gameOverButton.clickButton(x, y)){
      player.timer = 300
      player.score = 0
      player.iscas = 3
      gerarPeixe.peixesVivos.length = 0
      gameOver = false
      rodandoJogo = false
      gameOverMusic.pause()
    }
  }
});



//Desenhar mapa e player
function mapaDesenho() {
  pincel.fillStyle = '#E5FFFF'
  pincel.fillRect(0, 0, 1200, 250)
  pincel.fillStyle = '#274568'
  pincel.fillRect(0, 250, 1200, 700)
  chao.desenha()
  bauPeixe.desenha()
  player.desenha()
  linha.desenha()
  iscaObj.desenha()
  linhaFix.desenha()

  hud()
}

function hud(){
  minhocaIcon.desenha()

  pincel.font = "60px Arial";
  pincel.fillText(player.iscas, 100, 80);

  pincel.fillText(player.getTimer(), 500, 80);

  pincel.fillText(player.score, 1000, 80)
}

function desenhaGameOver(){
  pincel.clearRect(0, 0, 1200, 750)

  gameOverTela.desenha()

  pincel.fillStyle = '#000000'
  pincel.font = "60px Arial";
  pincel.fillText(player.score, 675 , 286)
}


//timer
function timerContando() {
    player.timer -= 1
    player.tempoTubarao -= 1

    if(player.timer < 0){
      gameOver = true
      rodandoJogo = false
      inGameMusic.pause()
    }

    if(player.iscas == 0){
      gameOver = true
      rodandoJogo = false
      inGameMusic.pause()
    }

    if(player.animacaoDano > -1){
      player.animacaoDano -= 1
    }
}

function getNovoPeixe() {
  var peixeGerado = gerarPeixe.gerarPeixe()
  peixesVivos.push(peixeGerado)
}

function main() {
  if(rodandoJogo){
    inGameMusic.play()
    pincel.clearRect(0, 0, 1200, 720)
    mapaDesenho()
    gerarPeixe.peixeFuncao()
    iscaObj.y = linha.y + linha.height - 20
    console.log(linha.height)
  } else if(gameOver){
    desenhaGameOver();
    gameOverMusic.play()
  }else{
    if(instrucoes){
      telaInstrucoes.desenha();
    }else{
      telaMenu.desenha();
    }
    menuMusic.play()
  }
  
  
  
}
setInterval(getNovoPeixe, 2500)
setInterval(timerContando, 1000)
setInterval(main, 10)
