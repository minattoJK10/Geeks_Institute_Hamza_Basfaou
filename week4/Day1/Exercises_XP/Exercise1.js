// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}

// #1.1 - run in the console:
// Prediction: alert will show "inside the funcOne function 3"
// Because `a` was initially 5, the condition (5 > 1) is true, 
// so `a` is reassigned to 3 inside the function's block scope.
funcOne()
// #1.2 What will happen if the variable is declared 
// with const instead of let ?
// If we declare `a` with const instead of let:
// const a = 5;
// Then trying to reassign `a = 3;` will throw an **error**: 
// "TypeError: Assignment to constant variable."

/*
//#2
let a = 0;
function funcTwo() {
    a = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${a}`);
}
*/
// #2.1 - run in the console:
funcThree()
// Prediction: alert shows "inside the funcThree function 0"
// Because `a` is still 0 (funcTwo not called yet).
funcTwo()
// Changes the global variable `a` to 5.
funcThree()
// Prediction: alert shows "inside the funcThree function 5"
// Because `a` is now updated globally to 5.
// #2.2 What will happen if the variable is declared 
// with const instead of let ?
// If `a` was declared with const:
// const a = 0;
// funcTwo() would throw an **error** because we can't reassign
// a constant variable (from 0 to 5).


//#3
function funcFour() {
    window.a = "hello";
}


function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

// #3.1 - run in the console:
funcFour()
funcFive()
// Prediction: alert shows "inside the funcFive function hello"
// Because `a` was added globally via `window.a`
/*
//#4
let a = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}


// #4.1 - run in the console:
funcSix()
// Prediction: alert shows "inside the funcSix function test"
// Because the local `a` is used inside funcSix.
// #4.2 What will happen if the variable is declared 
// with const instead of let ?
// If we change the local `let a = "test";` to const:
// const a = "test";
// The behavior stays the **same** because we are not reassigning `a`.
*/
//#5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
}
// Prediction: alert shows "in the if block 5"
// Because this `a` only exists inside the `if` block.
alert(`outside of the if block ${a}`);

// #5.1 - run the code in the console
// Prediction: alert shows "outside of the if block 2"
// Because the outer `a` remains unchanged.
// #5.2 What will happen if the variable is declared 
// with const instead of let ?
// If `let` is replaced with `const`:
// const a = 2; 
// const a = 5; (inside the block)
// The behavior remains the **same**, because both variables 
// are separate and neither is reassigned.
