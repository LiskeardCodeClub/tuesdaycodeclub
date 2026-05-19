     const quizData = [
    {
        question: "Where does a class attribute go?",
        options: ["In the stylesheet", "Inside the element tags", "Between the element tags", "in the DOCTYPE tag"],
        answer: "Inside the element tags"
    },
    {
        question: "What is a class?",
        options: ["A group of children", "An element that allows us to group and change multiiple styles at once.", "A type of style that changes font-colour", "An attribute that allows us to group and style elements."],
        answer: "An attribute that allows us to group and style elements."
    },
    {
        question: "Which style would we use to add a curved border?",
        options: ["border-radius", "border-radius and thickness", "border-radius and border", "border"],
        answer: "border-radius and border"
    },
    {
        question: "What does span do?",
        options: ["Span is an inline container that allows us to style specific parts of text.", "The entirety of our code.", "An element that allows us to style specific areas of text.", "A way to select certain styles in our stylesheet."],
        answer: "Span is an inline container that allows us to style specific parts of text."
    },
    {
        question: "What is a div element?",
        options: ["How we declare where our stylesheet is.", "An element we use to add a title to our webpage.", "An attribute used to apply styling to multiple elements at once.", "An element that is used to select and style multiple elements."],
        answer: "An element that is used to select and style multiple elements."
    },
    {
        question: "What is a selector in CSS?",
        options: ["How we select what styles we want to change in our Stylesheet.", "A way of referring to multiple elements with the same class, id or span to apply styles.", "A way of selecting multiple elements in our HTML document for styling.", "A way of specifiying where our Stylsheet is for our HTML document."],
        answer: "A way of referring to multiple elements with the same class, id or span to apply styles."
    },
    {
        question: "What is a wireframe?",
        options: ["A way of planning the layout of our webpage. Sort of like a poster for where we want things to go.", "The layout of our webpage including it's inheritance hierarchy.", "A map of all the pages and links in our site.", "A small model of our website built using wires."],
        answer: "A way of planning the layout of our webpage. Sort of like a poster for where we want things to go."
    },
    {
        question: "Which style will change background colour?",
        options: ["bg-color", "color", "background", "background-color"],
        answer: "background-color"
    },
    {
        question: "How do we change font colour?",
        options: ["colour", "color", "font-color", "font-style:color"],
        answer: "color"
    },
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const quiz = document.getElementById("quiz");
const progressBar = document.getElementById("progress");

let currentQuestion = 0;
let score = 0;
let reviewData = []; // store user answers for final review

function updateProgressBar() {
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = progress + "%";
}

function showQuestion() {
    updateProgressBar();

    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;

    optionsElement.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", selectAnswer);
        optionsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;
    const buttons = document.querySelectorAll(".option-btn");

    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);

    let isCorrect = selectedButton.innerText === answer;

    // Highlight correct/wrong
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        buttons.forEach(btn => {
            if (btn.innerText === answer) {
                btn.classList.add("correct");
            }
        });
    }

    // Save review info
    reviewData.push({
        question: quizData[currentQuestion].question,
        correctAnswer: answer,
        userAnswer: selectedButton.innerText,
        isCorrect: isCorrect
    });

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    updateProgressBar(); // fill bar to 100%

    quiz.innerHTML = `
        <h1>Quiz Completed!</h1>
        <h2 style="color: white">Review Your Answers</h2>
        <p style="color: white;">Your Score: ${score}/${quizData.length}</p>
        <div id="review"></div>
    `;

    const reviewContainer = document.getElementById("review");

    reviewData.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("review-item");

        div.innerHTML = `
            <p><strong>Q:</strong> ${item.question}</p>
            <p><strong>Your Answer:</strong> 
                <span class="${item.isCorrect ? "correct" : "wrong"}">
                    ${item.userAnswer}
                </span>
            </p>
            <p><strong>Correct Answer:</strong> ${item.correctAnswer}</p>
            <hr>
        `;

        reviewContainer.appendChild(div);
    });
}


showQuestion();



