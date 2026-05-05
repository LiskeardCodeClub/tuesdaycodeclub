const quizData = [
    {
        question: "What do we put at the end of our file to open it as a webpage?",
        options: ["html", ".heading", ".html", ".webpage"],
        answer: ".html"
    },
    {
        question: "Which element adds an image?",
        options: ["<src>", "<pic>", "<img>", "<image>"],
        answer: "<img>"
    },
    {
        question: "What do we use to tell our webpage where our image is located?",
        options: ["src=", "img=", "locate=", "source"],
        answer: "src="
    },
    {
        question: "How do we add a link to another page?",
        options: ["href", "<a href=>", "page=", "<href>"],
        answer: "<a href=>"
    },
    {
        question: "What is an attribute in HTML?",
        options: ["A way of changing a particular characteristic in HTML", "A type of element", "A stylesheet", "A way to create links"],
        answer: "A way of changing a particular characteristic in HTML"
    },
    {
        question: "Where do we declare the language of our website?",
        options: ["Body element", "HTML element", "In a comment", "Head element"],
        answer: "HTML element"
    },
    {
        question: "How do we add a background to an element?",
        options: ["style=background-color:", "color=", "background=", "style=page-color:"],
        answer: "style=background-color:"
    },
    {
        question: "What is the language code we use for United Kingom English",
        options: ["english", "en-UK", "en", "en-GB"],
        answer: "en-GB"
    },
    {
        question: "What is the style we change when we're setting where text will appear",
        options: ["text", "text-align", "text-location", "text-place"],
        answer: "text-align"
    },
    {
        question: "What is a style in HTML",
        options: ["What clothes your webpage wears", "The colour of your webpage", "A set of visual presentation rules", "Where your webpage is on the internet"],
        answer: "A set of visual presentation rules"
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




