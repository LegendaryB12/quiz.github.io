const questionBank = [
    {
        question: "What will be the output of this code?",
        codeSnippet: 
`let x = 5;
console.log(typeof x);`,
        choices: ["'number'", "'string'", "'undefined'", "'object'"],
        correct: 0
    },
    {
        question: "Which array method would you use to add elements to the end of an array?",
        choices: [".push()", ".pop()", ".shift()", ".unshift()"],
        correct: 0
    },
    {
        question: "What is the result of this expression?",
        codeSnippet: 
`console.log(2 + '2' - 1);`,
        choices: ["21", "3", "NaN", "22"],
        correct: 0
    },
    {
        question: "Which of these is NOT a valid way to declare a variable in JavaScript?",
        choices: ["let x = 1;", "const x = 1;", "var x = 1;", "integer x = 1;"],
        correct: 3
    },
    {
        question: "What will this code return?",
        codeSnippet:
`const arr = [1, 2, 3, 4, 5];
const result = arr.filter(num => num > 2);
console.log(result.length);`,
        choices: ["5", "3", "2", "undefined"],
        correct: 1
    },
    {
        question: "What is the output of this code?",
        codeSnippet:
`let a = [1, 2, 3];
let b = [...a];
b.push(4);
console.log(a.length);`,
        choices: ["3", "4", "undefined", "Error"],
        correct: 0
    },
    {
        question: "Which method is used to convert a JSON string to a JavaScript object?",
        choices: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
        correct: 0
    },
    {
        question: "What does the following code output?",
        codeSnippet:
`console.log(0.1 + 0.2 === 0.3);`,
        choices: ["true", "false", "undefined", "Error"],
        correct: 1
    }
];

let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

// DOM elements
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');
const retryBtn = document.getElementById('retry');
const questionNumberEl = document.getElementById('questionNumber');
const progressFill = document.getElementById('progress-fill');
const timeEl = document.getElementById('time');
const currentScoreEl = document.getElementById('current-score');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeQuiz() {
    // Randomly select 5 questions from the question bank
    questions = shuffleArray([...questionBank]).slice(0, 5);
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    updateTimer();
    startTimer();
    showQuestion();
}

function updateTimer() {
    timeEl.textContent = timeLeft;
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionEl.textContent = question.question;
    
    const codeSnippetEl = document.getElementById('code-snippet');
    if (question.codeSnippet) {
        codeSnippetEl.textContent = question.codeSnippet;
        codeSnippetEl.classList.remove('hidden');
    } else {
        codeSnippetEl.classList.add('hidden');
    }
    
    choicesEl.innerHTML = '';
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice fade-in';
        button.textContent = choice;
        button.addEventListener('click', () => checkAnswer(index));
        choicesEl.appendChild(button);
    });
    
    feedbackEl.className = 'feedback hidden';
    nextBtn.className = 'btn hidden';
    questionNumberEl.textContent = currentQuestion + 1;
    
    // Update progress bar
    const progress = ((currentQuestion) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function checkAnswer(choiceIndex) {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => choice.disabled = true);
    
    const correct = questions[currentQuestion].correct;
    
    if (choiceIndex === correct) {
        score++;
        currentScoreEl.textContent = score;
        choices[choiceIndex].classList.add('correct');
        feedbackEl.textContent = 'Correct! 🎉';
        feedbackEl.className = 'feedback correct fade-in';
    } else {
        choices[choiceIndex].classList.add('incorrect');
        choices[correct].classList.add('correct');
        feedbackEl.textContent = 'Incorrect! 😕';
        feedbackEl.className = 'feedback incorrect fade-in';
        timeLeft = Math.max(0, timeLeft - 5); // Penalty for wrong answer
        updateTimer();
    }
    
    nextBtn.className = 'btn fade-in';
}

function showResult() {
    clearInterval(timer);
    document.getElementById('quiz').classList.add('hidden');
    resultEl.classList.remove('hidden');
    resultEl.classList.add('fade-in');
    scoreEl.textContent = score;
    
    if (score === questions.length) {
        messageEl.textContent = 'Perfect! You\'re a coding master! 🏆';
    } else if (score >= questions.length * 0.7) {
        messageEl.textContent = 'Great job! You\'ve got solid coding knowledge! 🌟';
    } else if (score >= questions.length * 0.5) {
        messageEl.textContent = 'Good effort! Keep practicing to improve! 💪';
    } else {
        messageEl.textContent = 'Keep learning and try again! You\'ve got this! 📚';
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

retryBtn.addEventListener('click', () => {
    document.getElementById('quiz').classList.remove('hidden');
    resultEl.classList.add('hidden');
    initializeQuiz();
});

// Start the quiz
initializeQuiz(); 