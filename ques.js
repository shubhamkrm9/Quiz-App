let questions=[];
let ques_arr=[];
let options=[];
let input_ans=[];
// for(let i=0;i<amount;i++){
//     input_ans.push(null);
// }
let main_div=document.querySelector(".main");
let correct_ans=[];
let h1=document.querySelector("#q_head");
let score=0;
let q=document.querySelector("p");
let next_button=document.querySelector("#next");
let submit_button=document.querySelector("#submit");
let prev_button=document.querySelector("#prev");
let option_el=document.querySelector("#options");
let individual_option=document.querySelectorAll(".individual_option");

for (let i = 0; i < individual_option.length; i++) {
  let inp = document.createElement("input");
  inp.setAttribute("type", "radio");
  inp.setAttribute("name","question");
  let label = document.createElement("label");
  individual_option[i].appendChild(inp);
  individual_option[i].appendChild(label);
}

let m=0;

let inp=document.querySelectorAll("input");
let label=document.querySelectorAll("label");
let fetching_status=false;
async function getq(url) {
    try{
        // let config={headers:{amount:10,category:17}}
        let res=await axios.get(url);
        // let res=await fetch(url);
        console.log("Res=",res);
        // console.log(res.data.results);
        return res.data.results;
    }catch(e){
         console.log("Failed to fetch data... ");
         console.log("Error=",e);
    }
    
}
let apiUrl;
let amount;
document.addEventListener("DOMContentLoaded", () => {
   
    const urlParams = new URLSearchParams(window.location.search);
    amount = urlParams.get('amount');
    const category = urlParams.get('category');
    const difficulty = urlParams.get('difficulty');
    
    if (!amount || !category || !difficulty) {
        q.innerText = "Error: Could not load quiz settings. Please go back and try again.";
        return;
    }
    apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    console.log("Fetching from API URL:", apiUrl);

    for (let i = 0; i < amount; i++) {
        input_ans.push(null);
    }
    getq(apiUrl).then((result)=>{
    fetching_status=true;
    console.log(" Data fetched successfully...");
    console.log("Result by Prmise=",result);
    // console.log(result);
    for (let i=0;i<result.length;i++){
        questions.push(result[i]);
    }
    for (let i=0;i<questions.length;i++){
        ques_arr.push(questions[i].question);
        let rand=(Math.floor(Math.random()*4));
        options.push([...questions[i].incorrect_answers]);
        options[i].splice(rand,0,questions[i].correct_answer);
        correct_ans.push(questions[i].correct_answer);
    }
    // function submit_ques(){

    // }

    
    
    disp_ques(m);

    function calculate_score(){
        for(let i=0;i<ques_arr.length;i++){
            if(input_ans[i]==correct_ans[i]){
                score++;
                
            }
        }
        console.log("Your score=",score);
    }



    next_button.addEventListener("click",()=>{
        m++;
        // console.log("m=",m);
        for(let i=0;i<individual_option.length;i++){
            if (inp[i].checked){
                input_ans.splice(m-1,1,inp[i].value);
                console.log(input_ans);
                inp[i].checked=false;
            }
        }
        disp_ques(m);
    })
    prev_button.addEventListener("click",()=>{
        m--;
        // console.log("m=",m);
        disp_ques(m);
    })
    submit_button.addEventListener("click",()=>{

        console.log("Submit button clicked!");
        for(let i=0;i<individual_option.length;i++){
            if (inp[i].checked){
                input_ans.splice(m,1,inp[i].value);
                console.log(input_ans);
                inp[i].checked=false;
            }
        }
        // alert("Answers  Submitted Successfully!");
        calculate_score();
        show_result();

        reset();
        

    })
        


}).catch((err)=>{
    q.innerText="Questions are not available !  Please Try again Later...";
    console.log("Error Fetching data...",err);
})
    // 3. Call the API with the correct URL
    // getq(apiUrl); 
    
});


function show_result(){
    let num_correct=score;
    
    let num_unattempted=0;
    for(let i=0;i<input_ans.length;i++){
        if(input_ans[i]==null){
            num_unattempted++;
        }
    }
    let num_incorrect=input_ans.length-score-num_unattempted;
    q.innerHTML=`Got Your Score...<br><br><br><br>Your Score is:${score}/${amount}
    <br><br><br>Number of correct answers:${num_correct}<br><br>Number of Incorrect Answers:${num_incorrect}
    <br><br>Number of Unattempted Answers:${num_unattempted}`;
    h1.innerText="Answers Submitted!";
    
    // main_div.classList.add("remove_apperance");
    let buttons=document.querySelectorAll("button");
    buttons.forEach((button)=>{
        button.classList.add("remove_apperance");
            
    })

    let sc=document.querySelector("#options");
    sc.innerHTML=``;
    // let show_button=document.createElement("button");
    // sc.appendChild(show_button);
    // show_button.addEventListener("click",()=>{
    //     q.innerHTML="Hello There ! Lets see your mistakes";
    // })
}

function reset(){
    score=0;
    input_ans=[];
    for(let i=0;i<amount;i++){
        input_ans.push(null);
    }
    m=0;
    let buttons=document.querySelectorAll("button");
    buttons.forEach((button)=>{
        // button.classList.remove("remove_apperance");
    })
}

function disp_ques(m){
    h1.innerText=`Question ${m+1}`;
    
    if (m==0){
        prev_button.classList.add("remove_apperance");
    }else{
        prev_button.classList.remove("remove_apperance");
    }
    if (m>amount-2){
        next_button.classList.add("remove_apperance");
    }else{
        next_button.classList.remove("remove_apperance");
    }
    q.classList.add("addeffect");
    option_el.classList.add("addeffect");
    main_div.classList.add("translation");
    setTimeout(()=>{
        q.classList.remove("addeffect");
        option_el.classList.remove("addeffect");
        main_div.classList.remove("translation");
    },1000)
    q.innerHTML=`Q. ${ques_arr[m]}`;
    for(let k=0;k<4;k++){
        label[k].setAttribute("for",options[m][k]);
        inp[k].setAttribute("id",options[m][k]);
        label[k].innerHTML=`${k+1}-${options[m][k]}`;
        inp[k].setAttribute("value",options[m][k]);
    }
}