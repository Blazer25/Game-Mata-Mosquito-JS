//Definir altura e largura da tela de exbição do jogo de acordo com o navegador do jogador
var alturaNavegador = 0
var larguraNavegador = 0

//Variável que atuará sobre as vidas
var vidas = 1

//Variável que atuará sobre o tempo de jogo
var tempo = 10

//Variável que atuará sobre o tempo de criação do mosquito no jogo
var criaMosquitoTempo = 3000

//Variável que auará sobre a pontuação no jogo.
var pontuacao = 0

//Variável que atuará sobre a difuculdade do jogo
var difuculdade = window.location.search

//Ajuda a dificuldade de acordo com o tempo dos mosquitos em tela
if (difuculdade === '?facil') {
    criaMosquitoTempo = 3000
} else if (difuculdade === '?medio') {
    criaMosquitoTempo = 2000
} else {
    criaMosquitoTempo = 1000
}



//Função responsável por alterar os valores de largura e altura de acordo com o tamanho da tela do browser
function ajustaTamanhoTela() {
    alturaNavegador = window.innerHeight
    larguraNavegador = window.innerWidth

    console.log("Tamanho da tela -> " + "Altura: " + alturaNavegador + " | " + "Largura: " + larguraNavegador)
    console.log('--------------------------------------------------------')
}
//Chamar a função que ajusta o tamanho da tela do jogo.
ajustaTamanhoTela()

//Variável do cronômetro
var cronometro = setInterval(function () {

    tempo = tempo - 1
    if (tempo < 0) {
        window.location.href = 'assets/telas/vitoriaJogo.html'
    }
    document.getElementById('cronometro').innerHTML = tempo
}, 1000)

//Função responsável por criar o mosquito na tela e por dar sua posição aleatória na tela
function posicaoRandomicaMosquito() {

    //Verificar se o mosquito já existe, se existir, será removido da tela
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        // Se a quantidade de vidas perdidas for maior que 3, irá redirecionar o jogador para tela de Game Over
        if (vidas > 3) {
            window.location.href = 'assets/telas/fimJogo.html'
        } else {
            //Se for removido automaticamente, irá perder uma vida:
            document.getElementById('vida' + vidas).src = "assets/img/coracao_vazio.png"
            vidas++
        }

    }


    /* Variáveis que irão gerar randomicamente valores para os
    eixos X (horizontal) e Y (Vertical), onde os mosquitos poderão
    aparecer de forma aleatória. */

    //O .random gera valores de 0 a 1,
    var posicaoX = Math.random()
    var posicaoY = Math.random()

    /* Agora para atribuir essas posições junto com o tamanho da tela,
    basta multiplicar os eixos X e Y pela largura e altura respectivamente */
    posicaoX = posicaoX * larguraNavegador
    posicaoY = posicaoY * alturaNavegador

    //Para arredondar os valores (para baixo) para números inteiros, usar Math.floor
    //Subtrair - 90px para que o mosquito não ultrapasse para dentro da barra de rolagem
    posicaoX = Math.floor(posicaoX) - 90
    posicaoY = Math.floor(posicaoY) - 90

    //Controle para o eixo X, se for menor que 0 não iria aparecer na tela.
    if (posicaoX < 0) {
        posicaoX = 0
    } else {
        posicaoX = posicaoX
    }

    //Controle para o eixo Y, se for menor que 0 não iria aparecer na tela.
    if (posicaoY < 0) {
        posicaoY = 0
    } else {
        posicaoY = posicaoY
    }

    console.log("Vertical: " + posicaoY + " Horizontal: " + posicaoX)


    //Criar os elementos HTML
    var mosquito = document.createElement('img')

    //acessando o src do elemento criado (mosquito)
    mosquito.src = 'assets/img/mosquito.png'

    //adicionando a classe de tamanho e lado do mosquito ao elemento html img
    mosquito.className = tamanhoAleatorioMosquito() + ' ' + ladoAleatorioMosquito()

    //ajustando a posição do mosquito de acordo com eixos X e Y
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute' //posição absoluta para ele poder ser alterado aleatoriamente
    mosquito.id = 'mosquito' //Adiciona um ID ao HTML do mosquito
    //Quando clicar no mosquito, ele é removido e acrescido pontuação +1.
    mosquito.onclick = function () {
        this.remove()
        pontuacao++
        document.getElementById('pontuacao').innerHTML = pontuacao
    }

    //adicionando ao body um filho, que é o elemento mosquito
    document.body.appendChild(mosquito)

    console.log('O mosquito gerado é o: ' + tamanhoAleatorioMosquito())
    console.log('O lado do mosquito é: ' + ladoAleatorioMosquito())
    console.log('--------------------------------------------------------')
}

//Função responsável por gerar o tamanho do mosquito
function tamanhoAleatorioMosquito() {
    //Gerando valores, que podem ser: 0, 1 e 2
    var classeTamanhoMosquito = Math.floor(Math.random() * 3)

    //Verifica qual o valor da classe e atribui a um determinado tipo/nome de mosquito
    //Quando se usa return, o break não é necessario por o return já retorna um valor.
    switch (classeTamanhoMosquito) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }

}

//Função responsável por estabelecer aleatoriamente o lado do mosquito
function ladoAleatorioMosquito() {
    //Gera um número aleatório, podendo ser 0 ou 1
    var classeLadoMosquito = Math.floor(Math.random() * 2)

    switch (classeLadoMosquito) {
        case 0:
            return 'mosquitoLadoA'
        case 1:
            return 'mosquitoLadoB'
    }
}

