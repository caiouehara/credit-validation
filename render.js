let elementCardBanner = document.querySelector("#cardBanner");


function init() {
    createCardBannerBox()
}

function createCardBannerBox() {
    cardController.options.map((cv) => elementCardBanner.innerHTML += `<option value="${cv}">${cv}</option>`)
}

function myFunction(e){
    let [name, ids] = cardController.get(elementCardBanner.value);
    console.log(name, ids)
}

init()