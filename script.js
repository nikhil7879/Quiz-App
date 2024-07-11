const questions = [
    {
        question: "What color is the sky on Mars?",
        answers: [
            { text: "Blue", correct: false },
            { text: "Green", correct: false },
            { text: "Pink", correct: true },
            { text: "Orange", correct: false },
        ]
    },
    {
        question: "Which animal is known for its distinctive laugh?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Hyena", correct: true },
            { text: "Dolphin", correct: false },
            { text: "Parrot", correct: false },
        ]
    },
    {
        question: "In which year did the famous Chicken Cross the Road incident occur?",
        answers: [
            { text: "1492", correct: false },
            { text: "1999", correct: false },
            { text: "2020", correct: false },
            { text: "It's a timeless joke", correct: true },
        ]
    },
    {
        question: "What is a group of unicorns called?",
        answers: [
            { text: "Herd", correct: false },
            { text: "Flock", correct: false },
            { text: "Blessing", correct: true },
            { text: "Pack", correct: false },
        ]
    },
    {
        question: "Which planet is known as the 'laughing planet' due to its moon named Titan?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: true },
            { text: "Mars", correct: false },
        ]
    }
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

    // Remove 'selected' class from all buttons
    Array.from(answerButtons.children).forEach(button => {
        button.classList.remove("selected");
    });

    // Add 'selected' class to the clicked button
    selectedBtn.classList.add("selected");

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
