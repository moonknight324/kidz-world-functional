const values = document.getElementById("values");
const add = document.querySelectorAll(".btn");
var cartValue = parseInt(localStorage.getItem("count"))  || 0;
const addedItems = [];

add.forEach((addBtn, index) => {
    addBtn.addEventListener("click", () => {
        const bookIcon =  addBtn.closest(".book");
        const bookNameElement = bookIcon.querySelector(".name");
        const bookInfo = bookNameElement.textContent;

        if (addedItems[bookInfo]) {
            addedItems[bookInfo].quantity++;
        }
        else{
            addedItems[bookInfo] = {
                quantity: 1,
                price: parseFloat(bookIcon.querySelector(".price1").textContent)
            };
        }
        cartUpdate(bookInfo);
    });
});

function cartUpdate(bookInfo) {
    cartValue++;
    values.textContent = cartValue;
    localStorage.setItem("count", cartValue);
    localStorage.setItem("bookInfo", bookInfo);
}

function printAddedItems() {
    for(const value in addedItems) {
        const itemName = value;
        const quantity = addedItems[value].quantity;
        console.log(`Product Name: ${itemName}, Quantity: ${quantity}`);
    }
    const Amt = calculateTotalAmt();
    console.log(`The total amount is ${Amt.toFixed(2)}`);
}
function calculateTotalAmt() {
    let totalAmt = 0;
    for (const item of Object.values(addedItems)) {
        const { quantity, price } = item;
        totalAmt += quantity * price;
    }
    return totalAmt;
}
document.getElementById("cart").addEventListener("click",printAddedItems);
window.addEventListener("beforeunload",function() {
    localStorage.setItem("count", 0);
    cartValue = 0;
})