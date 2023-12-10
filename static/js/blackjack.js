const NUM_DECKS = 6;
const DEALER_DELAY = 1200;
const ranks = "ace one two three four five six seven eight nine ten jack queen king".split(
    " "
);
const suits = "clubs spades hearts diamonds".split(" ");
const da = document.getElementById("dealerhand");
const pa = document.getElementById("playarea");
var money = 100,
    player_hand,
    dealer_hand,
    deck = [],
    state = 0;

start();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function makeDeck() {
    deck = [];
    for (let i of Array(NUM_DECKS)) {
        for (let r = 1; r < 14; r++) {
            for (let s = 0; s < 4; s++) {
                deck.push([r, s]);
            }
        }
    }
    shuffleArray(deck);
    console.log("New deck", deck);
}

function start() {
    if (deck.length < (52 * NUM_DECKS) / 2) {
        makeDeck();
    }
    player_hand = deck.splice(-2);
    dealer_hand = deck.splice(-2);
    update();
}

function update(delay) {
    if (delay > 0) {
        window.setTimeout(update, delay);
        return;
    }
    if (state === 0) {
        da.innerHTML = "";
        drawCard([14, 0], da);
        for (let c of dealer_hand.slice(1)) {
            drawCard(c, da);
        }
    }
    if (state >= 2) {
        da.innerHTML = "";
        for (let c of dealer_hand) {
            drawCard(c, da);
        }
    }
    if (state < 4) {
        pa.innerHTML = "";
        for (let c of player_hand) {
            drawCard(c, pa);
        }
    }

    drawScores();

    var hit, stand, again;
    if (state <= 1) {
        state = 1;
        console.log("state", state);
        let score = getScore(player_hand)[0];
        console.log("score", score);
        if (score < 21) {
            drawText("Hit or Stand?");
            hit = drawButton("Hit");
            stand = drawButton("Stand");
        } else if (score > 21) {
            drawText("You lose :((");
            money -= 10;
            state = 4;
            update();
        } else if (score === "BLACKJACK") {
            state = 2;
            update();
        } else if (score === 21) {
            drawText("You have 21!");
            state = 2;
            update();
        }
    } else if (state === 2) {
        let ps = getScore(player_hand)[0];
        let [ds, isSoft] = getScore(dealer_hand);

        if (ps === "BLACKJACK") {
            if (ds === "BLACKJACK") {
                drawText("Push.");
            } else {
                drawText("BLACKJACK!!");
                money += 15;
            }
            state = 4;
            update();
        } else if (ds < 17 || (ds < 18 && isSoft)) {
            dealer_hand.push(deck.pop());
            update(DEALER_DELAY);
        } else {
            if (ds < 22) {
                if (ds === ps) {
                    drawText("Push!");
                } else if (ds > ps) {
                    drawText("You Lose :((");
                    money -= 10;
                } else {
                    drawText("You Win!!");
                    money += 10;
                }
            } else if (ds === "BLACKJACK") {
                drawText("You Lose :((");
                money -= 10;
            } else {
                drawText("You Win!!");
                money += 10;
            }
            state = 4;
            update();
        }
    } else if (state === 4) {
        again = drawButton("Play Again");
        again?.addEventListener("click", (evt) => {
            state = 0;
            start();
        });
    }

    hit?.addEventListener("click", (evt) => {
        player_hand.push(deck.pop());
        update();
    });
    stand?.addEventListener("click", (evt) => {
        state = 2;
        update();
    });
}

function getScore(h) {
    let softscore = 0,
        soft = false,
        sorted = h.slice().sort().reverse();
    for (let c of sorted) {
        if (c[0] === 1 && softscore + 11 < 22) {
            softscore += 11;
            soft = true;
        } else {
            softscore += Math.min(c[0], 10);
        }
    }
    if (h.length === 2 && softscore === 21) {
        return ["BLACKJACK", true];
    } else {
        return [softscore, soft];
    }
}

function drawText(t) {
    console.log("text", t);
    let d = document.createElement("div");
    d.textContent = t;
    pa.appendChild(d);
    return d;
}

function drawButton(t) {
    console.log("button", t);
    let b = document.createElement("button");
    b.textContent = t;
    pa.appendChild(b);
    return b;
}

function drawCard(card, area) {
    let [x, y] = [(card[0] - 1) * 72, card[1] * 96];
    let img = document.createElement("img");
    img.src = "https://i.imgur.com/8iP7D11.png";
    img.title = img.alt = `${ranks[card[0]]} of ${suits[card[1]]}`;
    img.classList.add("card");
    img.style.objectPosition = `${-1 * x}px ${-1 * y}px`;
    area.appendChild(img);
}
function drawScores() {
    let ps = document.getElementById("playerscore");
    ps.textContent = getScore(player_hand)[0];
    let ds = document.getElementById("dealerscore");
    if (state > 1) {
        ds.textContent = getScore(dealer_hand)[0];
    } else {
        ds.textContent = "";
    }
    let m = document.getElementById("money");
    m.textContent = money;
}