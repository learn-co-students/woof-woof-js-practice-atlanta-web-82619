const pupsURL = "http://localhost:3000/pups";
const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info")
const filterBtn = document.querySelector("#good-dog-filter")
filterBtn.addEventListener("click", filterDogs)
let allDogs

fetchDogs()

function fetchDogs() {
    fetch(pupsURL)
    .then(resp => resp.json())
    .then(dogs => {
        allDogs = dogs
        dogs.forEach(renderPup)
    })
}

function renderPup(dog) {
    let span = document.createElement("span")
    span.innerText = dog.name
    dogBar.appendChild(span)
    span.addEventListener("click", (event) => showDogInfo(event, dog))
}

function filterDogs(e) {
    e.preventDefault()
    dogBar.innerHTML = ""
    if(e.target.innerText === "Filter good dogs: OFF") {
        e.target.innerText = "Filter good dogs: ON"
        let goodDogs = allDogs.filter(dog => dog.isGoodDog) 
        goodDogs.forEach(renderPup)
    } else {
        e.target.innerText = "Filter good dogs: OFF"
        allDogs.forEach(renderPup)
    }
}

function showDogInfo(event, dog) {
    event.preventDefault()
    dogInfo.innerHTML = ""
    let img = document.createElement("img")
    let h2 = document.createElement("h2")
    let btn = document.createElement("button")
    btn.dataset.id = dog.id
    img.src = dog.image
    h2.innerText = dog.name
    if(dog.isGoodDog){
        btn.innerText = "Good Dog!"
    } else {
        btn.innerText = "Bad Dog"
    }
    dogInfo.append(h2, img, btn)
    btn.addEventListener("click", goodBad)
}

function goodBad(e) {
    let status
    let id = e.target.dataset.id
    e.preventDefault();
    if(e.target.innerText === "Good Dog!") {
        e.target.innerText = "Bad Dog!"
        status = false
    } else {
        e.target.innerText = "Good Dog!"
        status = true
    }
    fetch(`${pupsURL}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({isGoodDog: status})
    })   
}


