// ========== runtime ========== 

// draw accoring to choosen options
function get_user_input(){
   
    // exit if cursor outside of canvas
    if(!isMouseInCanvas()){
        return;
    }

    // check selected brush type
    if(brush_type == BrushType.SQUARE){
        execute_input_for_SQUARE();
    } else if(brush_type == BrushType.CIRCLE) {
        execute_input_for_CIRCLE();
    } else if(brush_type == BrushType.LIGHT_SPRAY) {
        execute_input_for_SPRAY(0.05);
    } else if(brush_type == BrushType.HEAVY_SPRAY) {
        execute_input_for_SPRAY(0.12);
    }

}

// ========= SQUARE =========
// execute input for SQUARE brush
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
// execute input for CIRCLE brush
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

                // skip if outside of canvas
                if (i < 0 || j < 0 || i >= size_in_units || j >= size_in_units){
                    continue;
                }

                // skip if outside circle
                radius = brush_size/2;
                dist_from_center_X = Math.abs(i-x_min-radius+0.5);
                dist_from_center_Y = Math.abs(j-y_min-radius+0.5);
                distance_from_center = Math.sqrt(Math.pow(dist_from_center_X,2) + Math.pow(dist_from_center_Y,2));
                if (distance_from_center > radius){
                    continue;
                }

                // updates canvas data
                canvas_status_table[i][j] = choosen_color;
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
// execute input for SPRAY brush
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

                // skip if outside of canvas
                if (i < 0 || j < 0 || i >= size_in_units || j >= size_in_units){
                    continue;
                }

                // skip if random over density
                if (Math.random() > density){
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




// ========== util ========== 
function get_brush_area(){

    // rounds draw position to unit-grid ("pixel"-grid)
    mouse_position = getMousePositionInCanvas();

    // location of top/left corner of current brush range in canvas
    x = mouse_position[0] - mouse_position[0] % unit_size - ((brush_size - brush_size % 2) / 2) * unit_size
    y = mouse_position[1] - mouse_position[1] % unit_size - ((brush_size - brush_size % 2) / 2) * unit_size

    return [x,y];
}

