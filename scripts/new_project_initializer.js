// ========== html elements ========== 
new_project_size_choice = document.getElementById("new_project_size_choice");


// ========== runtime ========== 
function new_project(){
    start_new_project(new_project_size_choice.value);
}

function init_project_table(){
    canvas_status_table = [];
    for(i = 0; i < size_in_units; i++){
        row = [];
        for(j = 0; j < size_in_units; j++){
            row.push([0,0,0]);
        }
        canvas_status_table.push(row);
    }
}

function start_new_project(size){
    size_in_units = size;
    unit_size  = canvas_size/size_in_units;
    init_project_table();
    state_stack = [];
}