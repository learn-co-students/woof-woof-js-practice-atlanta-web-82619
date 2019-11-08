const mainUrl = "http://localhost:3000/"

const filterDog = document.querySelector("#filter-div")
const filterButton = document.querySelector("#good-dog-filter")
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const dogSummary = document.querySelector("#dog-summary-container")

function getDogs() {
    fetch(mainUrl + "pups")
    .then(response => response.json())
    .then(dogs => {

        listDogs(dogs)

        filterButton.addEventListener("click", (e) => {
            if (filterButton.innerText = "Filter good dogs: OFF") {
                filterButton.innerText = "Filter good dogs: ON"
                listDogs(dogs.filter(dog => dog.isGoodDog))
            }
            else {
                filterButton.innerText = "Filter good dogs: OFF"
                listDogs(dogs)
            }
        })
    })
}

function listDogs(dogs) {
    clearNode(dogBar)
    
    dogs.map( dog => {
        const span = document.createElement("span")
        span.textContent = dog.name
        span.addEventListener("mouseover", (e) => {
            displayDog(dog)
        })
        dogBar.appendChild(span)
    })
}

function displayDog(dog) {
    clearNode(dogInfo)
    const dogImg = document.createElement("img")
    dogImg.src = dog.image

    const dogH2 = document.createElement("h2")
    dogH2.innerText = dog.name

    const dogButton = document.createElement("button")
    if (dog.isGoodDog)
        dogButton.innerText = "Good Dog!"
    else
        dogButton.innerText = "Bad Dog!"

    dogButton.addEventListener("click", (e) => {
        toggleDogStatus(dog)
    })
    dogInfo.appendChild(dogImg)
    dogInfo.appendChild(dogH2)
    dogInfo.appendChild(dogButton)
}

function toggleDogStatus(dog) {
    dog.isGoodDog = !dog.isGoodDog
    fetch(mainUrl + `pups/${dog.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify( dog )
    }) 
    .then(response => response.json())
    .then(dog => displayDog(dog))
}

function clearNode(node) {
    while(node.firstChild) {
        node.removeChild(node.firstChild)
    }
}



getDogs()