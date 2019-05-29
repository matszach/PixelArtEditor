
// ========== runtime ========== 


// draw accoring to choosen options
function get_user_input(){
   
    // exit if cursor outside of canvas and held action is not in progress
    if(!held_action_in_progress && !isMouseInCanvas()){
        return;
    }

    // check for selected brush type
    switch(brush_type){
        case BrushType.SQUARE : execute_input_for_SQUARE(); break;
        case BrushType.CIRCLE : execute_input_for_CIRCLE(); break; 
        case BrushType.LIGHT_SPRAY : execute_input_for_SPRAY(0.05); break;
        case BrushType.HEAVY_SPRAY : execute_input_for_SPRAY(0.12); break;
        case BrushType.LINE_HELD : execute_input_for_LINE_HELD(); break;
        case BrushType.RECTANGLE_EMPTY_HELD : execute_input_for_RECTANGLE_EMPTY_HELD(); break;
        case BrushType.RECTANGLE_FILLED_HELD : execute_input_for_RECTANGLE_FILLED_HELD(); break;

        case BrushType.FLOOD : execute_input_for_FLOOD(); break;

        default : execute_input_for_SQUARE();
    }

    // CORNER_ELIPSIS_HELD : 6,
    // CENTER_CIRCLE_HELD : 7,
    // VARIATION : 9
}

// ==================================================== CLICK ACTIONS ====================================================

// ========= SQUARE =========
function execute_input_for_SQUARE(){

    // left top corner of brush area as [X,Y]
    brush_area_loc = get_brush_area();

    // update table in range if mouse down
    if(mouseDown){

        x_min = Math.round(brush_area_loc[0]/unit_size);
        y_min = Math.round(brush_area_loc[1]/unit_size);
        range = parseInt(brush_size);

        // for each unit in brush range
        for(i = x_min; i < x_min + range; i++){
            for(j = y_min; j < y_min + range; j++){

                // skip if outside of canvas
                if (i < 0 || j < 0 || i >= size_in_units || j >= size_in_units){
                    continue;
                }

                // updates canvas data
                canvas_status_table[i][j] = choosen_color;
            }
        }
    } 

    // highlight side length
    len = unit_size * brush_size;

    // highlighting rectangle
    ctx.beginPath();
    ctx.lineWidth = highlighted_grid_width;
    if(mouseDown){
        ctx.strokeStyle = highlighted_grid_color_mouse_down;
    } else {
        ctx.strokeStyle = highlighted_grid_color_mouse_up;
    }
    ctx.rect(brush_area_loc[0],brush_area_loc[1],len,len);
    ctx.stroke();
}

// ========= CIRCLE =========
function execute_input_for_CIRCLE(){

    // left top corner of brush area as [X,Y]
    brush_area_loc = get_brush_area();

    // update table in range if mouse down
    if(mouseDown){

        x_min = Math.round(brush_area_loc[0]/unit_size);
        y_min = Math.round(brush_area_loc[1]/unit_size);
        range = parseInt(brush_size);

        // for each unit in brush range
        for(i = x_min; i < x_min + range; i++){
            for(j = y_min; j < y_min + range; j++){

                // skip if outside circle
                radius = brush_size/2;
                dist_from_center_X = Math.abs(i-x_min-radius+0.5);
                dist_from_center_Y = Math.abs(j-y_min-radius+0.5);
                distance_from_center = Math.sqrt(Math.pow(dist_from_center_X,2) + Math.pow(dist_from_center_Y,2));
                if (distance_from_center > radius){
                    continue;
                }

                // updates canvas data
               safe_fill(i,j);
            }
        }
    } 

    // highlight side length
    rad = unit_size * brush_size/2;

    // highlighting rectangle
    ctx.beginPath();
    ctx.lineWidth = highlighted_grid_width;
    if(mouseDown){
        ctx.strokeStyle = highlighted_grid_color_mouse_down;
    } else {
        ctx.strokeStyle = highlighted_grid_color_mouse_up;
    }
    ctx.arc(brush_area_loc[0]+rad,brush_area_loc[1]+rad, rad, 0, 2 * Math.PI);
    ctx.stroke();
}

