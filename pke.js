var Pokedex = require('pokedex-promise-v2');

var P = new Pokedex();  // Creating the P object

var random_search = document.getElementById("random_search");

// Listening for a submit in the "random_search" form to execute the method "executeQuery"
random_search.addEventListener("submit", executeQuery, false);

function executeQuery()
{

 var poke = Math.floor(Math.random() * 801); //from 0 to 800
 console.log("Random pokemon ID: "+poke);  
 
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
    random_search["query_result"].value="\n * Nombre del pokemon: "+pokeName 
    + "\n\n * ID del pokemon: "+pokeID
    + "\n\n * Movimiento: "+move; 
    console.log('Pokemon info loaded succesfully');

    // Displaying sprites
   random_search["sprite_front"].src=sprite_f;
   random_search["sprite_back"].src=sprite_b;      
  })
  .catch(function(error){
    console.log('There was an error while retrieving data from pokemon: ', error);
    alert("¡Pokemon no encontrado!  :( ");
  });
}


