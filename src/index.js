document.addEventListener("DOMContentLoaded", () => {
    const pokemonContainer = document.getElementById("pokemon-container")
    const createForm = document.getElementById("pokemon-post-form")

    fetchPokemon();
    console.log('c')
    createPokemon();
    updatePokemon();
    deletePokemon();

    // function fetchPokemon(){
    //     // fetch all pokemon from json db
    // console.log("a")
    //     const promise = fetch("http://localhost:3000/pokemon")
    //     .then(function(response){
    //         console.log("My response is: ", response)
    //         return response.json()
    //     })
    //     .then(function(pokemonArray){
    //         console.log("b")
    //         console.log("My data is:", pokemonArray)
    //         pokemonContainer.innerHTML = renderAllPokemon(pokemonArray)
    //     })
    // } 

        async function fetchPokemon(){
        // fetch all pokemon from json db
        console.log("a")
        const response = await fetch("http://localhost:3000/pokemon")
        const data = await response.json()
        pokemonContainer.innerHTML = renderAllPokemon(data)
        console.log('b')

        // .then(function(response){
        //     console.log("My response is: ", response)
        //     return response.json()
        // })
        // .then(function(pokemonArray){
        //     console.log("My data is:", pokemonArray)
        //     pokemonContainer.innerHTML = renderAllPokemon(pokemonArray)
        // })
    } 
    
    function createPokemon(){
        createForm.addEventListener("submit", function(e){
            // grabbing our form and adding an event listener to the submit function which we then want to call a function on to ...
            // take our event of submit and prevent the default of reloading the page
            e.preventDefault()
            const form = e.target
            // grabbing the target of our event 
            const nameInput = form.querySelector("#name-input")
            // grabbing the name input so we can grab the information submitted and push it to the back end
            const spriteInput = form.querySelector("#sprite-input")
            
            // take values and send to our db to create a new pokemon
            fetch("http://localhost:3000/pokemon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                    // just says that we are getting and submitting json to the db
                },
                body: JSON.stringify({
                    // taking the target information and putting it in the db
                    name: nameInput.value,
                    sprites: {
                        front: spriteInput.value
                    }
                })
            })
            // .then(resp => {
            //     return resp.json()
            // })
            .then(resp => resp.json())
            // now that things are taken care on the backend we want to push that to the front end
            .then(pokemon => {
                console.log("Created pokemon:", pokemon)
                pokemonContainer.innerHTML += renderPokemon(pokemon)
            })
            .catch(error => console.error(error))
        })
    }

    function updatePokemon(){
        pokemonContainer.addEventListener("submit", (e) => {
            // there is only one submit button in the pokemon container which makes this easy
            e.preventDefault()
            console.log("EDITTING:", e.target)
            const id = e.target.parentElement.parentElement.dataset.id
            const nameInput = e.target.children[0]
            
            // const nameInput = e.target.querySelector('input') also works

            // update pokemon in db
            fetch(`http://localhost:3000/pokemon/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: nameInput.value
                })
            })
            .then(resp => resp.json())
            .then(pokemon => {
                console.log("Updated successfully!", pokemon)
                const heading = e.target.parentElement.querySelector('h1')
                heading.innerText = pokemon.name
            })
            .catch(err => console.error(err))
            // myFunction(e)
        })
    }

    // function myFunction(e){
    //     console.log("IS the event still there?", e)
    // }

    function deletePokemon(){
        pokemonContainer.addEventListener("click", (e) => {
            const btn = e.target
            console.log("click")
            // console.log(e.target)
            if (btn.dataset.action === "delete"){
                const id = btn.parentElement.parentElement.dataset.id

                fetch(`http://localhost:3000/pokemon/${id}`, {
                    method: "DELETE"
                    // remove from backend
                })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    // remove div from DOM or remove from front end
                    btn.parentElement.parentElement.remove()
                })
                .catch(err => console.error(err))
            }
        })
    }

})

