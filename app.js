


let images = Array.from(document.querySelectorAll("img"))

let textLink = ["universe", "", "galaxies", "black holes", "nebulas", "exoplanets", "solar system"]
let text= document.getElementById("title")

let gifsLink = ["assets/gifs/univ.gif", "assets/exagonblack.png", "assets/gifs/gal.gif", "assets/gifs/blac.gif","assets/gifs/neb.gif", "assets/gifs/ex.gif","assets/gifs/sol.gif"]
let imagesLink = ["assets/homeuniverse.png","assets/exagonblack.png" ,"assets/homegalaxies.png", "assets/homeblackhole.png", "assets/homenebula.png", "assets/homeexoplanet.png",  "assets/homesolarsystem.png"]

let pagesLink = ["sketches/universe/universe.html", "" , "sketches/galaxies/galaxies.html", "sketches/blackholes/blackholes.html","sketches/nebulas/nebulas.html","sketches/exoplanets/exoplanets.html", "sketches/solarsystem/solarsystem.html"]

console.log(window.location.href)
let base = window.location.href.replace("index.html", '');
console.log(base)

let i

images.forEach(
    function (image) {
    
    image.addEventListener("mouseenter", function() {
        let imageUrl = image.src.replace(base, "")
        console.log(imageUrl)
        i = imagesLink.indexOf(imageUrl)
        image.src = gifsLink[i]
        text.innerHTML=textLink[i];

    })
    image.addEventListener("mouseleave", function() {
        let gifUrl = image.src.replace(base, "")
        let i = gifsLink.indexOf(gifUrl)
        image.src = imagesLink[i]
        
        text.innerHTML="WEBB";
    })

    image.addEventListener("click", function() {
        //let gifUrl = image.src.replace(base, "")
        let i = images.indexOf(image)
        window.location.href= pagesLink[i];
    })

})



