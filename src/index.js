const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');
let allDogs;
const filterBtn = document.querySelector('#good-dog-filter');
filterBtn.addEventListener('click', function(e) {
  if (e.target.innerText === 'Filter good dogs: OFF') {
    // change button text
    filterBtn.innerText = 'Filter good dogs: ON';
    // filter out good dogs
    let goodDogs = allDogs.filter(dog => dog.isGoodDog === true);
    // clear out dog bar
    dogBar.innerHTML = "";
    // add each good dog to dog bar
    goodDogs.forEach(function(dog) {
      dogBar.append(createSpan(dog))
    })
  } else {
    // change button text
    filterBtn.innerText = 'Filter good dogs: OFF';
    // clear out dog bar
    dogBar.innerHTML = "";
    // add each dog to dog bar
    allDogs.forEach(function(dog) {
      dogBar.append(createSpan(dog))
    })
  }
})
const dogUrl = 'http://localhost:3000/pups';

function getDogs() {
  return fetch(dogUrl)
  .then(resp => resp.json())
  .then(function(dogs) {
    allDogs = dogs;
    dogs.forEach(function(dog) {
      dogBar.append(createSpan(dog))

    })
  })
}

function createSpan(dog) {
  // console.log(dog);
  const span = document.createElement('span');
  span.innerText = dog.name;
  
  span.addEventListener('click', function() {
    dogInfo.innerHTML = ""; // clear out div
    const dogImg = document.createElement('img');
    dogImg.setAttribute('src', dog.image);

    const dogName = document.createElement('h2');
    dogName.innerText = dog.name;

    const dogBtn = document.createElement('button');
    if (dog.isGoodDog) {
      dogBtn.innerText = "Good Dog!"
    } else {
      dogBtn.innerText = "Bad Dog!"
    }

    dogBtn.addEventListener('click', function(e) {
      if (e.target.innerText === "Good Dog!") {
        dogBtn.innerText = "Bad Dog!";
        fetch(`${dogUrl}/${dog.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            isGoodDog: false
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(json => console.log(json))
      } else {
        dogBtn.innerText = "Good Dog!";
        fetch(`${dogUrl}/${dog.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            isGoodDog: true
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(json => console.log(json))
      }

    })
    dogInfo.append(dogImg, dogName, dogBtn);

  })
  return span;
}



getDogs();