'use strict';

app.service('handService', function (card_body, cardService, canvasService) {

    //dummy body used for joint inits
    var m;
    canvasService.ready(function (c) {
        m = new Body({ canvas: c });
    });

    var currentHand = {
        cards: [],
        nextPosition: 100
    };

    var cardsPendingInsert = [];
    var getCardPendingInsert = function (id) {
        for (var i = 0; i < cardsPendingInsert.length; i++) {
            if (cardsPendingInsert[i] === id)
                return true;
        }
        return false;
    }

    var getCardById = function (id) {
        for (var i = 0; i < currentHand.cards.length; i++) {
            if (currentHand.cards[i].id == id)
                return currentHand.cards[i];
        }
    }
    var updateHand = function (handArray, callback) {

        if (!handArray && currentHand.cards.length == 0)
            return;

        currentHand.nextPosition = 70;

        var insertOrUpdate = function (cnt, handArray, serverValues) {

            if (cnt >= handArray.length)
                return;

            if (handArray[cnt].used) {
                handArray.splice(cnt, 1);
                insertOrUpdate(cnt, handArray, serverValues);
                return;
            }

            var existingCard = getCardById(handArray[cnt].id);
            if (existingCard) {
                if (!existingCard.activeCard) {
                    existingCard.body.details.x = currentHand.nextPosition;
                    //console.log("Pos: " + cnt + "    Id: " + handArray[cnt].id + "  X: " + currentHand.nextPosition);
                    currentHand.nextPosition += 90;

                }
            }
            else if (serverValues && !getCardPendingInsert(handArray[cnt].id)) {
                //console.log(cardsPendingInsert);
                cardsPendingInsert.push(handArray[cnt].id);
                addCard({ id: handArray[cnt].id }, function (cardId) {
                    for (var i = 0; i < cardsPendingInsert.length; i++) {
                        if (cardsPendingInsert[i] == cardId)
                            cardsPendingInsert.splice(i, 1);
                    }
                    if (update === handArray.length)
                        callback();
                });
            }

            insertOrUpdate(cnt + 1, handArray, serverValues);
        }

        if (!handArray) {
            handArray = currentHand.cards;
            insertOrUpdate(0, handArray, false);
        }
        else
            insertOrUpdate(0, handArray, true);




        if (callback)
            callback(handArray);
    }
    var addCard = function (details, callback) {
        canvasService.ready(function (c) {
            var newCard = card_body.init({
                x: 900,
                y: 70,
                width: 80,
                height: 80,
                color: 'rgb(' + ((details.id * 100) % 255) + ", " + ((details.id * 300) % 255) + ", " + ((details.id * 500) % 255) + ")",
                image: "images/card/card.png",
                scale: 0.15,
                flipX: true,
                name: 'b_card' + details.id,
                id: details.id,
                canvas: c,
                isSensor: true,
                groupIndex: -1,
                stepFunction: function (body) {
                    var pos = body.getPos();
                    var force = { x: -(pos.x - body.details.x), y: -(pos.y - body.details.y) };
                    var posDif = { x: Math.abs(force.x), y: Math.abs(force.y) };

                    if (posDif.x > 1 || posDif.y > 1) {
                        body.setForce({ x: force.x / 6, y: force.y / 6 });
                    }
                    else {
                        body.setForce({ x: 0, y: 0 });
                    }
                },
                clickFunction: [
                    function (b) {
                        cardService.setActiveCard(b);
                        b.body.details.mouseJoint = new Joint(m, b, { type: "mouse" });
                        b.body.details.activeCard = true;
                        updateHand();
                    }
                ],
                releaseFunction: [
                    function (b, outOfBounds) {
                        if (outOfBounds || !b.body.details.b_activeTile) {
                            cardService.setActiveCard(null);
                            b.body.details.activeCard = false;
                            updateHand();
                        } else if (cardService.getActiveCard()) {
                            cardService.useCard({ placementTilePosition: b.b_activeTile.position }, b.id, function (status) {

                                if (!status.error) {
                                    var cardBody = getCardById(status.cardId);
                                    cardBody.body.details.b_activeTile = null;
                                    cardBody.body.details.activeCard = false;
                                    cardBody.body.details.used = true;
                                    cardBody.body.destroy();
                                }
                                else {
                                    var cardBody = getCardById(status.cardId);
                                    cardBody.body.details.activeCard = false;
                                    cardBody.body.details.b_activeTile = null;

                                    updateHand();
                                }
                            });
                        }
                    }
                ],
                cardPlayed: function () {
                }
            });
            newCard.body.details.x = currentHand.nextPosition;
            currentHand.cards.push(newCard);
            currentHand.nextPosition += 90;
            callback(newCard.body.details.id);


        });
    }
    return {
        m: m,
        updateHand: updateHand,
        addCard: addCard
    }



});
