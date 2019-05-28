// draw accoring to choosen options
function get_user_input(){

    // rounds draw position to unit-grid ("pixel"-grid)
    mouse_position = getMousePositionInCanvas();

    // exit if cursor outside of canvas
    if(!isMouseInCanvas()){
        return;
    }

    // location of top/left corner of current brush range in canvas
    x = mouse_position[0] - mouse_position[0] % unit_size - ((brush_size - brush_size % 2) / 2) * unit_size
    y = mouse_position[1] - mouse_position[1] % unit_size - ((brush_size - brush_size % 2) / 2) * unit_size

    // update table in range if mouse down
    if(mouseDown){

        x_min = Math.round(x/unit_size);
        y_min = Math.round(y/unit_size);
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
    ctx.rect(x,y,len,len);
    ctx.stroke();
}
