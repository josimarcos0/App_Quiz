const questions = [
    {
        question: "Qual o maior animal do mundo?",
        answers: [
            { text: "Tubarão", correct: false },
            { text: "Baleia Azul", correct: true },
            { text: "Elefante", correct: false },
            { text: "Girafa", correct: false },
        ]
    },
    {
        question: "Qual o animal mais rápido do mundo?",
        answers: [
            { text: "Leão", correct: false },
            { text: "Guepardo", correct: true },
            { text: "Cavalo", correct: false },
            { text: "Falcão", correct: false },
        ]
    },
    {
        question: "Qual o maior planeta do sistema solar?",
        answers: [
            { text: "Terra", correct: false },
            { text: "Júpiter", correct: true },
            { text: "Marte", correct: false },
            { text: "Saturno", correct: false },
        ]
    },
    {
        question: "Qual o metal mais leve?",
        answers: [
            { text: "Ferro", correct: false },
            { text: "Alumínio", correct: false },
            { text: "Lítio", correct: true },
            { text: "Ouro", correct: false },
        ]
    }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const answersButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score-display");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    startQuiz();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    restartButton.style.display = "none";  // Esconde o botão "Recomeçar" inicialmente
    showQuestion();
    resultContainer.style.display = "none";  // Esconde a pontuação no início
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answersButton.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answersButton.firstChild) {
        answersButton.removeChild(answersButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answersButton.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct) {
            button.classList.add("correct");
        }
    });
    nextButton.style.display = "block";
}

function showScore() {
    resultContainer.style.display = "block";
    scoreDisplay.innerHTML = `Você acertou ${score} de ${questions.length} perguntas!`;
    nextButton.innerHTML = "Finalizar";
    restartButton.style.display = "block";  // Mostra o botão "Recomeçar"
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

restartButton.addEventListener("click", () => {
    startQuiz();  // Reinicia o quiz
});
