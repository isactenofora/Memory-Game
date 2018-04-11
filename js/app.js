
let card = document.getElementsByClassName("card");  //create a list that holds all elements with class card
let cardCopy = [...card]; //create a copy of list card

shuffleDeck(); //call the function that randomizes the deck

function shuffleDeck() { //funtion that randomizes cards
  cardCopy = shuffle(cardCopy); //call function shuffle
  //remove elements of deck
  for (var i = 0; i < cardCopy.length; i++)  {
    cardCopy[i].remove();
  }
  let newDeck = document.getElementsByClassName("deck")[0]; //create a list of all elements with deck class and get the unique deck in the HTML
  for (var i = 0; i < cardCopy.length; i++) {
    newDeck.appendChild(cardCopy[i]); //add randomized cards to newDeck
  }
 }

 function shuffle(array) { // Shuffle function from http://stackoverflow.com/a/2450976
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
  }

  let moveCounter = 0; //create a variable with zero value
  let seconds = 0; //create a variable with zero value
  let secTimer = document.getElementsByClassName("time")[0]; //create a list that holds all elements with time class and get the unique

  function incrementSeconds() { //function that allows to count the time it takes the player to solve the game
      seconds++;
      secTimer.innerText = seconds;
  }

  let refreshInterval = 0; //create a variable with zero value
  let startTime = true; //declare a boolean variable
  let openCard = []; //create an empty array to store the cards that open

  let openingCard = function () {
    this.classList.add("open","show"); //allow to show cards
    openCard.push(this); //add to the array openCard
    if (startTime == true) {
      refreshInterval = setInterval(incrementSeconds, 1000); //function that call incrementSeconds every 1 seconds (1000ms)
      startTime = false;
    } // start the timer when the player open a card
    if (openCard.length == 2) { //set length of array openCard at two
      moveCounter++; //add a move
      document.getElementsByClassName("moves")[0].innerText = moveCounter; //change the move counter
      if ((openCard[1]).isEqualNode(openCard[0]) && ((openCard[1]) != (openCard[0]))) { //check that second card is equal to first
        matched();
        openCard = []; //empty the openCard array
      } else {
        let delayInMilliseconds = 250;
        setTimeout(function() {
          notMatched();
          openCard = [];
        }, delayInMilliseconds); //set a delay to show the 2 cards that player has click
         removeLife();
      }
    }

    let matchedCards = document.getElementsByClassName("match"); //create a list that holds all elements with match class
    if (matchedCards.length == 16) { //when 16 cards will have class match
      let scoreLife = document.getElementsByClassName("fa-star"); //create a list that holds all elements with fa-star class
      let totalLives = scoreLife.length; //return lenght of the list scoreLife, which will be the lives that you have left
      swal({ //add the library sweetalert to make the alert message more pretty
         title: "Congratulations!",
         text: "You win in " + moveCounter + " moves and " + seconds + " seconds, with "+ totalLives+ " lifes!",
         icon: "success",
       }); //message with animation that congratulates you and tells you how many movements and how many lives you have left
      restartGame(); //call the function restart, to start a new game
     }
  }

 for (var i = 0; i < card.length; i++) {
  card[i].addEventListener("click",openingCard);
 } //loop so that when you click on a card it is displayed

 let matched = function () {
    openCard[0].classList.add("match");
    openCard[1].classList.add("match");
  } //add match class to the first and second element of the list openCard

  let notMatched = function () {
    openCard[0].classList.remove("open", "show");
    openCard[1].classList.remove("open", "show");
  } //remove the open and show classes of the first and second elements in the list openCard



 let restartGame = function () {
   for (var i = 0; i < card.length; i++) {
     card[i].classList.remove("open", "show", "match");
   } //function that remove open, show and match classes of all elements in list card
   document.getElementsByClassName("moves")[0].innerText = 0; //take all elements with moves class and change its text to 0

   let restartLives = document.getElementsByClassName("fa-id"); //create a list that holds all elements with fa-id class for no lose the reference
   for(var i = 0; i<restartLives.length; i++) {
     restartLives[i].classList.add("fa-star"); //add fa-star class to the elements in the list restartLives
   }
   openCard = []; //empty openCard array
   moveCounter = 0; //set value of moveCounter to zero
   clearInterval(refreshInterval);
   seconds = 0; //set value of seconds to zero
   document.getElementsByClassName("time")[0].innerText = 0;

   startTime = true;
   shuffleDeck(); //randomize the deck
 }

 let restart = document.getElementsByClassName("restart"); //create a list that holds all elements with restart class
 restart[0].addEventListener("click", restartGame); //when you click the restart bottom, apply restartGame function

 let removeLife = function () {
   let scoreLife = document.getElementsByClassName("fa-star"); //create a list that holds all elements with fa-star class
   if(moveCounter%5==0)
   {
     scoreLife[0].classList.remove("fa-star"); //when the player has made 5 moves a star is removed
   }
   if (scoreLife.length == 0) {
     swal({
        title: "Oh!",
        text: "You loose!",
        icon: "error",
      });
     restartGame();
   } //message that jumps when the player has finished with all the stars
 }
