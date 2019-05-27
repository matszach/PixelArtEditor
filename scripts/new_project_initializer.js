
new_project_size_choice = document.getElementById("new_project_size_choice");


function new_project(){
    start_new_project(new_project_size_choice.value);
}


function start_new_project(size){
    size_in_units = size;
    unit_size  = canvas_size/size_in_units;
    init_project_table();
    state_stack = [];
}