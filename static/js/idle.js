var count = parseInt(localStorage.getItem("count")) || 0;
var displayCount = document.getElementById("displayCount");
function updateCountDisplay() {
    displayCount.textContent = count;
}
var countButton = document.getElementById("countButton");
countButton.addEventListener("click", function () {
    count++;
    localStorage.setItem("count", count.toString());
    updateCountDisplay();
});

var p = document.getElementById("p");

var resetbutton = document.getElementById("resetButton");
resetButton.addEventListener("click", function () {
    count = 0;
    localStorage.setItem("count", "0");
    updateCountDisplay();
});

var slotsButton = document.getElementById("slotsButton")
var blackjackButton = document.getElementById("blackjackButton")
var rouletteButton = document.getElementById("rouletteButton")
var upgrade1 = parseInt(localStorage.getItem("upgrade1")) || 0;
var upgrade2 = parseInt(localStorage.getItem("upgrade2")) || 0;
var upgrade3 = parseInt(localStorage.getItem("upgrade3")) || 0;

setInterval(function () {
    // Update count based on upgrades
    count += upgrade1 * 1 + upgrade2 * 10 + upgrade3 * 1000;
    localStorage.setItem("count", count.toString());
    updateCountDisplay();
}, 1000);

slotsButton.addEventListener("click", function () {
    if (count >= 10) {
        upgrade1++;
        count -= 10;
        localStorage.setItem("upgrade1", upgrade1.toString());
        localStorage.setItem("count", count.toString());
        updateCountDisplay();
    }
});

blackjackButton.addEventListener("click", function () {
    if (count >= 1300) {
        upgrade2++;
        count -= 1300;
        localStorage.setItem("upgrade2", upgrade2.toString());
        localStorage.setItem("count", count.toString());
        updateCountDisplay();
    }
});

rouletteButton.addEventListener("click", function () {
    if (count >= 10000) {
        upgrade3++;
        count -= 10000;
        localStorage.setItem("upgrade3", upgrade3.toString());
        localStorage.setItem("count", count.toString());
        updateCountDisplay();
    }
});
updateCountDisplay();