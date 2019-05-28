// ========== html elements ========== 
const cvs = document.getElementById("main_canvas");
const ctx = cvs.getContext("2d");


// ========== constants ========== 
const canvas_size = 780;
const grid_color = "rgb(120,120,120)";
const grid_width = 2;
const highlighted_grid_color_mouse_up = "rgb(120,120,255)";
const highlighted_grid_color_mouse_down = "rgb(255,120,120)";
const highlighted_grid_width = 5;


// ========== variables ========== 
let size_in_units;
let unit_size;

var grid_wanted = true;

// canvas status
let canvas_status_table;


// ========== runtime ========== 

// toggle grid-wanted
function update_grid_wanted(){
    grid_wanted = !grid_wanted;
}

// draws unit-grid ("pixel"-grid)
function show_grid(){
    
    // skip if no grid wanted
    if (!grid_wanted){
        return;
    }
    
    ctx.beginPath();
    
    ctx.strokeStyle = grid_color;
    ctx.lineWidth = grid_width;

    for(i = unit_size; i < canvas_size; i += unit_size){
        ctx.moveTo(0, i);
        ctx.lineTo(canvas_size, i);
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas_size);
    }

    ctx.stroke();
}

// re-draws current state of of canvas
function redraw_state(){
    for(i = 0; i < size_in_units; i++){
        for(j = 0; j < size_in_units; j++){
            color = canvas_status_table[i][j];
            ctx.fillStyle = "rgb("+color[0]+","+color[1]+","+color[2]+")";
            ctx.fillRect(i*unit_size,j*unit_size,unit_size,unit_size);
        }
    }
}


// ongoing canvas update
function update_canvas(){
    redraw_state();
    show_grid();
    manage_undo();
    get_user_input();    
}


// ========== init ========== 
start_new_project(16);
canvas_interval = setInterval(update_canvas, 30);

