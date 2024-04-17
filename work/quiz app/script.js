const questions = [
    {
        question: " Who is the Father of our Nation?",
        answers: [
            {text: "Dr. A. P. J. Abdul Kalam",correct: false},
            {text: "Mohandas Karamchand Gandhi",correct: true},
            {text: "Raja Ram Mohan Roy",correct: false},
            {text: "Keshab Chunder Sen",correct: false},
        ]
    },
    {
        question: " The ratio of width of our National flag to its length is",
        answers: [
            {text: "3:5",correct: false},
            {text: "2:4",correct: false},
            {text: "2:3",correct: true},
            {text: "3:4",correct: false},
        ]
    },
    {
        question: "Which state will be the location of the newly approved Sarakka Central Tribal University?",
        answers: [
            {text: "Andhra Pradesh",correct: false},
            {text: "Telangana",correct: true},
            {text: "West Bengal",correct: false},
            {text: "Jharkhand",correct: false},
        ]
    },
    {
        question: " The famous Dilwara Temples are situated in?",
        answers: [
            {text: "Uttar Pradesh",correct: false},
            {text: "Rajasthan",correct: true},
            {text: "Madhya Pradesh",correct: false},
            {text: "Delhi",correct: false},
        ]
    },
    {
        question: " What is a group of crows called?",
        answers: [
            {text: "Raven",correct: false},
            {text: "crown",correct: false},
            {text: "murder",correct: true},
            {text: "Cub",correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

// store the question index and score 
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    // when we start the quiz 
    currentQuestionIndex=0;
    score=0;
    // we adding innerHTML next bcz at the end we will change the text to the restart or replay 
    nextButton.innerHTML="Next";
    // for called another function that will display the question
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scorred ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();