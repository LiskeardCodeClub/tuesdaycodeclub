const quizData = [
    {
        question: "Which element allows us to link to other pages?",
        options: ["a", "href", "img", "src"],
        answer: "a"
    },
    {
        question: "What basic elements make up a HTML page?",
        options: ["DOCTYPE, body, img, head", "lang, body, head, footer", "DOCTYPE, html, head, body", "css, JavaScript, html, body"],
        answer: "DOCTYPE, html, head, body"
    },
    {
        question: "How do we specify the source of an image?",
        options: ["locate=", "img=", "src=", "source="],
        answer: "src="
    },
    {
        question: "how do we specify where a link to another webpage should go?",
        options: ["href=", "a=", "page=", "src="],
        answer: "href="
    },
    {
        question: "What is a Stylesheet?",
        options: ["Our website", "A sheet of colours", "A file that allows us to add scripts", "A way to format the layout of a webpage"],
        answer: "A way to format the layout of a webpage"
    },
    {
        question: "What does CSS stand for?",
        options: ["Carefully Structured Styles", "Cascading Style Sheets", "Cool Stylish Sessions", "Cascading Statistic Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What is the common name file name for a Stylesheet?",
        options: ["stylesheet", "sheet", "styles", "stylish"],
        answer: "styles"
    },
    {
        question: "What is the file extension for our Stylesheet?",
        options: [".css", ".html", ".styles", ".js"],
        answer: ".css"
    },
    {
        question: "Which one of these can our Stylesheet NOT change?",
        options: ["background-color", "background-image", "text-align", "It can change all of these"],
        answer: "It can change all of these"
    },
    {
        question: "What is the name of the collection of files and images that make up your website?",
        options: ["Web Folders", "Web Directory", "Web Collection", "Web Files"],
        answer: "Web Directory"
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




