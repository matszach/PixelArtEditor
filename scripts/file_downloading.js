
// size of a "square" on an actual .png file
var pixel_size_on_image = 16;

// 
function create_and_prompt_download(){

    temp_canvas = document.createElement('canvas');
    temp_canvas.height = size_in_units * pixel_size_on_image;
    temp_canvas.width = size_in_units * pixel_size_on_image;

    temp_context = temp_canvas.getContext("2d");

    for(i = 0; i < size_in_units; i++){
        for(j = 0; j < size_in_units; j++){
            this_color = canvas_status_table[i][j];
            temp_context.fillStyle="rgb("+this_color[0]+","+this_color[1]+","+this_color[2]+")";
            temp_context.fillRect(
                i*pixel_size_on_image,
                j*pixel_size_on_image,
                pixel_size_on_image,
                pixel_size_on_image);
        }
    }

    file = document.createElement('a'); // "a" is not just a name - it's a element type (in this case - a "ahref")
    file.download = 'image.png';
    file.href = temp_canvas.toDataURL();
    file.click();
}

