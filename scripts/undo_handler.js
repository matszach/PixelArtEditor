// ========== constants ========== 
const max_stack_length = 20;


// ========== variables ========== 

// previous state stack
var state_stack = [];

// checked and changed on mouse-not-down
// if true - state is saved and this is set to false
// on mouse up this is set to true
var save_pending = true;


// ========== runtime ========== 

// saves state
function save_current_canvas_state(){

    // removes the oldest states when max stack length is reached
    while(state_stack.length >= max_stack_length){
        state_stack.shift();
    }

    // new array object
    current_state = [];

    // current state is copied
    for(i = 0; i < size_in_units; i++){
        row = [];
        for(j = 0; j < size_in_units; j++){
            row.push(canvas_status_table[i][j]);
        }
        current_state.push(row);
    }

    // current state is pushed onto the stack
    state_stack.push(current_state)
}


// loads state
function load_previous_canvas_state(){

    // maximum undo state reached
    if(state_stack.length <= 0){
        return;
    }

    // copies the most recent canvas state
    loaded_state = state_stack.pop();
    for(i = 0; i < loaded_state.length; i++){
        for(j = 0; j < loaded_state[0].length; j++){
            canvas_status_table[i][j] = loaded_state[i][j];
        }
    } 

}

// manages undo mechanics
function manage_undo(){

    // instantly when the mouse is pressed down the current canvas state is saved
    if(mouseDown){
        if(save_pending && isMouseInCanvas()){
            save_current_canvas_state();
            save_pending = false; 
        }
    // when the mouse is let go the "save-lock" is released and canas state can be saved again
    } else {
        save_pending = true;
    }
}