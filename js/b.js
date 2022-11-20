let url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
const select = document.querySelector('select');
const list = document.querySelector('ul');
const chosPoke = document.getElementById('chosPoke');
const buttons = document.getElementById('buttons');
const numb = document.querySelectorAll('.numbers button');
let limit = 10;
let offset = 0;
let pokeArray = [];
let order = true;
makeList(url);
select.addEventListener("change",(event)=>{
    limit = Number(event.target.value);
    url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    list.innerHTML = '';
    pokeArray.length = 0;
    makeList(url);
});

function makeList(url){
    let xr = new XMLHttpRequest();
    xr.open('GET', url);
    xr.send();
    xr.onload = function(){
        buttons.style.display = "flex";
        let pokeList = JSON.parse(xr.response).results;
        pokeList.forEach(pokemon => {
            let pxr = new XMLHttpRequest();
            pxr.open('GET', pokemon.url);
            pxr.send();
            pxr.responseType = 'json';
            pxr.onload = function(){
                let poke2 = pxr.response;
                pokeArray.push(poke2);
            }
        }); 
        setTimeout(() => {
        pokeArray.sort(function (first, second) {
            if (first.id > second.id) {
                return order;
            }
            if (first.id < second.id) {
                return -order;
            }
        });
        pokeArray.forEach(pokemon =>{
            show(pokemon);
        });
        }, 200);
        
    }
}

function show(poke){
    list.innerHTML +=`
        <li>
            <img src="${poke.sprites.front_default}">
            <div id ="spiskomon">
                <h3>${poke.id}</h3>
                <h2>${poke.name.toUpperCase()}</h2>
            </div>
        </li>
    `;
}

function prev(){
    offset -= limit;
    if(offset <= 0){
        document.getElementById("prv").setAttribute("disabled","true");
    }
    if(offset <= 905){
        document.getElementById("nxt").removeAttribute("disabled");
    }
    url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    list.innerHTML = '';
    pokeArray.length = 0;
    makeList(url);
}

function next(){
    offset += limit;
    if(offset > 0){
        document.getElementById("prv").removeAttribute("disabled");
    }
    if(offset >= 905){
        document.getElementById("nxt").setAttribute("disabled", "true");
    }
    url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    list.innerHTML = '';
    pokeArray.length = 0;
    makeList(url);
}
