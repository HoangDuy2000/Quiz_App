import * as data from './data.js'; //js Module import systax(ES6)
const questionElement = document.getElementById('ques');
const answerButtons = document.getElementById("ans");

let currentQuesIndex = 0;
let score = 0;

function startQuiz(){
    currentQuesIndex = 0;
    score = 0;
    showQuestion();
}

console.log(data.ques);

function showQuestion(){
    resetState(); //remove old button;
    let currentQuestion = data.ques[currentQuesIndex];
    let questionsNo = currentQuesIndex = 1;
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
    }else{
        selectBtn.classList.add("incorrect");
    }
}

function resetState(){
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); 
    }
}

startQuiz();