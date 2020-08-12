const data =[
    {
        name:'John Doe',
        age:32,
        gender:'male',
        lookingfor:'bride',
        location:'Boston MA',
        image:'https://randomuser.me/api/portraits/men/82.jpg'
    },
    {
        name:'Jehn Smith',
        age:26,
        gender:'female',
        lookingfor:'groom',
        location:'Miami FL',
        image:'https://randomuser.me/api/portraits/women/82.jpg'
    },
    {
        name:'William Johnsom',
        age:38,
        gender:'male',
        lookingfor:'bride',
        location:'Lyn MA',
        image:'https://randomuser.me/api/portraits/men/83.jpg'
    },
    {
        name:'Anne Hatson',
        age:29,
        gender:'female',
        lookingfor:'groom',
        location:'Los Angeles',
        image:'https://randomuser.me/api/portraits/women/83.jpg'
    },
    {
        name:'Peter Johnson',
        age:28,
        gender:'male',
        lookingfor:'bride',
        location:'Boston MA',
        image:'https://randomuser.me/api/portraits/men/84.jpg'
    }

];

const profiles=profileIterator(data);
//call first profile
nextProfile();
//Next Event
document.getElementById('next').addEventListener('click',nextProfile);


function nextProfile(){
    
    const currentProfile=profiles.next().value;
  //  console.log(currentProfile);
  if(currentProfile!=undefined){
  
    document.getElementById('profileDisplay').innerHTML=`
    <ul class="list-group">
       <li class="list-group-item">Name:   ${currentProfile.name}
       </li>
       <li class="list-group-item">Age:    ${currentProfile.age}
       </li>
       <li class="list-group-item">Gender: ${currentProfile.gender}
       </li>
       <li class="list-group-item">Location:   ${currentProfile.location}
       </li>
       <li class="list-group-item">Looking for:    ${currentProfile.lookingfor}
       </li>
     </ul>
   
   `;
   document.getElementById('imageDisplay').innerHTML=`<img src=${currentProfile.image}>`;
  }
  else
  {
       //NO more Profiles
    window.location.reload();
  }
   
}
//Profile Iterator

function profileIterator(profiles){
    let nextIndex=0;

    return{
        next:function() {
            return nextIndex<profiles.length ? 
            {value:profiles[nextIndex++],done:false}:{done:true}
        }
    }
}

