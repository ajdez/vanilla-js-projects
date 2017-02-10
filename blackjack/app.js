// app state
// ===================
// These variables represent the state of our application, they tell us at
// any given moment the state of our blackjack game. You might find it useful
// to use these to debug issues by console logging them in the functions below.
var deckID = "";
var dealerCards = [];
var playerCards = [];
var playerScore = 0;
var dealerScore = 0;
var roundLost = false;
var roundWon = false;
var roundTied = false;
// game play nodes:
// ===================
// These nodes will be used often to update the UI of the game.
// assign this variable to the DOM node which has id="dealer-number"
var dealerScoreNode = document.getElementById('dealer-number');
// select the DOM node which has id="player-number"
var playerScoreNode = document.getElementById('player-number');
// select the DOM node which has id="dealer-cards"
var dealerCardsNode = document.getElementById('dealer-cards');
// select the DOM node which has id="player-cards"
var playerCardsNode = document.getElementById('player-cards');
// selec the DOM node which has id="announcement"
var announcementNode = document.getElementById('announcement')
// selec the DOM node which has id=new-game"
var newDeckNode = document.getElementById('new-game');
// selec the DOM node which has id="next-hand"
var nextHandNode = document.getElementById('next-hand');
// selec the DOM node which has id=""hit-me""
var hitMeNode = document.getElementById('hit-me');
// selec the DOM node which has id="stay"
var stayNode = document.getElementById('stay');
// On click events
// ==================
// These events define the actions to occur when a button is clicked.
// These are provided for you and serve as examples for creating further
// possible actions of your own choosing.
newDeckNode.onclick = getNewDeck;
nextHandNode.onclick = newHand;
hitMeNode.onclick = () => hitMe('player');
stayNode.onclick = () => setTimeout(() => dealerPlays(), 600);
// ==================
// Game mechanics functions
// ========================
function getNewDeck() {
    /* This function needs to:
    1) Call the resetPlayingArea function
    2) Make a call to deckofcardsapi in order to retrieve a new deck_id
    3) Set the value of our state variable deckID to the retrieved deck_id
    4) Change the display property of style on the nextHandNode element in order
    to provide the player with the Next Hand button.
    5) Hide the hit-me and stay buttons by changing their style.display to "none"
    6) Catch any errors that may occur on the fetch and log them */
    resetPlayingArea();
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
        .then(response => response.json())
        .then(function(data) {
            deckID = data.deck_id;
            console.log("Got new deck!");
            nextHandNode.style.display = "block";
            hitMeNode.style.display = "none";
            stayNode.style.display = "none";
        })
        .catch(function(err) {
            console.log(err);
        })
}

function computeScore(cards) {
    // This function receives an array of cards and returns the total score.
    // ...
    var total = 0;
    cards.forEach(function(a) {
        if (a.value === "KING") {
            a.value = 10;
            total += a.value;
        } else if (a.value === "QUEEN") {
            a.value = 10;
            total += a.value;
        } else if (a.value === "JACK") {
            a.value = 10;
            total += a.value;
        } else {
            a.value;
            total += +a.value;
        }
    })
    return total;
}

function newHand() {
    /* This function needs to:
    1) Call the resetPlayingArea function
    2) Make a call to deckofcardsapi using the deckID state variale in order
    to retrieve draw 4 cards from the deck.
    3) Once 4 cards have been drawn, push 2 of them to our dealerCards state
    array and 2 to our playerCards state array.
    4) Set our dealerScore state variable to "?" and then set the textContent
    value of the dealerScoreNode to dealerScore;
    5) ForEach card in playerCards and dealerCards, create an <img> element
    and assign the src of these to their respective card images. Don't forget to
    append these newly created <img> elements to the respective #dealer-cards and
    #player-cards DOM elements in order to have them show up in the html.
    6) Finally, compute the player's score by calling computeScore() and update
    the playerScoreNode to reflect this.
    7) If player score is 21, announce immediate victory by setting:
    roundWon = true;
    announcementNode.textContent = "BlackJack! You Win!";
    8) catch and log possible error from the fetch.
    */
    resetPlayingArea();
    url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`
    fetch(url)
        .then(response => response.json())
        .then(function(data) {
            playerCards.push(data.cards[0], data.cards[1]);
            dealerCards.push(data.cards[2], data.cards[3]);
            dealerScore = "?";
            dealerScoreNode.textContent = dealerScore;
            playerCards.forEach(function(cardObj) {
                var card = document.createElement('img');
                card.setAttribute('src', cardObj.image);
                playerCardsNode.appendChild(card);
            })
            dealerCards.forEach(function(cardObj) {
                var card = document.createElement('img');
                card.setAttribute('src', cardObj.image);
                dealerCardsNode.appendChild(card);
            })
            if (computeScore(playerCards) == 21) {
                roundWon = true;
                announcementNode.textContent = "BLACKJACK, you win!!";
            }
        })
        .catch(function(err) {
            console.log(err);
        })
}

function resetPlayingArea() {
    /* This function needs to:
    1) Reset all state variables to their defaults
    2) Reset the gameplay UI by updating textContent of all Nodes which may
    be displaying data from a previous round in the game. (ex: dealerScoreNode)
    3) Remove all <img> elements inside dealerCardsNode and playerCardsNode.
    */

    //Reset state variables
    // deckID = "";
    // dealerCards = [];
    // playerCards = [];
    // playerScore = 0;
    // dealerScore = 0;
    // roundLost = false;
    // roundWon = false;
    // roundTied = false;
    //
    // dealerScoreNode.textContent = "";
    // playerScoreNode.textContent = "";
    // announcementNode.textContent = "";


}


    function hitMe(target) {
        /* This function needs to:
        1) If any of roundLost or roundWon or roundTied is true, return immediately.
        2) Using the same deckID, fetch to draw 1 card
        3) Depending on wether target is 'player' or 'dealer', push the card to the
        appropriate state array (playerCards or dealerCards).
        4) Create an <img> and set it's src to the card image and append it to the
        appropriate DOM element for it to appear on the game play UI.
        5) If target === 'player', compute score and immediately announce loss if
        score > 21 by setting:
        roundLost = true;
        and updating announcementNode to display a message delivering the bad news.
        6) If target === 'dealer', just call the dealerPlays() function immediately
        after having appended the <img> to the game play UI.
        7) Catch error and log....
        */
    }

    function dealerPlays() {
        /* This function needs to:
        1) If any of roundLost or roundWon or roundTied is true, return immediately.
        2) Compute the dealer's score by calling the computeScore() function and
        update the UI to reflect this.
        */
        if (dealerScore < 17) {
            // a delay here makes for nicer game play because of suspence.
            setTimeout(() => hitMe('dealer'), 900)
        } else if (dealerScore > 21) {
            roundWon = true;
            // ... Update the UI to reflect this...
        } else if (dealerScore > playerScore) {
            roundLost = true;
            // ... Update the UI to reflect this...
        } else if (dealerScore === playerScore) {
            roundTied = true;
            // ... Update the UI to reflect this...
        } else {
            roundWon = true;
            // ... Update the UI to reflect this...
        }
    }
