const PageState=function() {
    let currentState;//=homeState();

    this.init=function() {
        this.change(homeState);
    }

    this.change=function(state) {
        currentState=state.call();
    }
}

//Home State

const homeState=function() {
    document.querySelector('#heading').textContent=null;
    document.querySelector('#content').innerHTML=`
    
    <div class="jumbotron">
    <h1 class="display-4">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </div>
    `;
}
//about state

const aboutState=function() {
    document.querySelector('#heading').textContent='About Us';
    document.querySelector('#content').innerHTML=`
    <p>This is the about page<p>
     `;
}

//contact state

const contactState=function(){
    document.querySelector('#heading').innerHTML='Contact Us';
    document.querySelector('#content').innerHTML=`
    <form>
    <div class="form-group">
        <label >Name</label>
        <input type="text" class="form-control">
    </div>
    <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
     `;
}

//Instantiate pageState

const page=new PageState();

//init the first state

page.init();

//Ui vars

const home=document.getElementById('home'),
      about=document.getElementById('about'),
      contact=document.getElementById('contact');


//home

home.addEventListener('click',(e) =>{
    page.change(homeState);
    e.preventDefault();

});

about.addEventListener('click',(e) =>{
    page.change(aboutState);
    e.preventDefault();

});

contact.addEventListener('click',(e) =>{
    page.change(contactState);
    e.preventDefault();

})