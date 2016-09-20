function Deck(cards) {
    this.cards = cards || Card.orderedDeck;
}

Deck.prototype.shuffle = function() {
    this.cards = _.shuffle(Card.orderedDeck);
};

Deck.prototype.arrange = function(arrangement) {
    for (var i = 0; i < arrangement.length; i++) {
        for (var j = 0; j < Card.orderedDeck.length; j++) {
            if (Card.orderedDeck[j].number === arrangement[i].number && Card.orderedDeck[j].suit === arrangement[i].suit) {
                this.cards[i] = Card.orderedDeck[j];
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
        var thiscard = this.cards.pop();
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
        for (var i = 0; i < Card.orderedDeck.length; i++) {
            if (Card.orderedDeck[i].number === theCard.number && Card.orderedDeck[i].suit === theCard.suit) {
                thisCard = Card.orderedDeck[i];
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
