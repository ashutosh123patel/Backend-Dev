// normal callback function
const greet=()=>{
    console.log("Good morning");
}

function fun (cb){
console.log("This is the fun function");
cb()
}

fun(greet)

fun(()=>{
console.log("morning");
})