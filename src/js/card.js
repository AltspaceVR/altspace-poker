function Card(number, suit) {
    this.number = number;
    this.suit = suit;
    this.image = document.createElement('img');
    this.image.src = this.filename();
    this.movementTween = {
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Vector3(0, 0, 0)
    };
}

Card.numArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];
Card.suitArray = ["clubs", "diamonds", "hearts", "spades"];
Card.suitSymbols = ["♣", "♦", "♥", "♠"];
Card.orderedDeck = (function() {
    var cards = [];
    for (var i = 0; i < Card.numArray.length; i++) {
        for (var j = 0; j < Card.suitArray.length; j++) {
            cards.push(new Card(i, Card.suitArray[j]));
        }
    }
}());

Card.prototype.friendlyRepresentation = function() {
    return Card.suitSymbols[Card.suitArray.indexOf(this.suit)] + " " + Card.numArray[this.number];
};

Card.prototype.friendlynumber = function() {
    return Card.numArray[this.number];
};

Card.prototype.texturePrefix = "assets/Cards/";

Card.prototype.filename = function() {
    return this.texturePrefix + Card.numArray[this.number] + "_of_" + this.suit + ".png";
};


Card.hasMultiples = function(cards, numberOfMultiples) {
    if (numberOfMultiples <= 1) {
        console.log('need to check for more than one card!');
    }
    var sortedCards = [];
    for (var i = 0; i < cards.length; i++) {
        if (typeof(sortedCards[cards[i].number]) == "undefined") {
            sortedCards[cards[i].number] = {
                cards: [cards[i]],
                num: 0
            };
        } else {
            sortedCards[cards[i].number].cards.push(cards[i]);
        }
        sortedCards[cards[i].number].num++;
    }

    var findThem = false;

    sortedCards.forEach(function(obj) {
        if (parseInt(obj.num) === parseInt(numberOfMultiples)) {
            findThem = obj.cards;
        }
    });

    return findThem;
};

Card.isFlush = function(cards) {
    if (cards.length < 5) {
        return false;
    }
    var suits = {};
    for (var i = 0; i < cards.length; i++) {
        if (typeof suits[cards[i].suit] === "undefined") {
            suits[cards[i].suit] = {
                cards: [cards[i]],
                num: 0
            };
        } else {
            suits[cards[i].suit].cards.push(cards[i]);
        }
        suits[cards[i].suit].num++;
    }
    var isFlush = false;

    for (var propertyName in suits) {
        if (suits.hasOwnProperty(propertyName) && suits[propertyName].num>=5) {
            isFlush = suits[propertyName].cards;
        }
    }
    return isFlush;
};

Card.isStraight = function(cards) {
    var theseCards = cards.slice(0);
    theseCards.sort(function(card1, card2) {
        if (card1.number === card2.number) {
            return 0;
        } else {
            return card1.number > card2.number;
        }
    });

    var numTries = cards.length - 5;
    //we have this many attempts to find a straight

    for (var i=0; i<numTries; i++) {
        for (var j=0; j<5; j++) {
            if (theseCards[i+j].number !== (theseCards[i+j].number+1)) {
                break;
            }
            if (j===4) {
                //if we've gotten this far, we're done!
                return theseCards.slice(i, i+5);
            }
        }
    }
    return false;
};

Card.sameCards = function(setOne, setTwo) {
    //assuming the cards are in the correct order
    if(setOne.length !== setTwo.length || setOne.length === 0 || !setOne.length){
        return false;
    }

    for(var i=0; i<setOne.length; i++){
        if(setOne[i].number !== setTwo[i].number || setOne[i].suit !== setTwo[i].suit){
            return false;
        }
    }
    return true;
};

Card.max = function(cards) {
    return Math.max.apply(null, cards.map(function(val){return val.number;}));
};

Card.sort = function(cardset) {
    var cards = cardset.slice(0);
    cards.sort(function(card1, card2){
        if(card1.number === card2.number){
            return 0;
        }else{
            return card1.number > card2.number;
        }
    });
    cards.reverse();
    //        cards = cards.slice(0, 5);
    return cards;
};
