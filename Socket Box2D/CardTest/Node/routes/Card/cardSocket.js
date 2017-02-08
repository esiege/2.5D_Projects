exports.drawCardsEvent = function(room) {
    if (room.users[0].cards.length < 10) {
        room.users[0].cards.push({
            id: room.cardIdCounter++,
            cardId: parseInt(Math.random() * 10 + 1)
        });
    }
    if (room.users[1].cards.length < 10) {
        room.users[1].cards.push({
            id: room.cardIdCounter++,
            cardId: parseInt(Math.random() * 10 + 1)
        });
    }
};