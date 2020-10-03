
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


$(document).keypress(function() {

  if(!started) {

    $("#level-title").text("Level 0");

    nextSequence();

    started = true;

  }

});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});


function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    console.log("success");

    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
      var audioWrong = new Audio("sounds/wrong.mp3");
      audioWrong.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  }

}


function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {

    $("#" + currentColor).removeClass("pressed");

  }, 100);

}
