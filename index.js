

let amount=10;
let quizPara={
    "type":"multiple"
};
let url=`https://opentdb.com/api.php?amount=${quizPara.num}&type=${quizPara.type}&difficulty=${quizPara.level}&category=${quizPara.category}`;
let category=10;
let cat="category="+category;
// url=url.replace("category=17",cat);

let difficulty;
let type='multiple';

let start_button=document.querySelectorAll(".indi");
let easy_button=document.querySelectorAll(".easy");
let med_button=document.querySelectorAll(".med");
let hard_button=document.querySelectorAll(".hard");

let science_button=document.querySelectorAll(".science button");
let gk_button=document.querySelectorAll(".gk button");
let history_button=document.querySelectorAll(".history button");
let maths_button=document.querySelectorAll(".maths button");

science_button.forEach(el=>{
    el.addEventListener("click",()=>{
        console.log("Science button clicked!");
        quizPara.category=17;
        
    })
})

gk_button.forEach(el=>{
    el.addEventListener("click",()=>{
        console.log("GK button clicked!");
        
        quizPara.category=10;
        
    })
})

maths_button.forEach(el=>{
    el.addEventListener("click",()=>{
        console.log("Maths button clicked!");
        quizPara.category=19;
    })
})

history_button.forEach(el=>{
    el.addEventListener("click",()=>{
        console.log("History button clicked!");
        quizPara.category=23;
        
    })
})

easy_button.forEach(el=>{
    el.addEventListener("click",()=>{
        console.log("Question Level:Easy");
        quizPara.level="easy";
    })
})

med_button.forEach(el=>{
    el.addEventListener("click",()=>{
        console.log("Question Level:Medium");
        quizPara.level="medium";
    })
})

hard_button.forEach(el=>{
    el.addEventListener("click",()=>{
        console.log("Question Level:Hard");
        quizPara.level="hard";
    })
})

console.log(quizPara);

start_button.forEach(el=>{
    el.addEventListener("click",()=>{
        console.log("Some Button was clicked...");
        let num=prompt("Enter Number of Question(Max=50):");

        if (num>50 || num<0){
            alert("Enter number less than 50 or Greater than 0!!");
        }else{
            quizPara.num=num;
            url=`ques.html?amount=${quizPara.num}&type=${quizPara.type}&difficulty=${quizPara.level}&category=${quizPara.category}`;
            let q_page="ques.html";
            window.location.href=url;
            // window.open(q_page,"_blank");
        }
        
    })
})


// console.log(url);