let selectionTags = document.querySelectorAll("select");
let fromImage = document.querySelector(".from-img");
let toImage = document.querySelector(".to-img");
let btn = document.querySelector(".btn");
let from = document.querySelector("#from");
let to = document.querySelector("#to");
let displayResult = document.querySelector(".reult-display");

for(let select of selectionTags) {

    for(let countryCode in countryList) {
        let opt = document.createElement("option");
        opt.innerText = countryCode;
        opt.value = countryCode;
        select.append(opt);
        if(select.getAttribute("id") === "from" && countryCode === "USD") {
            opt.selected = select;
            fromImage.src = `https://flagsapi.com/US/flat/64.png`;
        }
        else if(select.getAttribute("id") === "to" && countryCode === "PKR") {
            opt.selected = select;
            toImage.src = `https://flagsapi.com/PK/flat/64.png`;
        }
    }
}


for(let select of selectionTags) {
    select.addEventListener("change" , (event) => {//with the change event , the returned "event" is an object that carry alot of value pairs and among of them an entity name target which contains the all information about the specific element(which is option element in this situation) 
        let selectElementId = select.getAttribute("id");
         changeImage(event.target , selectElementId);
    });
}

const changeImage = (changedElement , parentSelectElementId) => {

    let code = changedElement.value; //we can get value directly without using getAttribute() function
    if(parentSelectElementId === "to") {
        toImage.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`;
    }
    else {
        fromImage.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`;
    }
}


const calculateAmount = async (amount , url)=> {
    let promise = await fetch(url);
    let jsonConversion = await promise.json();//jsonConversion is an object from which we have to print the rate we can check out the object by using console.log(jsonConversion);
    let rate = jsonConversion[to.value.toLowerCase()];
    let result = rate * amount;
    console.log(result);
    displayResult.innerText = `${amount} ${from.value.toLowerCase()} = ${result} ${to.value.toLowerCase()}`;
}

btn.addEventListener("click" , ()=> {
    let inputBox = document.querySelector("input");
    let amount = inputBox.value;
    const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    calculateAmount(amount,url);
});