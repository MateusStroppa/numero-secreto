//instânciando um vetor
let listaDeNumerosSorteados = [];

let numeroLimite = 1000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();

// Função para atribuir um valor à uma tag, utilizando parâmetros
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(){
exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', 'Olá! Escolha um número entre 1 e 1000');
}

//criando uma função para o botão "Chutar"
function verificarChute(){
    //pegando o valor do input
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;

    console.log(`Número secreto: ${numeroSecreto}. Número de tentativas: ${tentativas}`);
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou');
        exibirTextoNaTela('p', mensagemTentativas);
        //habilitando o botão "Novo Jogo", removendo o atributo disable dele
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else if (chute > numeroSecreto){
        exibirTextoNaTela('h1', 'O número secreto é menor');
    }else{
        exibirTextoNaTela('h1', 'O número secreto é maior');
    } 
    tentativas++;
    limparCampo();
    
}

//criando uma função para gerar um número aleatório e verificar se a lista de números sorteados não está cheia
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite ){
        listaDeNumerosSorteados = [];
    }

    //função para verificar se o item já existe na lista
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        //função "push" insere um item no fim do vetor
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

//criar função para limpar o campo de chute (para remover um item, usar a função pop)
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//criando a função para resetar o jogo
function restart(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}