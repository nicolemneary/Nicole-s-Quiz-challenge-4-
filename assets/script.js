let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestions = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let countdown;


// 4 questions with options and a correct answer
const quizArray = [
    {
        id: "0",
        question: "What is the name for short sections of code written to complete a task?",
        options: ["array","loop","function","buffer"],
        correct: "function"
    },
    {
        id: "1",
        question: "What does 'js' stand for?",
        options: ["joint service","java script","jester slave","jelly sandwich"],
        correct: "java script"
    },

    {
        id: "2",
        question: "What is used for styling web pages?",
        options: ["cfs","ccs","ssc","css"],
        correct: "css"
    },
    {
        id: "3",
        question: "What do you use to listen for an event",
        options: [
            "Event Listener",
            "Class Listener",
            "Event Handler",
            "Class Handler",
        ],
        correct: "Event Listener"
    },
];

restart.addEventListener("click",() => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", (displayNext = () => {
    questionCount += 1;

    if (questionCount === quizArray.length) {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Your Score is " + scoreCount;
        + "out of" + questionCount;
    }
    else {
        countOfQuestions.innerHTML = questionCount + 1 + "of" + quizArray.length + "Question";

        quizDisplay(questionCount);
        clearInterval(countdown);
        timerDisplay();
    }
})
);
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = 'Time Left: ' + count + 's';
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll (".container-mid");

    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

function quizCreater() {
    quizArray.sort(() => Math.random() - 0.5);

    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        countOfQuestions.innerHTML = 1 + " of " + quizArray.length + " Question";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">
        ${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">
        ${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">
        ${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">
        ${i.options[3]}</button>

        `;

        quizContainer.appendChild(div);
    }
}

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName
        ("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;

    }
    else {
        userOption.classList.add("incorrect");
        count -= 10;

        options.forEach((element) => {
            if ((element.innerText = quizArray[questionCount].correct)) {
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    scoreCount = 0;
    count = 60;
    clearInterval(countdown);
    timerDisplay();
    quizCreater();
    quizDisplay(questionCount);


}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};

function highScore() {
    let initials = document.getElementById("initials").value;
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    let score = {
        score: scoreCount,
        initials: initials,
    };
    highScores.push(score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
}

document.getElementById("submit").addEventListener("click", highScore);


