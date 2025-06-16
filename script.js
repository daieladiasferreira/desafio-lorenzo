let perguntas = [];
let indiceAtual = 0;
let pontuacao = 0;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const pontuacaoEl = document.getElementById("pontuacao");
const telaInicialEl = document.getElementById("tela-inicial");
const quizContainerEl = document.getElementById("quiz-container");

// Sons
const somAcerto = new Audio("acerto.mp3");
const somErro = new Audio("erro.mp3");
const somVitoria = new Audio("vitoria.mp3");

// Função para animar elementos
function animarElemento(elemento) {
  elemento.classList.remove("animar");
  void elemento.offsetWidth;
  elemento.classList.add("animar");
}

// Função para carregar uma pergunta
function carregarPergunta() {
  const atual = perguntas[indiceAtual];
  perguntaEl.textContent = atual.pergunta;
  opcoesEl.innerHTML = "";

  atual.opcoes.forEach((opcao, index) => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.classList.add("botao-opcao");
    botao.onclick = () => verificarResposta(index);
    opcoesEl.appendChild(botao);
  });

  animarElemento(perguntaEl);
}

// Verifica se a resposta está correta
function verificarResposta(escolhida) {
  const correta = perguntas[indiceAtual].correta;
  if (escolhida === correta) {
    pontuacao += 1;
    somAcerto.play();
  } else {
    pontuacao -= 2;
    somErro.play();
  }

  pontuacaoEl.textContent = `Pontuação: ${pontuacao}`;
  animarElemento(pontuacaoEl);

  indiceAtual++;

  if (indiceAtual < perguntas.length) {
    setTimeout(carregarPergunta, 800);
  } else {
    perguntaEl.textContent = "🏆 Fim da Fase 1!";
    opcoesEl.innerHTML = "";
    somVitoria.play();
  }
}

// Função chamada ao clicar no botão Jogar
function iniciarJogo() {
  telaInicialEl.style.display = "none";
  quizContainerEl.style.display = "block";
  carregarPergunta();
}

// Carrega as perguntas do arquivo JSON
fetch("fase1_perguntas.json")
  .then((res) => res.json())
  .then((dados) => {
    perguntas = dados;
    // Não chama carregarPergunta aqui — só após clicar em Jogar
  })
  .catch((erro) => {
    perguntaEl.textContent = "Erro ao carregar perguntas.";
    console.error("Erro:", erro);
  });