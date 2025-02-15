const questions=[
    {
        question:"What is the capital of Japan?",
        answers: [
                {text:"Beijing" , correct: false},
                {text:"Seoul" , correct: false},
                {text:"Tokyo" , correct: true},
                {text:"Bangkok" , correct: false},

        ]
    },
    {
        question:"Which planet is known as the 'Red Planet'?",
        answers: [
                {text:"Venus" , correct: false},
                {text:"Mars" , correct: true},
                {text:"Jupiter" , correct: false},
                {text:"Saturn" , correct: false},

        ]
    },
    {
        question:"What is the largest ocean on Earth?",
        answers: [
                {text:"Atlantic Ocean" , correct: false},
                {text:"Indian Ocean" , correct: false},
                {text:"Arctic Ocean" , correct: false},
                {text:"Pacific Ocean" , correct: true},

        ]
    },
    {
        question:"Which element is represented by the symbol 'O' on the periodic table?",
        answers: [
                {text:"Gold", correct: false},
                {text:"Oxygen" , correct: true},
                {text:"Silver" , correct: false},
                {text:"Hydrogen" , correct: false},

        ]
    }
];

const questionElement=document.getElementById("question");
const answerbtn=document.getElementById("answer");
const nextbtn=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextbtn.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button= document.createElement("button")
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}
function resetState(){
nextbtn.style.display="none";
while(answerbtn.firstChild){
    answerbtn.removeChild(answerbtn.firstChild)
}
}

function selectAnswer(e){
    const selectedbtn=e.target;
    const isCorrect=selectedbtn.dataset.correct==="true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbtn.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled="true";
    })
    nextbtn.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML="Play Again";
    nextbtn.style.display="block";
}

function handleNextbtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextbtn.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextbtn();
    }
    else{
        startQuiz();
    }
})

startQuiz();

