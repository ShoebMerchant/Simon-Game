var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level =0;
var started = false;

function playSound(name){
    var sound = new Audio('sounds/'+name+'.mp3');
    sound.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
      }, 100);
}

$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);    
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}); 

function getRndInteger(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function nextSequence(){
    userClickedPattern=[];
    $("#level-title").text("Level "+ level++);
    var randomNumber = getRndInteger(0,3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
}

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

function checkAnswer(currenLevel){
    if(gamePattern[currenLevel]===userClickedPattern[currenLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);    
        }
    } else {
        console.log("wrong");
        var audio = new Audio('sounds/wrong.mp3');
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    $("#click-here").fadeIn();
}

$("#click-here").click(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
      $("#click-here").fadeOut();
    }

});
