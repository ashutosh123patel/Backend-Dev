console.log("first name")

function login(cb){
    setTimeout(()=>{
        console.log("login")
        cb()

    },2000)
}

function userDetails(cb){
    setTimeout(()=>{
        console.log("user details")
        cb()
    },1000)
}   

function password(cb){

    setTimeout(()=>{
        console.log("password")
    },3000)
}


// here we are going to use the callback hell
login(()=>{
    userDetails(()=>{
        password()
    })
})

console.log("end")
