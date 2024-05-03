import * as data from './data.js'; //js Module import systax(ES6)
const questionElement = document.getElementById('ques');
const answerButtons = document.getElementById("ans");
const nextButton = document.getElementById("next-btn");

let currentQuesIndex = 0;
let score = 0;

function startQuiz(){
    currentQuesIndex = 0;
    score = 0;
    nextButton.innerHTML = ">"
    showQuestion();
}

function showQuestion(){
    resetState(); //remove old button;
    let currentQuestion = data.ques[currentQuesIndex];
    let questionsNo = currentQuesIndex + 1;
    questionElement.innerHTML = questionsNo + ". " + currentQuestion.question;

    let currentAnsIndex = currentQuestion.correctIndex;
    currentQuestion.answers.forEach((answer, index)=> {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("btn");
        answerButtons.appendChild(button); 
        if(currentAnsIndex == index){
            button.dataset.correctIndex = true;
        }
        button.addEventListener("click", selectAns);    
    });
}

function selectAns(e){
    const selectBtn = e.target;
    const isCorrectIndex = selectBtn.dataset.correctIndex === 'true';
    if(isCorrectIndex){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correctIndex === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); 
    } 
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your Score ${score} out off ${data.ques.length}!`;
    nextButton.innerHTML = `Play Again`;
    nextButton.style.display = "block";
}

function handleNextBtn(){
    currentQuesIndex++;
    if(currentQuesIndex < data.ques.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuesIndex < data.ques.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});

startQuiz();