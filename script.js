 let perguntas = [];
let indiceAtual = 0;
let pontuacao = 0;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const pontuacaoEl = document.getElementById("pontuacao");
const quizContainer = document.getElementById("quiz-container");
const telaInicial = document.getElementById("tela-inicial");

// Sons
const somAcerto = new Audio("acerto_bling.mp3");
const somErro = new Audio("erro_ops.mp3");
const somVitoria = new Audio("vitoria_parabens.mp3");

const falaAcerto = new Audio("fala_acerto.mp3");
const falaErro = new Audio("fala_erro.mp3");
const falaVitoria = new Audio("fala_vitoria.mp3");

// Animação rápida
function animarElemento(elemento) {
  elemento.classList.remove("animar");
  void elemento.offsetWidth;
  elemento.classList.add("animar");
}

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

function verificarResposta(escolhida) {
  const correta = perguntas[indiceAtual].correta;
  if (escolhida === correta) {
    pontuacao += 1;
    somAcerto.play();
    falaAcerto.play();
  } else {
    pontuacao -= 2;
    somErro.play();
    falaErro.play();
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
    falaVitoria.play();
  }
}

// 🔄 Essa função será chamada ao clicar no botão "Jogar"
function iniciarJogo() {
  telaInicial.style.display = "none";
  quizContainer.style.display = "block";
  carregarPergunta();
}

// 🔽 Carregar perguntas da fase 1
fetch("fase1_perguntas.json")
  .then((res) => res.json())
  .then((dados) => {
    perguntas = dados;
  })
  .catch((erro) => {
    perguntaEl.textContent = "Erro ao carregar perguntas.";
    console.error("Erro:", erro);
  });