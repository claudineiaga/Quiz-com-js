//Pegando os elementos do HTML
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Array de perguntas e opções
const quizArray = [
  {
    id: "0",
    question: "O que é o JavaScript?",
    options: ["Uma linguagem para Back End", "Uma linguagem para Front End", 
    "Uma linguagem fortemente tipada", "Uma linguagem morta"],
    correct: "Uma linguagem para Front End",
  },
  {
    id: "1",
    question: "O que é o CSS?",
    options: ["linguagem de programação", "Uma linguagem para Back End", 
    "Uma linguagem de programação para Front End", "uma linguagem de estilização"],
    correct: "uma linguagem de estilização",
  },
  {
    id: "2",
    question: "O que é o HTML?",
    options: ["uma linguagem de marcação de hipertexto", 
    "Uma linguagem para Back End ", "Uma linguagem de programação antiga", "uma tecnologia ultrapassada"],
    correct: "uma linguagem de marcação de hipertexto",
  },
];

//Reiniciar Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Próximo Botão
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //incremento do quiz
    questionCount += 1;
    //se última pergunta
    if (questionCount == quizArray.length) {
      //ocultar o contêiner da pergunta e exibir a pontuação
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //pontuação do usuário
      userScore.innerHTML =
        "Você acertou " + scoreCount + " de " + questionCount;
    } else {
      //exibir pergunta Contagem
      countOfQuestion.innerHTML =
        questionCount + 1 + " de " + quizArray.length + " Questões";
      //exibir quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Tempo
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//mostrar quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Ocultar outros cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //mostrar atual questão
  quizCards[questionCount].classList.remove("hide");
};

//Criar Quiz
function quizCreator() {
  //classificar perguntas aleatoriamente
  quizArray.sort(() => Math.random() - 0.5);
  //gerar quiz
  for (let i of quizArray) {
    //opções de classificação aleatória
    i.options.sort(() => Math.random() - 0.5);
    //criar card do quiz
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //numero da questão
    countOfQuestion.innerHTML = 1 + " de " + quizArray.length + " Questões";
    //questão
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //opções
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Função Checker para verificar se a opção está correta ou não
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //se o usuário clicou na resposta == opção correta é armazenada no objeto
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //Para marcar a opção correta
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //limpar intervalo (parar temporizador)
  clearInterval(countdown);
  //desativar todas as opções
  options.forEach((element) => {
    element.disabled = true;
  });
}

//configuração inicial
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//quando o usuário clicar no botão começar
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//ocultar o questionário e exibir a tela inicial
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};