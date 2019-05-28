// ========== html elements ========== 
const brush_size_slider = document.getElementById("brush_size_slider");
const brush_type_buttons = [
    document.getElementById("brush_radio_0"),
    document.getElementById("brush_radio_1"),
    document.getElementById("brush_radio_2"),
    document.getElementById("brush_radio_3"),
    document.getElementById("brush_radio_4"),
    document.getElementById("brush_radio_5"),
    document.getElementById("brush_radio_6"),
    document.getElementById("brush_radio_7"),
    document.getElementById("brush_radio_8")
];


// ========== constants ========== 
const BrushType = {
    SQUARE : 0,
    CIRCLE : 1,
    LIGHT_SPRAY : 2,
    HEAVY_SPRAY : 3
}
const brush_types_by_element = [
    BrushType.SQUARE,
    BrushType.CIRCLE,
    BrushType.LIGHT_SPRAY,
    BrushType.HEAVY_SPRAY,
    BrushType.SQUARE,
    BrushType.SQUARE,
    BrushType.SQUARE,
    BrushType.SQUARE,
    BrushType.SQUARE
]

// ========== variables ========== 
var brush_size = 1;
var brush_type = BrushType.SQUARE;


// ========== init ========== 
brush_type_buttons[0].style.borderColor = selected_color_button_border_color;


// ========== runtime ========== 
function update_brush_size(){
    brush_size = brush_size_slider.value;
}

function set_brush_type_with(index){

    // set selected type
    brush_type = brush_types_by_element[index];

    // set selected button 
    for(i = 0; i <  brush_type_buttons.length; i++){
        brush_type_buttons[i].style.borderColor = default_color_button_border_color;
    }
    brush_type_buttons[index].style.borderColor = selected_color_button_border_color;
}