// ========= SPRAY =========
function execute_input_for_SPRAY(density){

    // left top corner of brush area as [X,Y]
    brush_area_loc = get_brush_area();

    // update table in range if mouse down
    if(mouseDown){

        x_min = Math.round(brush_area_loc[0]/unit_size);
        y_min = Math.round(brush_area_loc[1]/unit_size);
        range = parseInt(brush_size);

        // for each unit in brush range
        for(i = x_min; i < x_min + range; i++){
            for(j = y_min; j < y_min + range; j++){

                // skip if random over density
                if (Math.random() > density){
                    continue;
                }

                // updates canvas data
                safe_fill(i,j);
            }
        }
    } 

    // highlight side length
    len = unit_size * brush_size;

    // highlighting rectangle
    ctx.beginPath();
    ctx.lineWidth = highlighted_grid_width; 

    ctx.setLineDash([10,10]); // dashed line for spray brush

    if(mouseDown){
        ctx.strokeStyle = highlighted_grid_color_mouse_down;
    } else {
        ctx.strokeStyle = highlighted_grid_color_mouse_up;
    }
    ctx.rect(brush_area_loc[0],brush_area_loc[1],len,len);
    ctx.stroke();

    ctx.setLineDash([0]); // clear stroke dash

}

// ========= FLOOD =========
function execute_input_for_FLOOD(){
    // update table in range if mouse down
    if(mouseDown){

        flood_origin = getMousePositionInCanvas();

        x_flood = Math.round(flood_origin[0]/unit_size - 0.5);
        y_flood = Math.round(flood_origin[1]/unit_size - 0.5);

        flood_and_spread(x_flood, y_flood, choosen_color, canvas_status_table[x_flood][y_flood]);
    }
}

function flood_and_spread(i,j,target_color, old_color){
    if(!field_exists(i,j)){
        return;
    }
    this_color = canvas_status_table[i][j];
    if (same_rgb(this_color, target_color)){
        return;
    } else if (!same_rgb(this_color, old_color)){
        return;
    }
    safe_fill(i,j);
    flood_and_spread(i,j+1,target_color, old_color);
    flood_and_spread(i,j-1,target_color, old_color);
    flood_and_spread(i+1,j,target_color, old_color);
    flood_and_spread(i-1,j,target_color, old_color);
}

// ==================================================== HELD ACTIONS ====================================================

//  variables 
var held_action_in_progress = false;
let held_action_origin_location;

let prepared_action_type;
let held_action_start_function;
let held_action_in_progress_function;
let held_action_execute_function;

// manages held actions
function manage_held_action(){

    if (mouseDown){
        if(!held_action_in_progress){
            if(isMouseInCanvas()){
                // held action started within the boundaries of the canvas
                held_action_start_function();
                held_action_in_progress = true;
                held_action_origin_location = getMousePositionInCanvas();
            }
        } else {
            // held action in progress, user is still selecting the second point
            held_action_in_progress_function();
        }
    } else {
        if(held_action_in_progress){
            // held action finished 
            held_action_execute_function();
            held_action_in_progress = false;
            held_action_origin_location = null;
        }
    }
}

