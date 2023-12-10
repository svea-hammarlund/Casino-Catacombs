
document.addEventListener("DOMContentLoaded", function () {
  // Sample items with placeholder image URLs
    const savedScore = parseInt(localStorage.getItem("score")) || 0;
    updateScoreDisplay(savedScore);
    const shopItems = [
        { name: "Extra Life", price: 50, image: "https://via.placeholder.com/150" },
        { name: "Power-up", price: 30, image: "https://via.placeholder.com/150" },
        { name: "Custom Skin", price: 100, image: "https://via.placeholder.com/150" },
        { name: "Lucky Charm", price: 75, image: "https://via.placeholder.com/150" } // New item for increased odds
  ];


    let hasLuckyCharm = false;
    
const conversionRate = 1;
    
    
  const scoreDisplay = document.getElementById("score");
  const itemsContainer = document.getElementById("items-container");

  // Render shop items
  shopItems.forEach(item => {
    const shopItemDiv = document.createElement("div");
    shopItemDiv.classList.add("shop-item");

    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    itemImage.alt = item.name;
    shopItemDiv.appendChild(itemImage);

    const itemName = document.createElement("p");
    itemName.textContent = item.name;
    shopItemDiv.appendChild(itemName);

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `${item.price} Gems`;
    shopItemDiv.appendChild(itemPrice);

    const buyButton = document.createElement("button");
    buyButton.textContent = "Buy";
    buyButton.addEventListener("click", function () {
          // Retrieve the latest score when the buy button is clicked
        const savedScore = parseInt(localStorage.getItem("score")) || 0;
        if (savedScore >= item.price) {
            const newScore = savedScore - item.price;
            localStorage.setItem("score", newScore); // Update local storage
            updateScoreDisplay(newScore); // Update score display in the shop
            alert(`You bought ${item.name} for ${item.price} Gems!`);
            applyItemEffect(item);
        } else {
            alert("Not enough Gems!");
        }
    });
    shopItemDiv.appendChild(buyButton);

    itemsContainer.appendChild(shopItemDiv);
  });


  // Function to apply the effect of the purchased item in the slots game
  function applyItemEffect(item) {
    if (item.name === "Lucky Charm") {
      // Add logic to increase the odds of winning in the slots game
      alert("Lucky Charm activated! Your odds of winning in the slots game have increased.");
    }
}
    function updateScoreDisplay(score) {
        const scoreDisplay = document.getElementById("score");
        scoreDisplay.textContent = score;
      }
    // Add similar logic for other items if needed

});
