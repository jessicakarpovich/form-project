const color1 = document.querySelector("#color_1");
const color2 = document.querySelector("#color_2");
const image = document.querySelector(".js-product");


// Change image of product based on user selected color
function changeColor(color) {
    if (color == color1 && image.getAttribute('src') == "images/star-wars-2369316_640.jpg") {
        image.src = "images/star-wars-2908139_640.jpg";
    }
    else if (color == color2 && image.getAttribute('src') == "images/star-wars-2908139_640.jpg") {
        image.src = "images/star-wars-2369316_640.jpg"
    }
}

color1.addEventListener('click', function() { changeColor(color1) }, false);
color2.addEventListener('click', () => { changeColor(color2) }, false);