// ===== HELD LINE =====
function execute_input_for_LINE_HELD(){

    // ensures that the functions are set-up only once
    if(prepared_action_type != brush_type){

        prepared_action_type = BrushType.LINE_HELD;

        // no action required on initial click
        held_action_start_function = function (){
            // nothing
        }
    
        // draw indicator line from initial point to current cursor location
        held_action_in_progress_function = function(){
            held_action_current_location = getMousePositionInCanvas();
            ctx.beginPath();
            ctx.lineWidth = highlighted_grid_width;
            ctx.strokeStyle = highlighted_grid_color_mouse_down;
            ctx.moveTo(held_action_origin_location[0], held_action_origin_location[1]);
            ctx.lineTo(held_action_current_location[0], held_action_current_location[1]);
            ctx.stroke();
        }
    
        // fill pixels on path
        held_action_execute_function = function(){

            o_loc = held_action_origin_location;
            c_loc = getMousePositionInCanvas();

            x_o = Math.round(o_loc[0]/unit_size - 0.5);
            y_o = Math.round(o_loc[1]/unit_size - 0.5);
            x_c = Math.round(c_loc[0]/unit_size - 0.5);
            y_c = Math.round(c_loc[1]/unit_size - 0.5);

            let x_start, x_range, y_start, y_range;

            // line longer along x axis
            if(Math.abs(x_o-x_c)>=Math.abs(y_o-y_c)){
                if(x_o <= x_c){
                    x_start = x_o;
                    x_range = x_c - x_o;
                    y_start = y_o;
                    y_range = y_c - y_o;
                } else {
                    x_start = x_c;
                    x_range = x_o - x_c;
                    y_start = y_c;
                    y_range = y_o - y_c;
                }

                for(i = x_start; i <= x_start+x_range; i++){
                    j = y_start + Math.round((i-x_start)/x_range * y_range);
                    safe_fill(i,j);
                }


            // line longer along y axis
            } else {
                if(y_o <= y_c){
                    x_start = x_o;
                    x_range = x_c - x_o;
                    y_start = y_o;
                    y_range = y_c - y_o;
                } else {
                    x_start = x_c;
                    x_range = x_o - x_c;
                    y_start = y_c;
                    y_range = y_o - y_c;
                }

                for(j = y_start; j <= y_start+y_range; j++){
                    i = x_start + Math.round((j-y_start)/y_range * x_range);
                    safe_fill(i,j);
                }

            }

        }
    }

    // executes now set-up function in held-action order
    manage_held_action();
}

// ===== HELD RECTANGLE EMPTY =====
function execute_input_for_RECTANGLE_EMPTY_HELD(){

    // ensures that the functions are set-up only once
    if(prepared_action_type != brush_type){

        prepared_action_type = BrushType.RECTANGLE_EMPTY_HELD;

        // no action required on initial click
        held_action_start_function = function (){
            // nothing
        }
    
        // draw indicator rectangle from initial point to current cursor location
        held_action_in_progress_function = function(){

            o_loc = held_action_origin_location;
            o_loc[0] = Math.floor(o_loc[0]/unit_size) * unit_size;
            o_loc[1] = Math.floor(o_loc[1]/unit_size) * unit_size;

            c_loc = getMousePositionInCanvas();
            c_loc[0] = Math.round(c_loc[0]/unit_size) * unit_size;
            c_loc[1] = Math.round(c_loc[1]/unit_size) * unit_size;
            
            x_root = Math.min(o_loc[0], c_loc[0]);
            y_root = Math.min(o_loc[1], c_loc[1]);
            x_len = Math.abs(o_loc[0]-c_loc[0]) + unit_size;
            y_len = Math.abs(o_loc[1]-c_loc[1]) + unit_size;

            ctx.beginPath();
            ctx.lineWidth = highlighted_grid_width; 
            ctx.strokeStyle = highlighted_grid_color_mouse_down;
            ctx.rect(x_root,y_root,x_len,y_len);
            ctx.stroke();
        }
    
        // fill pixels on path
        held_action_execute_function = function(){

            o_loc = held_action_origin_location;
            o_loc[0] = Math.floor(o_loc[0]/unit_size);
            o_loc[1] = Math.floor(o_loc[1]/unit_size);

            c_loc = getMousePositionInCanvas();
            c_loc[0] = Math.round(c_loc[0]/unit_size);
            c_loc[1] = Math.round(c_loc[1]/unit_size);
        
            for(i = Math.min(o_loc[0], c_loc[0]); i <= Math.max(o_loc[0], c_loc[0]); i++){
                safe_fill(i,o_loc[1]);
                safe_fill(i,c_loc[1]);
            }

            for(j = Math.min(o_loc[1], c_loc[1]); j <= Math.max(o_loc[1], c_loc[1]); j++){
                safe_fill(o_loc[0],j);
                safe_fill(c_loc[0],j);
            }

        }
    }

    // executes now set-up function in held-action order
    manage_held_action();
}

