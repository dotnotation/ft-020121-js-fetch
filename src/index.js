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
            e.preventDefault()
            const form = e.target
            const nameInput = form.querySelector("#name-input")
            const spriteInput = form.querySelector("#sprite-input")
            
            // take values and send to our db to create a new pokemon
            fetch("http://localhost:3000/pokemon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
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
            .then(pokemon => {
                console.log("Created pokemon:", pokemon)
                pokemonContainer.innerHTML += renderPokemon(pokemon)
            })
            .catch(error => console.error(error))
        })
    }

    function updatePokemon(){
        pokemonContainer.addEventListener("submit", (e) => {
            e.preventDefault()
            console.log("EDITTING:", e.target)
            const id = e.target.parentElement.parentElement.dataset.id
            const nameInput = e.target.children[0]
            
            // const nameInput = e.target.querySelector('input')

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
                })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    // remove div from DOM
                    btn.parentElement.parentElement.remove()
                })
                .catch(err => console.error(err))
            }
        })
    }

})

