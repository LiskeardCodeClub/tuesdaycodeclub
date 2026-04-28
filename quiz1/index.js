const quizData = [
    {
        question: "What does the H in the <h> tag stand for?",
        options: ["Helpful", "Heading", "Hieroglyph", "Headline"],
        answer: "Heading"
    },
    {
        question: "What does the P in the <p> element stand for?",
        options: ["Procrastination", "Paragraph", "Part", "Pizza"],
        answer: "Paragraph"
    },
    {
        question: "How do you do a line break in a <p> element?",
        options: ["<br>", "//", "break", "<p><p>"],
        answer: "<br>"
    },
    {
        question: "How many heading types are there?",
        options: ["9", "None", "12", "6"],
        answer: "6"
    },
    {
        question: "What are the basic  elements that make up a HTML document?",
        options: ["Doctype, HTML, Body, Heading, ", "Body, HTML, Head, Document", "Doctype, Heading, Paragraph, HTML", "Doctype, HTML, Head, Body"],
        answer: "Doctype, HTML, Head, Body"
    },
    {
        question: "What is Wireframing?",
        options: ["Creating a design of your webpages general layout.", "The general layout of your web directories and how they connect.", "A model you create of your webpage to look at.", "The skeleton of your website and how it all interacts."],
        answer: "Creating a design of your webpages general layout."
    },
    {
        question: "What does HTML stand for?",
        options: ["Huge Tremendous Massive Language", "Hypertext Metadata Layer", "Hypertext Markup Language", "Hyper-Text Minimalist Language"],
        answer: "Hypertext Markup Language"
    },
    {
        question: "What code editor do we use?",
        options: ["Python", "Visual Studio Code", "VS Coder Studio", "Notepad"],
        answer: "Visual Studio Code"
    },
    {
        question: "What is a Hexadecimal reference for the colour black?",
        options: ["F5276C", "#F54927", "#000000", "#FFFFFF"],
        answer: "#000000"
    },
    {
        question: "What does the <title> element do?",
        options: ["Tells us the Title.", "Sets a title for our entire website.", "Sets our webpage title.", "Allows us to set a tab title."],
        answer: "Allows us to set a tab title."
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




