// elements
choosen_color_indicator = document.getElementById("choosen_color_indicator");
choosen_brush_size_indicator = document.getElementById("choosen_brush_size_indicator");



// update choosen brush size indicator
function update_brush_size_indicator(){
    choosen_brush_size_indicator.innerHTML = brush_size_slider.value + "px";
}

// updates choosen color indicator circle
function update_color_choosen_indicator(){
    r = red_slider.value;
    g = green_slider.value;
    b = blue_slider.value;
    choosen_color_indicator.style.backgroundColor = "rgb("+r+","+g+","+b+")";    
}


// looped function
function update_indicators(){
    update_brush_size_indicator();
    update_color_choosen_indicator();
}


// init
indicator_interval = setInterval(update_indicators, 100);

