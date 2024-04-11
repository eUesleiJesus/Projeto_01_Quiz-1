//questões e respostas //

const questions = [ 

    {
        question: "O que fazer quaso encontre um mafagafo na floresta?",
        answers: [
            { text: "fingir de morto", correct: false },
            { text: "sair correndo e gritando", correct: false },
            { text: "oferecer comida", correct: true },
            { text: "ficar parado", correct: false },
        ]
    },
    {
        question: "Qual dessas cores não faz parte do mafaga-iris?",
        answers: [
            { text: "Azul", correct: false },
            { text: "Marrom", correct: false },
            { text: "Vermelho", correct: false },
            { text: "Amarelo", correct: true },
        ]
    },
    {
        question: "Qual prato típico do mafagaceiro?",
        answers: [
            { text: "salmão", correct: false },
            { text: "cuscuz", correct: true },
            { text: "brigadeiro", correct: false },
            { text: "macarrão", correct: false },
        ]
    },
    {
        question: "Qual é a forma mais eficas de acalmar um mafagacentão?", 
        answers: [
            { text: "cantar uma canção", correct: true },
            { text: "alisar ele", correct: false },
            { text: "dizer que tudo vai ficar bem", correct: false },
            { text: "chorar", correct: false },
        ]
    },
    {
        question: "Qual a região do Brasil onde se encontra o maior número de mafagaceiros?", 
        answers: [
            { text: "Brasilia", correct: false },
            { text: "Rio de Janeiro", correct: false },
            { text: "Acre", correct: true },
            { text: "São Paulo", correct: false },
        ]
    },
    {
        question: "quantos mafagafos pequenos são necessários para carregar um elefante?", 
        answers: [
            { text: "dez", correct: false },
            { text: "quarenta e dois", correct: false },
            { text: "quatro", correct: false },
            { text: "doze", correct: true },
        ]
    },
    {
        question: "Qual o principal requisito para ser um treinador de mafagafo?", 
        answers: [
            { text: "beleza", correct: false },
            { text: "coragem", correct: true },
            { text: "dinheiro", correct: false },
            { text: "fama", correct: false },
        ]
    },
    {
        question: "como se chama o mafagafo que vive na água?", 
        answers: [
            { text: "Mafagalamandra", correct: false },
            { text: "Mafagareia", correct: false },
            { text: "Mafaganfibio", correct: false },
            { text: "Mafagatullu", correct: true },
        ]
    },


];

//variáveis //

const startButton = document.getElementById("btn-start");
const header = document.querySelector(".header");
const apresentacao = document.querySelector(".apresentacao");
const screnQuiz = document.querySelector(".screen-quiz");
const nextButton = document.getElementById("next-btn");


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");


let currentQuestionIndex = 0;
let score = 0;

//funções // 

// função para iniciar o quiz //

function startQuiz() {
    // esconder a apresentação e mostrar o quiz //
    header.classList.add("hide");
    apresentacao.classList.add("hide");
    screnQuiz.classList.remove("hide");
    // contador de questões e pontuação //
    currentQuestionIndex = 0;
    score = 0;
    //botão seguinte //
    nextButton.innerHTML = "Seguinte";

    //mostrar a questão //
    showQuestion();
}

function showQuestion() {
    //resetar o estado do botão //
    resetState();

    // indice das questões
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    // titulo da questão
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //mostrar as respostas //
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer);
        button.dataset.correct = answer.correct;
    });

    // mostrar numero de questões //
    document.getElementById("idQuestion").innerHTML = "Questão " + questionNo + " de " + questions.length;

}

// função para resetar o estado do botão //
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// função para selecionar a resposta //

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        //incrementar a pontuação //
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    // desabilitar os botões //
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // mostrar o botão seguinte //
    nextButton.style.display = "block";
   
}

// função para mostrar a pontuação //
function showScore() { 
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}`;

    //reiniciar o jogo
    nextButton.innerHTML = "Jogar novamente";
    nextButton.style.display = "block";

}

// função para o botão seguinte - iniciar o jogo ou jogar novamente //

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

//evento para o botão seguinte //

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

//função para iniciar o quiz//
startButton.addEventListener("click", () => {
    startButton.style.display = "none",
  
    startQuiz();
});


