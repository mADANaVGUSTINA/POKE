const url = "https://pokeapi.co/api/v2/pokemon?limit=127";
let allPoke = [];
const main = document.querySelector('main');
const filtr = document.querySelector('form');
let sortPoke = [];  
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
    });console.log(allPoke)
}

function draw(pokemon){
    let getTypes = "";
    pokemon.types.forEach(type =>{
        getTypes += `
            <h4>${type.type.name}</h4>
        `
    })
    main.innerHTML += `
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
            <div id="heigthWeight">
                <p>Height ${pokemon.height}</p>
                <p>Weight ${pokemon.weight}</p>
            </div>
            <div id="Types">
                ${getTypes}
            </div>
        </div>
    `
    // console.log(getTypes);
}

filtr.addEventListener("submit",(event)=>{
    event.preventDefault();
    sortPoke = allPoke;

    if(event.target.name){
        sortPoke = sortPoke.filter(function (poke){
            return poke.name.indexOf(event.target.name.value.toLowerCase()) !== -1;
        });
    }
    if(event.target.minHp.value > 10){
        sortPoke = sortPoke.filter(function (poke){
            return poke.stats[0].base_stat >= event.target.minHp.value;
        });
    }
    if(event.target.maxHp.value < 250){
        sortPoke = sortPoke.filter(function (poke){
            return poke.stats[0].base_stat <= event.target.maxHp.value;
        });
    }
    if(event.target.minAtck.value > 5){
        sortPoke = sortPoke.filter(function (poke){
            return poke.stats[1].base_stat >= event.target.minAtck.value;
        });
    }
    if(event.target.maxAtck.value < 130){
        sortPoke = sortPoke.filter(function (poke){
            return poke.stats[1].base_stat <= event.target.maxAtck.value;
        });
    }
    if(event.target.minDif.value > 5){
        sortPoke = sortPoke.filter(function (poke){
            return poke.stats[2].base_stat >= event.target.minDif.value;
        });
    }
    if(event.target.maxDif.value < 180){
        sortPoke = sortPoke.filter(function (poke){
            return poke.stats[2].base_stat <= event.target.minDif.value;
        });
    }
    if(event.target.minSpd.value > 15){
        sortPoke = sortPoke.filter(function (poke){
            return poke.stats[5].base_stat >= event.target.minSpd.value;
        });
    }
    if(event.target.maxSpd.value < 150){
        sortPoke = sortPoke.filter(function (poke){
            return poke.stats[5].base_stat <= event.target.maxSpd.value;
        });
    }
    if(event.target.minH.value > 1){
        sortPoke = sortPoke.filter(function (poke){
            return poke.height >= event.target.minH.value;
        });
    }
    if(event.target.maxH.value < 89){
        sortPoke = sortPoke.filter(function (poke){
            return poke.height <= event.target.maxH.value;
        });
    }
    if(event.target.minW.value > 0){
        sortPoke = sortPoke.filter(function (poke){
            return poke.weight >= event.target.minH.value;
        });
    }
    if(event.target.maxW.value < 3001){
        sortPoke = sortPoke.filter(function (poke){
            return poke.weight <= event.target.maxH.value;
        });
    }
    event.target.type.forEach(function (filterType){
        // console.log(filterType);
        // console.log(filterType.value);
        if(!filterType.checked){
            sortPoke = sortPoke.filter(function (pokemon){
                for(i in pokemon.types){
                    if(pokemon.types[i].type.name === filterType.value) {
                        return false;
                    }
                }
                return true;
            })
        }
    });
    main.innerHTML = ``;
    sortPoke.forEach((poke)=>{
        draw(poke);console.log(sortPoke);
    })
})
console.log("mishaHyi");