// ===== HELD RECTANGLE FILLED =====
function execute_input_for_RECTANGLE_FILLED_HELD(){

    // ensures that the functions are set-up only once
    if(prepared_action_type != brush_type){

        prepared_action_type = BrushType.RECTANGLE_FILLED_HELD;

        // no action required on initial click
        held_action_start_function = function (){
            // nothing
        }
    
        // draw indicator rectangle from initial point to current cursor location
        held_action_in_progress_function = function(){

            o_loc = held_action_origin_location;
            o_loc[0] = Math.floor(o_loc[0]/unit_size) * unit_size;
            o_loc[1] = Math.floor(o_loc[1]/unit_size) * unit_size;

            c_loc = getMousePositionInCanvas();
            c_loc[0] = Math.round(c_loc[0]/unit_size) * unit_size;
            c_loc[1] = Math.round(c_loc[1]/unit_size) * unit_size;
            
            x_root = Math.min(o_loc[0], c_loc[0]);
            y_root = Math.min(o_loc[1], c_loc[1]);
            x_len = Math.abs(o_loc[0]-c_loc[0]) + unit_size;
            y_len = Math.abs(o_loc[1]-c_loc[1]) + unit_size;

            ctx.beginPath();
            ctx.lineWidth = highlighted_grid_width; 
            ctx.strokeStyle = highlighted_grid_color_mouse_down;
            ctx.rect(x_root,y_root,x_len,y_len);
            ctx.stroke();
        }
    
        // fill pixels on path
        held_action_execute_function = function(){

            o_loc = held_action_origin_location;
            o_loc[0] = Math.floor(o_loc[0]/unit_size);
            o_loc[1] = Math.floor(o_loc[1]/unit_size);

            c_loc = getMousePositionInCanvas();
            c_loc[0] = Math.round(c_loc[0]/unit_size);
            c_loc[1] = Math.round(c_loc[1]/unit_size);
        
            for(i = Math.min(o_loc[0], c_loc[0]); i <= Math.max(o_loc[0], c_loc[0]); i++){
                for(j = Math.min(o_loc[1], c_loc[1]); j <= Math.max(o_loc[1], c_loc[1]); j++){
                    safe_fill(i,j);
                }
            }

        }
    }

    // executes now set-up function in held-action order
    manage_held_action();
}





// ========== util ========== 
function get_brush_area(){

    // rounds draw position to unit-grid ("pixel"-grid)
    mouse_position = getMousePositionInCanvas();

    // location of top/left corner of current brush range in canvas
    x = mouse_position[0] - mouse_position[0] % unit_size - ((brush_size - brush_size % 2) / 2) * unit_size
    y = mouse_position[1] - mouse_position[1] % unit_size - ((brush_size - brush_size % 2) / 2) * unit_size

    return [x,y];
}

function safe_fill(i,j){
    if(field_exists(i,j)){
        canvas_status_table[i][j] = choosen_color;
    }
}

function field_exists(i,j){
    if(i<0 || j < 0 || i >= size_in_units || j >= size_in_units){
        return false;
    } else {
        return true;
    }
}

function same_rgb(colorA, colorB){
    if(colorA[0] != colorB[0]){
        return false;
    } else if(colorA[1] != colorB[1]){
        return false;
    } else if(colorA[2] != colorB[2]){
        return false;
    } else {
        return true;
    }
}

