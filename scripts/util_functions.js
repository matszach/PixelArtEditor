function toRGB(r,g,b){
    return "rgb("+r+","+g+","+b+")";
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBLegalInt(min, max) {
    if (min < 0){
        min = 0;
    }
    if (max > 255){
        max = 255;
    }
    return getRandomInt(min,max);
}