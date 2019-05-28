// ========== html elements ========== 
const color_buttons = [
    document.getElementById("col_radio_0"),
    document.getElementById("col_radio_1"),
    document.getElementById("col_radio_2"),
    document.getElementById("col_radio_3"),
    document.getElementById("col_radio_4"),
    document.getElementById("col_radio_5"),
    document.getElementById("col_radio_6"),
    document.getElementById("col_radio_7"),
    document.getElementById("col_radio_8"),
    document.getElementById("col_radio_9"),
    document.getElementById("col_radio_10"),
    document.getElementById("col_radio_11"),
    document.getElementById("col_radio_12"),
    document.getElementById("col_radio_13")
];

const red_slider = document.getElementById("red_slider");
const green_slider = document.getElementById("green_slider");
const blue_slider = document.getElementById("blue_slider");


// ========== constants ========== 
const default_color_button_border_color = "#4444ff";
const selected_color_button_border_color = "#994444";


// ========== variables ========== 
var choosen_color = [255,255,255];

var saved_colors = [
    [0,0,0],
    [255,0,0],
    [0,255,0],
    [0,0,255],
    [255,255,0],
    [255,0,255],
    [0,255,255],
    [255,255,255],
    [255,255,255],
    [255,255,255],
    [255,255,255],
    [255,255,255],    
    [255,255,255],
    [255,255,255]
];


// ========== init ========== 

// sets button  7 as selected by default
var current_color_save_index = 7;

// paints color buttons with default selected colors
for(i = 0; i < color_buttons.length; i++){
    default_color = saved_colors[i];
    color_buttons[i].style.backgroundColor = "rgb("+default_color[0]+","+default_color[1]+","+default_color[2]+")";
}
color_buttons[current_color_save_index].style.borderColor = selected_color_button_border_color;


// ========== runtime ========== 

// updating current choosen color
function update_color(){
    r = red_slider.value;
    g = green_slider.value;
    b = blue_slider.value;
    choosen_color = [r,g,b];
}

// saving
function save_color(){
    save_color_at(current_color_save_index);
}

function save_color_at(index){
    saved_colors[index] = choosen_color;
    color_buttons[index].style.backgroundColor = "rgb("+choosen_color[0]+","+choosen_color[1]+","+choosen_color[2]+")";
}

// loading
function load_color_at(index){

    // set selected color
    choosen_color = saved_colors[index];
    red_slider.value = choosen_color[0];
    green_slider.value = choosen_color[1];
    blue_slider.value = choosen_color[2];

    // set selected button 
    current_color_save_index = index;
    for(i = 0; i < color_buttons.length; i++){
        color_buttons[i].style.borderColor = default_color_button_border_color;
    }
    color_buttons[index].style.borderColor = selected_color_button_border_color;
}


