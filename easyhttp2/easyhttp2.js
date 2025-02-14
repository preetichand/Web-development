/*
*EasyHTTP library
*Library for making HTTP requests

* @version 2.0.0
* @author Preeti Chand

*/



//synchronous
// class EasyHTTP{
//     //Make a HTTP GET request
//     get(url) {
//       fetch(url)
//       .then(res=> res.json())
//       .then(data => console.log(data))
//       .catch(err => console.log(err));
//     }
// }

//asynchronous

class EasyHTTP{

//Make HTTP GET request
    get(url){
       return new Promise((resolve,reject) => {
           fetch(url)
            .then(res => res.json())
             .then(data => resolve(data))
             .catch(err=> reject(err));
       });
}

//Make HTTP POST request


post(url,data){
    return new Promise( (resolve,reject) =>{
   
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data=>resolve(data))
        .catch(err=>reject(err));
    });
}

//Make HTTP PUT request

put(url,data){
    return new Promise((resolve,reject) => {
        fetch(url,{
            method:'PUT',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>resolve(data))
        .catch(err =>reject(err))
    });
}

//Make HTTP Delete request

delete(url){
    return new Promise((resolve,reject) => {
        fetch(url,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json',
            }
        })
        .then(res=>res.json())
        .then(()=>resolve('Resourse deleted..'))
        .catch(err =>reject(err))
    });
}

}


