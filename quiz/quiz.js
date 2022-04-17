// minden elemet kiválasztok

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const pic = document.getElementById("pic");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// kérdések

let questions = [
    {
        question : "Márki-Zay Péter?",
        pic : "márki.jpg",
        choiceA : "A) IKSZDÉ ",
        choiceB : "B) ?Miniferi?",
        choiceC : "C) GyUrCsÁnY",
        choiceD : "D) xd",
        correct : "D"

    },{
        question : "Ha három piytpangod van és Teleki 1 pontot ad a matek dogádra, akkor milyen szagú lesz az ujjam?",
        pic : "teleki.jpg",
        choiceA : "A) pocokszar",
        choiceB : "B) tojásfing",
        choiceC : "C) rántotthús",
        choiceD : "D) mint a fülem;)",
        correct : "A"
    },{
        question : "Melyik stratégia segíti túlélni Zozival a Mikulásos napokat?",
        pic : "wet.jpg",
        choiceA : "A) teasütit dobálok neki tisztes távolból",
        choiceB : "B) megdugom",
        choiceC : "C) megdugom kutyában",
        choiceD : "D) hozzábaszok egy széket",
        correct : "C"
      },{
        question : "Mivel írnád le zozi agyát ha kvantummechnaikai rendszerben elemi részecskeként vizsgáljuk?",
        pic : "schrödinger.jpg",
        choiceA : "A) a mikró ultraibolyahullámaival",
        choiceB : "B) spektrofotométerrel",
        choiceC : "C) szuperpozícióval",
        choiceD : "D) alagúteffektussal",
        correct : "C"
      },{
        question : "Ha feltételezzük, hogy Deján hőre tágul, akkor hány Attila triggereli a popójáték eventet a laborban nyáron?",
        pic : "labor.jpg",
        choiceA : "A) de mi van, ha Attila is hőre tágul?",
        choiceB : "B) 1 mert attilából csak egy van",
        choiceC : "C) 0 mert ezt csak Ábel triggereli",
        choiceD : "D) 2 mert Dejánba 2 fasz fér",
        correct : "B"
      },{
        question : "Hányszor írtuk le egymásnak messengeren, hogy szeretlek?", 
        pic : "love.jpg",
        choiceA : "A) 205",
        choiceB : "B) 148",
        choiceC : "C) 176",
        choiceD : "D) MiAfAsZtSzÁmÍtEz?4!?!",
        correct : "D"
      },{
        question : "Tételezzük fel, hogy a Dóm tér egy kör, ekkor...",
        pic : "kör.png",
        choiceA : "A) a periódikusan zuhanó gólyafos mindig a közepére esik",
        choiceB : "B) Hopp Béla kicsapja a légpuskáját is",
        choiceC : "C) tekinthetjük egy óriási mosogépnek",
        choiceD : "D) a világ népessége 12 billió lesz",
        correct : "C"
      },{
        question : "Mennyire kedvező (termodinamikailag) a Deák bulik és Deján között lejátszódó reakció?",
        pic : "gibbs.png",
        choiceA : "A) ezek a picsák már megint a pöcsömre estek",
        choiceB : "B) olyan baszó a Gibbs függvénye, hogy szétfeszíti Ágota hüvelyét",
        choiceC : "C) már majdnem végbemegy önként de túlterhelte Dejánt az autofelláció",
        choiceD : "D) ΔG = 0 mert Deján már boldog, stabil kötésben van",
        correct : "D"
      },{
        question : "Melyik a legnagyobb?",
        pic : "káosz.jpg",
        choiceA : "A) Anita rossz kislány szintje",
        choiceB : "B) Zozi libidója",
        choiceC : "C) Deján káoszfázisa",
        choiceD : "D) Suszti pénisze",
        correct : "A"
      },{
        question : "Melyik írja le legjobban mennyire nagy a szeretetem irántad?",
        pic : "babu.jpg",
        choiceA : "A) akkora, mint amilyen nehéz a legrövidebb ideig élő virtuális foton",
        choiceB : "B) akkora, mint a fraktálok kerülete",
        choiceC : "C) olyan, mint ahogy a savak kicsapják a tojásfehérjét",
        choiceD : "D) akkora, mint a legbelső alhéjon elhelyezkedő elektron ionizációs energiája",
        correct : "B"
    }
];

// variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 30; // fél perc
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// kérdésblokk definiálása ---> innerhtml mert a js fileban sorként vannak kezelve 

function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";                      //kérdés
    pic.innerHTML = "<img src="+ q.pic +">";                         //kép

    choiceA.innerHTML = q.choiceA;                                       //opciók
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz); 

// start quiz

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}


// progress renderelése 

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}


// számláló renderelése

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// válaszellenőrző

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// rossz válasz

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// jó válasz

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}


// pontszám renderelése

function scoreRender(){
    scoreDiv.style.display = "block";

    // kiszámolja a kérdések hány százalékára válaszoltál jól
    const scorePerCent = Math.round(100 * score/questions.length);

    // választ egy képet a százalék alapján
    let img = (scorePerCent >= 80) ? "5.png" :
              (scorePerCent >= 60) ? "4.png" :
              (scorePerCent >= 40) ? "3.png" :
              (scorePerCent >= 20) ? "2.png" :
              "1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";             //beilleszti a html-be img src-val 
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";     // paragraphkét kezeli
}


