/*
*EasyHTTP library
*Library for making HTTP requests

* @version 3.0.0
* @author Preeti Chand

*/


//asynchronous

class EasyHTTP{

    //Make HTTP GET request
      async  get(url){
           
        const response=await fetch(url);

        const resData=await response.json();

        return resData;
    }
    
    //Make HTTP POST request
    
    
    async post(url,data){
       
       
           const response=await fetch(url,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(data)
            });
           
            const resData=await response.json();

            return resData;
           
    
    }
    
    //Make HTTP PUT request
    
    async put(url,data){
        
       const response= await fetch(url,{
                method:'PUT',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify(data)
            });

        const resData=await response.json();

        return resData;
           
    }
    
    //Make HTTP Delete request
    
    async delete(url){
        
           const response =await fetch(url,{
                method:'DELETE',
                headers:{
                    'Content-type':'application/json',
                }
            });

         const resData= await 'Resourse Deleted';
         return resData;
            
    }
    
    }
    
    
    