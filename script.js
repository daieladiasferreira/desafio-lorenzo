 let pontuacao = 0;
let perguntaAtual = 0;
let perguntas = [];

function iniciarJogo() {
  document.getElementById('tela-inicial').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  carregarPerguntas('fase1_perguntas.json');
}

function carregarPerguntas(arquivo) {
  fetch(arquivo)
    .then(response => response.json())
    .then(data => {
      perguntas = data;
      perguntaAtual = 0;
      pontuacao = 0;
      document.getElementById('pontuacao').textContent = `Pontuação: ${pontuacao}`;
      mostrarPergunta();
    });
}

function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];
  document.getElementById('pergunta').textContent = pergunta.pergunta;

  const opcoesDiv = document.getElementById('opcoes');
  opcoesDiv.innerHTML = '';

  pergunta.opcoes.forEach((opcao, index) => {
    const botao = document.createElement('button');
    botao.textContent = opcao;
    botao.onclick = () => verificarResposta(index);
    opcoesDiv.appendChild(botao);
  });
}

function verificarResposta(indiceEscolhido) {
  const respostaCorreta = perguntas[perguntaAtual].resposta;
  const audio = new Audio();

  if (indiceEscolhido === respostaCorreta) {
    pontuacao++;
    audio.src = 'fala_acerto.mp3';
  } else {
    pontuacao -= 2;
    audio.src = 'fala_erro.mp3';
  }

  audio.play();
  document.getElementById('pontuacao').textContent = `Pontuação: ${pontuacao}`;
  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    setTimeout(mostrarPergunta, 1000);
  } else if (pontuacao >= 30) {
    const parabens = new Audio('fala_vitoria.mp3');
    parabens.play();
    setTimeout(() => carregarPerguntas('fase2_perguntas.json'), 2000);
  } else {
    setTimeout(() => alert("Fim da fase! Que tal tentar de novo?"), 1000);
  }
}