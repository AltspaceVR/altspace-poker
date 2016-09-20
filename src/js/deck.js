function Deck() {
    this.perfectDeck = [];              //deck of cards in perfect order;
    this.shuffledDeck = [];
    for (var i = 0; i < Card.numArray.length; i++) {
        for (var j = 0; j < Card.suitArray.length; j++) {
            this.perfectDeck.push(new Card(i, Card.suitArray[j]));
        }
    }
    //this.makeGenericCard();
}

Deck.prototype.shuffle = function() {
    this.shuffledDeck = this.perfectDeck.slice(0);
    var tempCard;               //Fisher-Yates algorithm for randomness
    for (var i = this.shuffledDeck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i+1));
        tempCard = this.shuffledDeck[i];
        this.shuffledDeck[i] = this.shuffledDeck[j];
        this.shuffledDeck[j] = tempCard;
    }
};

Deck.prototype.arrange = function(arrangement) {
    for (var i = 0; i < arrangement.length; i++) {
        for (var j = 0; j < this.perfectDeck.length; j++) {
            if (this.perfectDeck[j].number === arrangement[i].number && this.perfectDeck[j].suit === arrangement[i].suit) {
                this.shuffledDeck[i] = this.perfectDeck[j];
                break;
            }
        }
    }
};

Deck.prototype.dealTo = function(players, numCards) {
    if (typeof(players.length) == "undefined") {
        players = [players];
    }
    for (var i = 0; i < numCards; i++) {
        var thiscard = this.shuffledDeck.pop();
        for (var j = 0; j < players.length; j++) {
            players[j].cards.push(thiscard);
        }
    }
};

Deck.prototype.revealCard = function(theCard) {
    if (!theCard.geom.userData.hidden) {
        console.log("this card is already visible!");
        return;
    }

    // var parent = theCard.parent;
};

Deck.prototype.getCard = function(theCard, large, visible) {
    large = large || false;
    visible = visible || false;
    console.log(theCard, large, visible);

    //console.log(theCard, (theCard instanceof Card));

    var thisCard;
    if (theCard instanceof Card) {
        thisCard = theCard;
    } else {
        for (var i = 0; i < this.perfectDeck.length; i++) {
            if (this.perfectDeck[i].number === theCard.number && this.perfectDeck[i].suit === theCard.suit) {
                thisCard = this.perfectDeck[i];
                break;
            }
        }
    }

    if (!visible) {
        thisCard.geom = createHiddenCardGeom();
        thisCard.geom.position.set(0, tableOffset.y - cardTemplate.height/2 + 10, 0);
        thisCard.geom.rotation.set(Math.PI/2, 0, 0);
        thisCard.geom.scale.set(1, 1, 1);
    } else {
        createCardGeom(thisCard, large, true);
        thisCard.geom.userData.large = large;
        if (large) {
            thisCard.geom.scale.set(1.5, 1.5, 1);
            toggleVisible(thisCard.geom, true);
            thisCard.movementTween.rotation.copy(thisCard.geom.rotation);
            thisCard.movementTween.position.copy(thisCard.geom.position);
        } else {
            thisCard.geom.position.set(0, tableOffset.y - cardTemplate.height/2 + 10, 0);
            thisCard.geom.rotation.set(Math.PI/2, 0, 0);
            thisCard.geom.scale.set(1, 1, 1);
            toggleVisible(thisCard.geom, true);
        }
    }
    return thisCard;
};

/*deck.prototype.makeGenericCard = function(){
 var manager = new THREE.LoadingManager();
 var loader = new THREE.AltOBJMTLLoader(manager);
 var backFilename = "assets/Models/CardBack.obj";
 var frontFilename = "assets/Models/CardFront.obj";
 var cardTexImg = document.createElement('img');
 cardTexImg.src = "assets/Models/CardTexture.png";
 var cardMat = new THREE.MeshBasicMaterial({map:new THREE.Texture(cardTexImg)});
 var tempMat = new THREE.MeshBasicMaterial({color: "#FFFFFF"});
 var scope = this;
 loader.load(backFilename, function ( card ) {
 console.log('generic card loaded!', card);

 card.scale.set(300, 300, 300);
 for(var i=0; i<card.children.length; i++){
 var group = card.children[i];
 group.material = cardMat;

 }


 loader.load(frontFilename, function(cardfront){

 for(var i=0; i<cardfront.children.length; i++){
 var group = cardfront.children[i];
 group.material = tempMat;

 }
 card.userData.cardFace = cardfront.children[0];
 card.add(cardfront);
 //sim.scene.add(card);
 scope.genericCard = card;
 })


 } );

 }*/
