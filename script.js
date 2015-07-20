$(function(){ //nice use of abbreviated document.ready!

var memory_array = ['card1.png','card1.png','card2.png','card2.png','card3.png','card3.png','card4.png','card4.png','card5.png','card5.png','card6.png','card6.png','card7.png','card7.png','card8.png','card8.png','card9.png','card9.png','card10.png','card10.png','card11.png','card11.png','card12.png','card12.png'];
// could also use a for loop to build this arrya
var memory_value = [];
var score = 0;
var totalScore = memory_array.length / 2;
var hold = false;

//add the shuffle_array function to the Javascript native array methods so we can use it on all arrays.
Array.prototype.shuffle_array = function(){
    var i = this.length, 
        j, 
        temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

//call our init function
boardInit();

//add click function to each block
$("body").on("click",".block:not(.flipped)",function(e){
  //reach to the block that was just clicked and get the value of
  //the custom attribute called 'data-value' -> this is the value of the card
  // EXCELLENT code comments!!!
  var cardvalue = $(this).attr("data-value");
  // some people use $ to denote jquery variables: $cardValue
  
  //we have an array of the flipped card values. we check to see 
  //if we have less that 2 cards flipped. because we don't want to go passed 2 cards
  if(memory_value.length < 2 && hold == false ){
    // I really like your hold implementation. I was unable to
    // produce any bugs by clicking rapidly on several cards.
    //if we have less that 2 -> add class 'flipped' to the cards that was just clicked
    $(this).addClass("flipped");
    //push the value of the card to our flipped cards array
    memory_value.push(cardvalue)
  }

  //if we have 2 cards flipped?
  if(memory_value.length == 2){
    var card1 = memory_value[0]; //get the value of the first card by looking into the flipped card array
    var card2 = memory_value[1]; //get the value of the second card by looking into the flipped card array
    
    //check to see if the value of both cards match
    if(card1 === card2){
      //if value matches
      score++; //add one to score variable
      $(".score").text("Score: " + score + "/" + totalScore ); // update our score div text to the current score!
      //select all flipped cards (the to with matching values) and remove the flip class and add stay class. 
      //we do this because if the cards didn't match we remove the class flipped and if we don't add the stay class, we will
      //loose track of the cards we have already found 
      $(".flipped").removeClass("flipped").addClass("stay"); 
      //reset the fliped card array so we can select the next 2 cards
      memory_value = [];
      //check to see if we have found all of the cards
      if(score == totalScore){
        //game is done nice job
        //wait one second (1000 milisecond = 1 second) and then 
        setTimeout(function(){
          //we remove all of the .block cards from the dom when the game is finished so we have
          //an empty container for the next game
          $('.block').remove(); 
          //fade the finish div in 
          $("#finish").fadeIn(); 
        },1000)

      }
    
    }else{
      //here they didn't find a matching card
      memory_value = []; //we reset the flipped card array so they can select the next 2 cards
      hold = true; //set hold to true so they can;t click on any card until we flip the selected cards back
      setTimeout(function(){
        //wait 2 secods and flip the cards back.. this gives them time to try to remember the cards
        $(".flipped").removeClass("flipped");
        hold = false; // set the hold back to false so they can click on cards again.
      },2000)
    }
  }

});

//click function fo replay button -- it just call our init function 
$("body").on("click","#finish a",function(e){
  //do stuff
  boardInit();
});


//function to create and add the random cards to the DOM
function boardInit(){
  score = 0; //set the score to be 0
  $("#finish").hide(); // hide the finish div
  $(".score").text("Score: 0/"+totalScore); //reset the score div text
  memory_array.shuffle_array(); //suffle our card array using the function we created at the top
  //loop through our shuffled card array and create divs so we can append them to our container
  for(var i = 0; i < memory_array.length; i++){
    $('.container').append('<div id="tile_'+i+'" class="block" data-value="'+memory_array[i]+'"><div class="front"></div><div class="back"><img src="'+memory_array[i]+'" /></div></div>');
  }
}


});//end ready

// Overall:
// This is an excellent solution!!! I would like to share this with the class
// with your permission as an example of excellent code commenting.
// It's clear how much thought you put into the game logic by your explanations.
// Your JavaScript skills are rapidly improving!!




