const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Lion", correct: false },
            { text: "Elephant", correct: false },
        ]
    },
    {
        question: "Which is the tallest animal in the world?",
        answers: [
            { text: "Giraffe", correct: true },
            { text: "Elephant", correct: false },
            { text: "Lion", correct: false },
            { text: "Blue Whale", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    nextButton.removeEventListener("click", startQuiz); 
    nextButton.addEventListener("click", handleNextButtonClick);
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    selectedBtn.classList.add(isCorrect ? "correct" : "wrong");
    if (isCorrect) score++;

    Array.from(answerButtons.children).forEach(button => {
        button.classList.add(button.dataset.correct === "true" ? "correct" : "wrong");
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function handleNextButtonClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Play Again";
    nextButton.removeEventListener("click", handleNextButtonClick); 
    nextButton.addEventListener("click", startQuiz);
    nextButton.style.display = "block";
}
startQuiz();
