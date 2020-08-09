 const http=new EasyHTTP;
//Get users
http.get('https://jsonplaceholder.typicode.com/users')
.then(data=>console.log(data))
.catch(err=>console.log(err));

//POST

const data={
    name:'Preeti chand',
    username:'@preeti_chand',
    email:'abc@gmail.com'
}

http.post('https://jsonplaceholder.typicode.com/users',data)
.then(data=>console.log(data))
.catch(err =>console.log(err));

// update resourse

http.put('https://jsonplaceholder.typicode.com/users/2',data)
.then(data=>console.log(data))
.catch(err=> console.log(err));


//delete  resourse

http.delete('https://jsonplaceholder.typicode.com/users/2')
.then(data =>console.log(data))
.catch(etrr=>console.log(err));