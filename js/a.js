const searchE = document.getElementById("search");
const submitE = document.getElementById("submit");
const url = "https://pokeapi.co/api/v2/pokemon/";
const main = document.querySelector("main");


submitE.addEventListener('click', (event) => {
    search(searchE.value);

function search(pokeName){
    let xr = new XMLHttpRequest();
    xr.open('GET', url + pokeName.toLowerCase());
    xr.send();
    xr.responseType = "json";
    xr.onload = function(){
        if(xr.status < 400){
            drawPoke(xr.response);
        }
        else{
            main.innerHTML = `
            <div id="pokemon">
                <h1>OSHIBOCHKA</h1>
            </div>
            `;
        }
    }
}
});
function drawPoke(popkamon){
    console.log(popkamon);
    if(document.getElementById("pokemon")){
        document.getElementById("pokemon").remove();
    }
    let div = document.createElement("div");
    div.id = "pokemon";
    div.innerHTML = `
    <h3>${popkamon.id}</h3>
    <h2>${popkamon.name.toUpperCase()}</h2>
    <img src="${popkamon.sprites.front_default}">
    `; 
    main.append(div);
}

