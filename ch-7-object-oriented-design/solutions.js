// 7.1 -- design data structures for a deck of cards

class Card {
  constructor(val, suit) {
    this.val = val;
    this.suit = suit;
  }
}

class DeckOfCards {
  constructor(game) {
    // game will be a string, i.e., "blackjack", "poker", etc.
    this.typeOfGame = game;
    this.deck = [];
    // directions for generating a standard 52-card blackjack or poker deck
    if (game === "blackjack" || game === "poker") {
      var numberOfCards = 52;
      var suits = ["clubs", "spades", "hearts", "diamonds"];
      var value = 1;
      while (numberOfCards) {
        for (var i = 0; i < suits.length; i++) {
          if (value === 1) {
            this.deck.push(new Card("ace", suits[i]))            
          } else if (value === 11) {
            this.deck.push(new Card("jack", suits[i]))
          } else if (value === 12) {
            this.deck.push(new Card("queen", suits[i]))
          } else if (value === 13) {
            this.deck.push(new Card("king", suits[i]))
          } else {
            this.deck.push(new Card(value, suits[i])) 
          }
        }
        numberOfCards -= 4;
        value++;
      }
    }
  }
}

console.log(new DeckOfCards("poker"));