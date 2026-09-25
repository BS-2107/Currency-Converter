const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");


for(let select of dropdowns){
    for(let currcode in countryList){
        let newoption = document.createElement("option");
        newoption.value = currcode;
        newoption.textContent = currcode;
        if(select.name === "From" && currcode === "USD"){
            newoption.selected = "selected";
        }
        else if(select.name === "To" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", e=>{
        updateflag(e.target);
    });
}

const updateflag = (element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newsrc;
}