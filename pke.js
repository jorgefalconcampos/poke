var Pokedex = require('pokedex-promise-v2');

var P = new Pokedex();  // Creating the P object

var search = document.getElementById("search");

// Listening for a submit in the "search" form to execute the method "executeQuery"
search.addEventListener("submit", executeQuery, false);

function executeQuery()
{
  var poke;
  
  // If the query will be trough ID or pokemon name
  document.getElementById('searchtype_id').checked ? 
  ( poke = parseInt(search["txto"].value) , console.log('query made by ID number'), searchByID(poke) ) //If the query was made by pokemon ID
  : ( poke = search["txto"].value , console.log('query made by name'), searchByName(poke) ); //If the query was made by pokemon name 
}


function searchByID(poke) {
  P.resource('/api/v2/pokemon/'+poke) //Consuming directly from the PokeAPI as resource 
  .then(function(response) {
    console.log(response);
    
    //Getting name & ID
    var pokeName = response.name;
    var pokeID = response.id;

    //Getting moves
    var pokemoves = response.moves; //"pokemoves" has the objects array of all movements 
    var imove = pokemoves[0]; //taking the first movement
    var move = imove["move"].name; //accessing the move from movement index 0, then to the movement name
        
    //Getting sprites
    var sprites = response.sprites;
    var sprite_f = sprites["front_default"];
    var sprite_b = sprites["back_default"];

    // Displaying data
    search["query_result"].value="\n * Nombre del pokemon: "+pokeName 
    + "\n\n * ID del pokemon: "+pokeID
    + "\n\n * Movimiento: "+move; 
    console.log('Pokemon info loaded succesfully');

    // Displaying sprites
   search["sprite_front"].src=sprite_f;
   search["sprite_back"].src=sprite_b;      
  })
  .catch(function(error){
    console.log('There was an error while retrieving data from pokemon: ', error);
    alert("¡Pokemon no encontrado!  :( ");
  });
}


