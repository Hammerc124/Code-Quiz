var startBtn = document.querySelector(".start-btn");
var countdown = document.querySelector("#countdown");
var question = document.querySelector(".question");
var choice1 = document.querySelector(".choice1");
var choice2 = document.querySelector(".choice2");
var choice3 = document.querySelector(".choice3");
var choice4 = document.querySelector(".choice4");
var theTest = document.querySelector(".the-test");
var finalResult = document.querySelector("#correct-incorrect");
var initialsSection = document.querySelector(".initials-section");
var submitButton = document.querySelector(".submit-btn");
var theScore = document.querySelector(".the-score");
var viewHighscores = document.querySelector("#highscore");
var theHighscore = document.querySelector(".highscores-section");

var q1 = "Which of the following keywords is used to define a variable in Javascript?"
var q2 = "How to stop an interval timer in Javascript?"
var q3 = "Which function is used to serialize an object into a JSON string in Javascript?"
var q4 = "What data type is 'bronco' in var cars = ['bronco', 'jeep', '4runner']?"
var q5 = "Which of the following methods can be used to display data in some form using Javascript?"
var theQuestions = [q1, q2, q3, q4, q5]

var testChoice1 = {
    optionA: "A--  Var",
    optionB: "B--  Let",
    optionC: "C--  Both A and B",
    optionD: "D--  None of the above"
}
var testChoice2 = {
    optionA: "A--  clearTimer",
    optionB: "B-- clearInterval",
    optionC: "C-- intervalOver",
    optionD: "D-- stopTimer"
}

var testChoice3 = {
    optionA: "A--  stringify()",
    optionB: "B--  parse()",
    optionC: "C--  convert()",
    optionD: "D--  None of the above"
}

var testChoice4 = {
    optionA: "A--  undefined",
    optionB: "B--  string",
    optionC: "C--  boolean",
    optionD: "D--  number"
}

var testChoice5 = {
    optionA: "A--  document.write()",
    optionB: "B--  consol.log()",
    optionC: "C--  window.alert()",
    optionD: "D--  All of the above"
}
var theAnswers = [testChoice1, testChoice2, testChoice3, testChoice4, testChoice5]

var right1 = testChoice1.optionC;
var right2 = testChoice2.optionB;
var right3 = testChoice3.optionA;
var right4 = testChoice4.optionB;
var right5 = testChoice5.optionD;
var rightAnswers = [right1, right2, right3, right4, right5]

    startBtn.addEventListener("click", startTimer)

    startBtn.addEventListener("click", function(){
        document.querySelector(".javascript").style.display = "none";
        theTest.style.display = "block";
        })

    startBtn.addEventListener("click", nextQuestion)

    var correctIndex = 0;  

    function nextQuestion(){

    if (correctIndex === theQuestions.length - 1) {
        setTimeout(function(){theTest.style.display = "none";
        initialsSection.style.display = "inline";
    }, 500);

        setTimeout(function(){clearInterval(timerInterval)}, 500);

    } else {
        question.textContent = theQuestions[correctIndex];
        choice1.textContent = theAnswers[correctIndex].optionA;
        choice2.textContent = theAnswers[correctIndex].optionB;
        choice3.textContent = theAnswers[correctIndex].optionC;
        choice4.textContent = theAnswers[correctIndex].optionD;
    }
    }
    
    var timeLeft = 60;
    var timerInterval;
    function startTimer(){
        timerInterval = setInterval(function() {
            timeLeft --;
            countdown.textContent =  "Time: " + timeLeft + " seconds";
        
            if (timeLeft === 0) {
              clearInterval(timerInterval);
              theTest.style.display = "none";
              initialsSection.style.display = "inline";
            }
          }, 1000);
        return timerInterval;
    }   

theTest.addEventListener("click", verifyAnswer)

function verifyAnswer(event){
    if(event.target.matches(".trigger")){
        var userChoice = event.target.textContent;

        finalResult.textContent = " ";
        finalResult.style.display = "block";
            if (userChoice === rightAnswers[correctIndex]){
                finalResult.textContent = "Correct!";
                setTimeout(function(){ finalResult.style.display = "none"}, 500);
            } else {
                finalResult.textContent = "Wrong!"
                setTimeout(function(){ finalResult.style.display = "none"}, 500);
                timeLeft -= 5;
                countdown.textContent =  "Time: " + timeLeft + " seconds";
            }
            correctIndex++;
    }
    return timeLeft;
};

theTest.addEventListener("click", function(event){
    if(event.target.matches(".trigger")){
        nextQuestion();
    }})

submitButton.addEventListener("click", function(event){
    event.preventDefault();

    newUser();        

        initialsSection.style.display = "none";
        document.querySelector(".the-score").style.display = "block";
        document.querySelector(".user-scores").style.display = "block";
})

function newUser() {
    var userInitial = document.querySelector("#initials").value;
    if (userInitial === "") {
        userInitial = "anonymous";
    } 
        localStorage.setItem(userInitial, timeLeft);
        document.querySelector(".user-scores").textContent = " ";
        var p = document.createElement("p");
        p.textContent = userInitial + ": " + timeLeft;
        document.querySelector(".user-scores").appendChild(p);    
    
}

document.querySelector(".start-over").addEventListener("click", function(){
    
    correctIndex = 0;
    
    timeLeft = 60;
    countdown.textContent =  "Time: 60 seconds";
    
    document.querySelector(".javascript").style.display = "block";
    
    theScore.style.display = "none";
})

document.querySelector(".clear-highscores").addEventListener("click", function(){
    localStorage.clear();

    document.querySelector(".user-scores").textContent = " ";
    document.querySelector(".user-scores").style.display = "none";

});

viewHighscores.addEventListener("click", function(){

    clearInterval(timerInterval);
   
    document.querySelector(".javascript").style.display = "none";
    theTest.style.display = "none";
    initialsSection.style.display = "none";
    theScore.style.display = "block";

    document.querySelector(".user-scores").textContent = " ";
    for (let i = 0; i< localStorage.length; i++) {
        var p = document.createElement("p");
        var user = localStorage.key(i);
        var scores = localStorage.getItem(localStorage.key(i));
        p.textContent = user + ": " + scores;
        document.querySelector(".user-scores").appendChild(p);}
    })