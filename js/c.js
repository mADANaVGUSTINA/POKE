const url = "https://pokeapi.co/api/v2/pokemon?limit=127";
let allPoke = [];
const main = document.querySelector('main');
const form = document.querySelector('form');
let order = true;
let object = "id";
let promises = [];  
const xr = new XMLHttpRequest();
xr.open("GET", url);
xr.send();
xr.onload = function(){
    const pokes = JSON.parse(xr.response).results;
    pokes.forEach(pokemon => {
        let prom = new Promise(function(resolve, reject){
            let pxr = new XMLHttpRequest();
            pxr.open('GET', pokemon.url);
            pxr.send();
            pxr.onload = function(){
                if(pxr.status === 200){
                    resolve(JSON.parse(pxr.response));
                }
                else{
                    reject(pxr.statusText);
                }
            }
            pxr.onerror = function(){
                reject(pxr.statusText);
            }
        });
        prom.then((pokemon)=>{
            allPoke.push(pokemon);
            draw(pokemon);
        })
    promises.push(prom);
    });console.log(allPoke);
    Promise.all(promises).then(()=>{
        sort();
    }) 
}


function draw(pokemon){
    main.innerHTML +=`
    <div id="pokemontik">
        <p>${pokemon.id}</p>
        <h3>${pokemon.name}</h3>
        <img src ="${pokemon.sprites.front_default}" alt="">
        <div id ="stats">
            <p clas =hp">&#10084;${pokemon.stats[0].base_stat}</p>
            <p clas ="attack">&#9876;${pokemon.stats[1].base_stat}</p>
            <i clas ="shield" class ="fa fa-shield">${pokemon.stats[2].base_stat}</i>
            <p clas ="speed">&#10174;${pokemon.stats[5].base_stat}</p>
        </div>
    </div>
    `
}
form.addEventListener("change",(event)=>{
    let val = event.target.value;
    switch(val){
        case "id":
            object = "id";
            break;
        case "hp":
            object = "hp";
            break;
        case "attack":
            object = "attack";
            break;
        case "shield":
            object = "shield";
            break;
        case "speed":
            object = "speed";
            break;
        case "downToUp":
            order = true;
            break;
        case "upToDown":
            order = false;
            break;
    }
    sort();
})
function sort(){
    main.innerHTML = ``;
    switch(object){
        case "id":
            allPoke = allPoke.sort(function(first, second){
                if (first.id > second.id) {
                    return order;
                }
                if (first.id < second.id) {
                    return -order;
                }
            });
        break;
        case "hp":
            allPoke = allPoke.sort(function(first, second){
                if(first.stats[0].base_stat > second.stats[0].base_stat){
                    return order
                }
                if(first.stats[0].base_stat < second.stats[0].base_stat){
                    return -order
                }
            });
        break;
        case "attack":
            allPoke = allPoke.sort(function(first, second){
                if(first.stats[1].base_stat > second.stats[1].base_stat){
                    return order
                }
                if(first.stats[1].base_stat < second.stats[1].base_stat){
                    return -order
                }
            });
        break;
        case "shield":
            allPoke = allPoke.sort(function(first, second){
                if(first.stats[2].base_stat > second.stats[2].base_stat){
                    return order
                }
                if(first.stats[2].base_stat < second.stats[2].base_stat){
                    return -order
                }
            });
        break;
        case "speed":
            allPoke = allPoke.sort(function(first, second){
                if(first.stats[5].base_stat > second.stats[5].base_stat){
                    return order
                }
                if(first.stats[5].base_stat < second.stats[5].base_stat){
                    return -order
                }
            });
        break;
    }
    if(!order){
        allPoke.reverse();
    }
    allPoke.forEach((pokemon)=>{
        draw(pokemon);
    });
}