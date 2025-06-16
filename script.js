
let perguntas = [];
let indiceAtual = 0;
let pontuacao = 0;
let faseAtual = 1;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const pontuacaoEl = document.getElementById("pontuacao");

// Sons
const somAcerto = new Audio("acerto.mp3");
const somErro = new Audio("erro.mp3");
const somVitoria = new Audio("vitoria.mp3");

const falaAcerto = new Audio("fala_acerto.mp3");
const falaErro = new Audio("fala_erro.mp3");
const falaVitoria = new Audio("fala_vitoria.mp3");

// Animação
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
    if (faseAtual === 1) {
      faseAtual = 2;
      indiceAtual = 0;
      carregarFase2();
    } else {
      perguntaEl.textContent = "🎉 Fim do jogo! Parabéns!";
      opcoesEl.innerHTML = "";
      somVitoria.play();
      falaVitoria.play();
    }
  }
}

function carregarFase1() {
  fetch("fase1_perguntas.json")
    .then((res) => res.json())
    .then((dados) => {
      perguntas = dados;
      carregarPergunta();
    })
    .catch((erro) => {
      perguntaEl.textContent = "Erro ao carregar perguntas da Fase 1.";
      console.error("Erro:", erro);
    });
}

function carregarFase2() {
  fetch("fase2_perguntas.json")
    .then((res) => res.json())
    .then((dados) => {
      perguntas = dados;
      perguntaEl.textContent = "🌟 Fase 2 iniciando...";
      opcoesEl.innerHTML = "";
      setTimeout(carregarPergunta, 1000);
    })
    .catch((erro) => {
      perguntaEl.textContent = "Erro ao carregar perguntas da Fase 2.";
      console.error("Erro:", erro);
    });
}

// Inicia o jogo na Fase 1
carregarFase1();
