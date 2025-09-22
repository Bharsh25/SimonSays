let gameSeq=[];
let userSeq=[];
let btns=["yellow", "red","green","purple"];

let start=false;
let level=0;
let h2=document.querySelector("h2");
let highestScore=0;

document.addEventListener("keypress", function(){
    if(start==false){
        startGame();
    }
});

document.querySelector("#startBtn").addEventListener("click", function(){
    if(start==false){
        startGame();
    }
});


function startGame(){
    console.log("game started");
    start = true;
    levelUp();
    document.querySelector("#startBtn").style.display = "none"; // hide button when game starts
}

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*btns.length);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
        
    }else{
        if(level>highestScore){
            highestScore=level;
            document.querySelector("#highestScore").innerText = `Highest Score: ${highestScore}`;
        }

        h2.innerText=`Game Over.. Your score was ${level} !! 
        Press Any Key To start again`;
        
        document.querySelector("body").style.backgroundColor="red";

        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);

        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    start=false;
    gameSeq=[];
    userSeq=[];
    level=0;
    document.querySelector("#startBtn").style.display = "inline-block";
}