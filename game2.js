var level=0;
var started = false;


var buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern = [];

function playsound(name){
    var audio=new Audio(name+".mp3");
    audio.play();
}

$(".main1").click(function(){
    if(!started){
        $("h1").text("Level "+level);
        newSequence();
        started=true;
    }
});

$(".btn").click(function(){
   var userChosenColour= $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playsound(userChosenColour);   
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

function newSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level-"+level);

    var randomnumber=Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },200);
}

function checkAnswer(currentlevel){
     if(gamePattern[gamePattern.length-currentlevel-1]===userClickedPattern[currentlevel]){
         if(userClickedPattern.length===gamePattern.length){
             setTimeout(function(){
                 newSequence();
             },1000);
         }
     }else{
         playsound("wrong");
         $("body").addClass("game-over")
         setTimeout(function(){
          $("body").removeClass("game-over")
         },200);
         $("h1").text("Game Over, Press Below Key to Restart");
         startOver();
     }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}




