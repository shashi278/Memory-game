window.onload= function(){
    var texts=["A","B","C","D","E","F","G","H","I","J","A","B","C","D","E","F","G","H","I","J"];
    
    var openCards=[];
    var totalTurns=20;
    var totalScore=0;
    
    var divsWrapper= document.createElement("div");
    divsWrapper.setAttribute("id","divsWrapper");
    document.body.appendChild(divsWrapper);
    divsWrapper.style.position="relative";
    divsWrapper.style.margin="auto";
    divsWrapper.style.height="540px";
    divsWrapper.style.width="530px";
    divsWrapper.style.border="3px solid rgb(39, 55, 70)";
    divsWrapper.style.borderRadius="5%";
    
    var dispTurn= document.createElement("div");
    dispTurn.setAttribute("class","dispTurn");
    document.body.appendChild(dispTurn);
    var h3= document.createElement("h3");
    h3.textContent="Turns Remaining:";
    h3.style.marginTop="1%";
    dispTurn.appendChild(h3);
    var turn= document.createElement("h2");
    turn.textContent=totalTurns;
    dispTurn.appendChild(turn);
    
    var dispScore= document.createElement("div")
    dispScore.setAttribute("class","dispScore");
    document.body.appendChild(dispScore);
    var h4= document.createElement("h3");
    h4.textContent="Your Score:";
    h4.style.marginTop="1%";
    dispScore.appendChild(h4);
    var score= document.createElement("h2");
    score.textContent=totalScore;
    dispScore.appendChild(score);
    
    for(var i=0;i<20;i++){
        var div= document.createElement("div");
        div.setAttribute("class","div div"+i);
        divsWrapper.appendChild(div);
        div.addEventListener("click",showCard);
        div= {flipped:false};
        
    }
    var allDivs= document.querySelectorAll(".div");
    fillCards();
    function showCard(){
        if (!this.flipped) {
            var cont= this.getAttribute("value");
            openCards.push(this);
            this.style.background="white";
            this.style.color="black";
            this.textContent=cont;
            this.flipped=true;
            
        }
        else{
            this.style.background="url('https://image.ibb.co/bPNTxy/origins_playing_cards_back1.jpg')";
            this.style.backgroundRepeat="no-repeat";
            openCards.splice(openCards.indexOf(this),1);
            this.textContent='';
            this.flipped=false;
            
        }
        if(openCards.length==2){
            removeEvent();
            totalTurns--;
            turn.textContent=totalTurns;
            setTimeout(matchCards,500);
            if(totalTurns==0){
                gameOver();
            }
            
        }
    }
    function fillCards(){
        for(i=0;i<allDivs.length;i++){
            rand= Math.round(Math.random()*(texts.length-1));
            allDivs[i].setAttribute("value",texts[rand]);
            texts.splice(rand,1);
        }
    }
    
    function matchCards(){
        if(openCards[0].textContent==openCards[1].textContent){
            openCards[0].removeEventListener("click",showCard);
            openCards[1].removeEventListener("click",showCard);
            totalScore+=5;
            score.textContent=totalScore;
        }
        else{
           openCards[0].style.transition="background 0.2s linear forwards"; 
           openCards[1].style.transition="background 0.2s linear forwards"; 
            openCards[0].style.background="url('https://image.ibb.co/bPNTxy/origins_playing_cards_back1.jpg')";
            openCards[0].style.background="url('https://image.ibb.co/bPNTxy/origins_playing_cards_back1.jpg')";
            openCards[0].style.backgroundRepeat="no-repeat";
            openCards[1].style.background="url('https://image.ibb.co/bPNTxy/origins_playing_cards_back1.jpg')";
            openCards[1].style.backgroundRepeat="no-repeat";
            
            openCards[0].textContent="";
            openCards[1].textContent="";
            openCards[0].flipped=false;
            openCards[1].flipped=false;
        }
        var count=0;
        for(i=0;i<allDivs.length;i++){
            if(!allDivs[i].flipped){
                count++;
            }
        }
        if(count==0){
            gameOver();
        }
        else{
            openCards=[];
            addEvent();
        }
        
    }
    
    function removeEvent(){
        for(i=0;i<allDivs.length;i++){
            if(!allDivs[i].flipped){
                allDivs[i].removeEventListener("click",showCard);
            }
        }
    }
    
    function addEvent(){
       for(i=0;i<allDivs.length;i++){
            if(!allDivs[i].flipped){
                allDivs[i].addEventListener("click",showCard);
            }
        } 
    }
    
    function gameOver(){
        for(var i=0;i<allDivs.length;i++){
            allDivs[i].style.opacity=0.3;
            allDivs[i].removeEventListener("click",showCard);
        }
        var canvas = document.createElement("canvas");
        canvas.setAttribute("class","canvas");
        canvas.style.background="transparent";
        canvas.style.position="absolute";
        canvas.style.left="0%";
        canvas.height=100;
        canvas.width=530;
        var ctx= canvas.getContext("2d");
        ctx.font="80px Ariel";
        ctx.fillStyle="#F1C40F";
        ctx.fillText("Game Over",80,70);
        divsWrapper.appendChild(canvas);
        
        document.body.removeChild(dispTurn);
        document.body.removeChild(dispScore);
        
        var scoreCan= document.createElement("canvas");
        scoreCan.setAttribute("class","scoreCan");
        scoreCan.style.background="transparent";
        scoreCan.style.position="absolute";
        scoreCan.style.left="0%";
        scoreCan.height=100;
        scoreCan.width=530;
        
        var ctxx= scoreCan.getContext("2d");
        ctxx.font="50px Ariel";
        ctxx.fillStyle="#28B463";
        ctxx.fillText("Your Score: "+totalScore,130,70);
        divsWrapper.appendChild(scoreCan);
        
        
        var btn= document.createElement("button");
        btn.textContent="Reset Game";
        btn.style.background="yellow";
        btn.addEventListener('click',resetGame);
        btn.style.position="absolute";
        btn.style.top="65%";
        btn.style.left="40%";
        divsWrapper.appendChild(btn);
    }
    
    function resetGame(){
        document.location.reload();
    }
}