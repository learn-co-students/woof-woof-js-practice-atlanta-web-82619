DOGS_URL = 'http://localhost:3000/pups'

fetch(DOGS_URL, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(r => r.json())
    .then(dogs => {
        dogs.forEach(dog => { 
            addDog(dog);
        })
    });

function addDog(dog) {
    const dogBar = document.querySelector('#dog-bar');

    let span = document.createElement('span')
    span.innerText = dog.name;
    span.dataset.id = dog.id;
    dogBar.appendChild(span);

    span.addEventListener('click', e => {
        let id = e.target.dataset.id;
        fetch(`${DOGS_URL}/${id}`)
            .then(r => r.json())
            .then(dog_json => {
                showDog(dog_json)
            }) 
        
    })

    function showDog(dog) {
        const dogInfo = document.querySelector('#dog-info');
        // clear dogInfo div
        dogInfo.querySelectorAll('*').forEach(node => {
            node.remove();
        })

        let img = document.createElement('img');
        img.src = dog.image;
        img.alt = 'dog image';

        let h2 = document.createElement('h2');
        h2.innerText = dog.name;

        let button = document.createElement('button');
        if (dog.isGoodDog) {
            button.innerText = 'Good Dog!';
        }
        else {
            button.innerText = 'Bad Dog!';
        }

        dogInfo.appendChild(img);
        dogInfo.appendChild(h2);
        dogInfo.appendChild(button);
    }
}