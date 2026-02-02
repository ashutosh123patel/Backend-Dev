function login(){
     return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("login");
            resolve();
        },2000)
     })
}     

function userDetails(){
     return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("userDetails");
            resolve();
        },2000)
     })
}

function password(){
     return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("password");
            resolve();
        },2000)
     })
}

//callback promises
// login()
// .then(()=>{
//     return userDetails();
// }) 
// .then(()=>{
//  return password();
// })
// .then(()=>{
//     console.log("End");
// })
// .catch((error)=>{
//     console.loh(error);
// })

//async await 
async function run(){
    try{
        await login();
        await userDetails();
        await password();
    }
    catch(error){
        console.log(error);
    }
}

run(); 