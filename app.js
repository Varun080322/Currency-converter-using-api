let Base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
let btn = document.querySelector("button")
let dropdown = document.querySelectorAll(".dropdown select")


const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("#show");

for (select of dropdown){
    for (code in countryList){
        let newOpt = document.createElement('option')
        newOpt.value = code
        newOpt.innerText = code
        if (select.name ==="from" && code ==="USD"){
            newOpt.selected = true
        }
        else if (select.name ==="to" && code ==="INR"){
            newOpt.selected = true
        }
        select.append(newOpt);
    }
    select.addEventListener("change",(e)=>{
        updateflag(e.target)
    })
}
const updateflag = (element)=>{
    let currentCode = countryList[element.value]
    let newsrc = `https://flagsapi.com/${currentCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newsrc
}

let updateRate = async ()=>{
    let amount = document.querySelector(".amount #value")
    let amtVal = amount.value
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    let crrurl = `${Base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(crrurl)
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()]

    let finalamount = amtVal * rate
    msg.value = finalamount;

}
btn.addEventListener("click",(e)=>{
    e.preventDefault()
    updateRate()
})
window.addEventListener("load",()=>{
    updateRate()
})