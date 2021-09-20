/**
 * Author: Mounir Aiache
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tileSize = 40;

const map = [1, 2, 2, 2, 1, 2, 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 1, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 7, 2, 2, 1, 0, 7, 2, 1, 2, 2, 6, 0, 0, 3, 0, 0, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 7, 1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 2, 4, 0, 3, 0, 0, 7, 4, 7, 1, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 1, 2, 6, 0, 0, 7, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 0, 7, 4, 0, 1, 2, 6, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 1, 6, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 7, 2, 1, 4, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 7, 2, 1, 0, 0, 1, 6, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 11, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 7, 4, 0, 0, 0, 3, 0, 0, 0, 0, 7, 1, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 7, 1, 4, 0, 0, 0, 3, 0, 0, 3, 0, 7, 2, 2, 2, 1, 0, 0, 0, 3, 0, 0, 0, 0, 5, 2, 2, 6, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 5, 1, 0, 3, 0, 3, 0, 0, 10, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 2, 6, 0, 0, 0, 0, 3, 0, 3, 0, 1, 2, 6, 0, 0, 0, 0, 0, 3, 0, 0, 1, 2, 1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 5, 1, 6, 3, 0, 1, 2, 2, 1, 2, 1, 0, 0, 0, 0, 1, 2, 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, 2, 2, 1];

let imagesArray = [];
let numberImageLoaded = 0;
const listPath = ["assets/images/sprites/circle.png",
 "assets/images/sprites/horizontal.png",
 "assets/images/sprites/vertical.png",
 "assets/images/sprites/HVBLeft.png",
 "assets/images/sprites/HVBRight.png",
 "assets/images/sprites/HVLeft.png",
 "assets/images/sprites/HVRight.png",
 "assets/images/run2.png",
 "assets/images/home_run2.png",
 "assets/images/run_finish2.png",
 "assets/images/tennis2.png"];

 listPath.forEach(path => {
    let img = new Image();
    img.onload = imageLoaded;
    img.src = path;
    imagesArray.push(img);
 });

function imageLoaded(){
    numberImageLoaded++;
    // when all images are loaded you can start drawing
    if (numberImageLoaded == listPath.length){

        for (let i = 0; i < map.length; ++i) {
            let line = Math.floor(i / (canvas.width / tileSize));
            let column = i % (canvas.width / tileSize);
            let id = map[i];
        
            if (id !== 0) {
                let image = imagesArray[id - 1];
                
                ctx.drawImage(image, column * tileSize, line * tileSize);
                

            }
        }
    }
}






