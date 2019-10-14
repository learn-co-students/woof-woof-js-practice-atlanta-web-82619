document.addEventListener("DOMContentLoaded", () => {

    const PUPS_URL = `http://localhost:3000/pups`

    const dogBar = document.getElementById("dog-bar")
    const dogInfo = document.querySelector('#dog-info')

    const filterBtn = document.getElementById('good-dog-filter')
    filterBtn.addEventListener('click', filterDogs)
    let allDogs

    function init(){
        fetch(PUPS_URL)
        .then(res => res.json())
        .then(dogs => {
            allDogs = dogs
            allDogs.forEach(renderPup)
        })
    }

    function renderPup(pup){
        const pupSpan = document.createElement('span')
        pupSpan.innerText = pup.name

        dogBar.appendChild(pupSpan)

        pupSpan.addEventListener('click', (e) => showInfo(e, pup))
    }

    function showInfo(e, pup){
        e.preventDefault()
        dogInfo.innerHTML = ''

        const pupImg = document.createElement('img')
        pupImg.src = pup.image

        const pupH2 = document.createElement('h2')
        pupH2.innerText = pup.name

        const pupBtn = document.createElement('button')
        pupBtn.dataset.id = pup.id

        if(pup.isGoodDog){
            pupBtn.innerText = 'Good Dog!'
        } else {
            pupBtn.innerText = 'Bad Dog!'
        }

        pupBtn.addEventListener('click', goodDog)

        dogInfo.append(pupImg, pupH2, pupBtn)
    }

    function goodDog(e){
        e.preventDefault()

        let status

        if(e.target.innerText === 'Good Dog!'){
            e.target.innerText = 'Bad Dog!'
            status = false
        } else {
            e.target.innerText = 'Good Dog!'
            status = true
        }
        
        fetch(`${PUPS_URL}/${e.target.dataset.id}`, {
            method: 'PATCH', 
            headers: {
               'Content-type': 'application/json', 
               'Accept': 'application/json' 
            }, 
            body: JSON.stringify({
                isGoodDog: status
            })
        })
    }

    function filterDogs(e){
        e.preventDefault()

        dogBar.innerHTML = ""

        if(e.target.innerText === `Filter good dogs: OFF`){
            e.target.innerText = `Filter good dogs: ON`
            let filteredDogs = allDogs.filter(dog => dog.isGoodDog)
            
            filteredDogs.forEach(renderPup)
        } else {
            e.target.innerText = `Filter good dogs: OFF`
            
            allDogs.forEach(renderPup)
        }
    }

    init()
})
