const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newoption = document.createElement("option");

        newoption.value = currcode;
        newoption.textContent = currcode;

        if (select.name === "From" && currcode === "USD") {
            newoption.selected = "selected";
        } 
        else if (select.name === "To" && currcode === "INR") {
            newoption.selected = "selected";
        }

        select.append(newoption);
    }

    select.addEventListener("change", (e) => {
        updateflag(e.target);
    });
}

const updatexchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;

    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalamt = amtvalue * rate;

    msg.innerText = `${amtvalue} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
};

const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];

    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click", async (e) => {
    e.preventDefault();

    await updatexchangeRate();
});

window.addEventListener("load", () => {
    updatexchangeRate();
});