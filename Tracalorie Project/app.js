//storage Controller

const StorageCtrl=(function(){

    return{

        storeItem:function(item){

            
            //check if any item
            if(localStorage.getItem('items')===null){

               let items=[];
               items.push(item);
               localStorage.setItem('items',JSON.stringify(items));
               
            }
            else{
    
                //get what is allready in local storage
                 items=JSON.parse(localStorage.getItem('items'));

                 //push new item
                 items.push(item);
                 localStorage.setItem('items',JSON.stringify(items));
                 

            }

        },
        getItemsFromStorage:function(){

            let items;
            if(localStorage.getItem('items')===null)
            {
               items=[];
            }
            else{
                items=JSON.parse(localStorage.getItem('items'));

               
            }
            return items;
        },
        updateItemStorage:function(updatedItem){

            let items=JSON.parse(localStorage.getItem('items'));
            
            items.forEach(function(item,index){

                if(updatedItem.id===item.id){

                    items.splice(index,1,updatedItem);
                }
            });
            localStorage.setItem('items',JSON.stringify(items));
        },
        deleteItemFromStorage:function(id){

            let items=JSON.parse(localStorage.getItem('items'));
            
            items.forEach(function(item,index){

                if(id===item.id){

                    items.splice(index,1);
                }
            });
            localStorage.setItem('items',JSON.stringify(items));

        },

        clearItemsFromStorage:function(){

            localStorage.removeItem('items');
        }
    }

})();


//Item controller

const ItemCtrl=(function(){
       //Item Constructor
  const Item=function(id,name,calories){
       this.id=id;
       this.name=name;
       this.calories=calories;
  }

      //data Structure /state

  const data={
      items:StorageCtrl.getItemsFromStorage(),
      currentItem:null,
      totalCalories:0
  }

  return{
      getItems:function(){
          return data.items;
      },
      addItem:function(name,calories){
          let ID;
        //create ID
        if(data.items.length > 0){
            
            ID=data.items[data.items.length-1].id+1;
        }else
        {
            ID=0;
        }
           
        
            //calories to number

          calories=parseInt(calories);

            // create new item

          newItem=new Item(ID,name,calories);

           data.items.push(newItem);

           return newItem;

        },
        getTotalCalories:function(){
          
            let total=0;
            data.items.forEach(function(item){
               total+=item.calories;
            });
            data.totalCalories=total;
            return data.totalCalories;
        },
        logData:function(){
            return data;
        },

        getElementById:function(id){

            let found=null;
            data.items.forEach(function(item){

                if(item.id===id){
                    found=item;
                }
            });
            return found;
        },
        setCurrentItem:function(item){
           
            data.currentItem=item;
            
        },
        getCurrentItem:function(){

            
            return data.currentItem;
        },
        updateItem:function(name,calories){

            //calories to number
            calories=parseInt(calories);
            let found=null;
            data.items.forEach(function(item){

                if(item.id===data.currentItem.id){
                    item.name=name;
                    item.calories=calories;
                    found=item;
                    
                }
            });
            return found;
        },
        deleteItem:function(id){

            //get ids

            ids=data.items.map(function(item){
              
              return   item.id;
            });

            //get index

            const index=ids.indexOf(id);
            
            //remove item

            data.items.splice(index,1);

        },
        clearAllItems:function(){
            data.items=[];
        }
      }
  }

)();



//UI controller
const UICtrl=(function(){
    const UISelectors={
        itemList:'#item-list',
        addbtn:'.add-btn',
        itemNameInput:'#item-name',
        itemCaloriesInput:'#item-calories',
        totalCalories:'.total-calories',
        updateBtn:'.update-btn',
        deleteBtn:'.delete-btn',
        backBtn:'.back-btn',
        listItems:'#item-list li',
        clearBtn:'.clear-btn'
    }
  
    return {
        populateItemList:function(items){
            let html='';

            items.forEach(function(item){
              html+=`
              
              <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}:</strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>
               `;
             });

             //Insert list items

             document.querySelector(UISelectors.itemList).innerHTML=html;

        },
        getItemInput:function(){
        
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        getselectors:function(){
            return UISelectors;
        },
        clearInput:function(){
          
            document.querySelector(UISelectors.itemNameInput).value='';
            document.querySelector(UISelectors.itemCaloriesInput).value='';
        },
        addItemToform:function(){
         
            document.querySelector(UISelectors.itemNameInput).value=ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value=ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();

        },
        hideList:function(){
          
            document.querySelector(UISelectors.itemList).style.display='none';
        },
        showTotalCalories:function(totalCalories){
           
            document.querySelector(UISelectors.totalCalories).textContent=totalCalories;

        },
        addListItem:function(item){
         
            //create li element
            document.querySelector(UISelectors.itemList).style.display='block';
            const li=document.createElement('li');
            li.className='collection-item';
            li.id=`item-${item.id}`;
            li.innerHTML=`
                <strong>${item.name}:</strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            `;

            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
        },
        clearEditstate:function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display='none';
            document.querySelector(UISelectors.deleteBtn).style.display='none';
            document.querySelector(UISelectors.backBtn).style.display='none';
            document.querySelector(UISelectors.addbtn).style.display='inline';
        },
        showEditState:function(){
            
            document.querySelector(UISelectors.updateBtn).style.display='inline';
            document.querySelector(UISelectors.deleteBtn).style.display='inline';
            document.querySelector(UISelectors.backBtn).style.display='inline';
            document.querySelector(UISelectors.addbtn).style.display='none';
        },
        updateListItem:function(item){

            let listItems=document.querySelectorAll(UISelectors.listItems);

            //Turn nodeList into array

            listItems=Array.from(listItems);

            listItems.forEach(function(listItem){

                const itemId=listItem.getAttribute('id');

                if(itemId===`item-${item.id}`){
                   
                    document.querySelector(`#${itemId}`).innerHTML= 
                    `
                    <strong>${item.name}:</strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    `;

                }

            })

        },
        deleteListItem:function(id){

            const itemID=`#item-${id}`;
            const item=document.querySelector(itemID);
            item.remove();
        },
        removeItems:function(){
            let listItems=document.querySelectorAll(UISelectors.listItems);

            listItems=Array.from(listItems);

            listItems.forEach(function(item){
                 
                item.remove();
            })
        }
    }
})();



//App Controller
const App=(function(ItemCtrl,StorageCtrl,UICtrl){
  
          //load event listeners

const loadEventListeners=function(){

const UISelectors=UICtrl.getselectors();

        //add item event

document.querySelector(UISelectors.addbtn).addEventListener(
    'click',itemAddSubmit);

//disable submit on enter

document.addEventListener('keypress',function(e){

    if(e.keyCode===13 || e.which===13){
        e.preventDefault();
        return false;
    }

})

document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);


document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);

document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditstate);

document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);

document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllitemsClick);
}

        //add item submit

const itemAddSubmit=function(e){
         //get form input from UI Controller

  const input=UICtrl.getItemInput();
  
  //check for name and calorie
  if(input.name!=='' && input.calories!==''){
   
    //Add item
    const newItem=ItemCtrl.addItem(input.name,input.calories);
    //Add item to UI list

    
    UICtrl.addListItem(newItem);

    

    //add totalcalories to UI
    const totalCalories=ItemCtrl.getTotalCalories();
    
    UICtrl.showTotalCalories(totalCalories);

    //store in local storage

    StorageCtrl.storeItem(newItem);

     //clear fields
     UICtrl.clearInput();


  }
  
    e.preventDefault();
}

const itemEditClick=function(e){

    if(e.target.classList.contains('edit-item')){
        console.log('edit item');

        //get list item id(item-0,item1)
        const listId=e.target.parentNode.parentNode.id;
        
        //break into an array

        const listIdArr=listId.split('-');

        //get the actual id

        const id=parseInt(listIdArr[1]);

        //Get item

        const itemToEdit=ItemCtrl.getElementById(id);

      
        //set current item

        ItemCtrl.setCurrentItem(itemToEdit);

        //Add item to form

        UICtrl.addItemToform();

    }
    
}
const itemUpdateSubmit=function(e){
       
   //get item input
   const input=UICtrl.getItemInput();

   //update item
   const  updatedItem=ItemCtrl.updateItem(input.name,input.calories);
   UICtrl.updateListItem(updatedItem);
  
    const totalCalories=ItemCtrl.getTotalCalories();

     UICtrl.showTotalCalories(totalCalories);

     StorageCtrl.updateItemStorage(updatedItem);

    //clear fields
    UICtrl.clearEditstate();
 
    e.preventDefault();
    
}

const itemDeleteSubmit=function(e){
//get current item

const currentItem=ItemCtrl.getCurrentItem();

//delete from data structure

ItemCtrl.deleteItem(currentItem.id);

//delete from Ui

UICtrl.deleteListItem(currentItem.id);

const totalCalories=ItemCtrl.getTotalCalories();

UICtrl.showTotalCalories(totalCalories);

StorageCtrl.deleteItemFromStorage(currentItem.id);
    //clear fields
UICtrl.clearEditstate();

e.preventDefault();
}

const clearAllitemsClick=function(){

    //Delete all items from data structure

    ItemCtrl.clearAllItems();
    UICtrl.removeItems();
    
    StorageCtrl.clearItemsFromStorage();

    const totalCalories=ItemCtrl.getTotalCalories();

    UICtrl.showTotalCalories(totalCalories);

    UICtrl.hideList();




}

    return{
        init:function(){

            //clear edit state
 
            UICtrl.clearEditstate();

            console.log('Initializing app..');

            //Fetch items from data structure
            const items=ItemCtrl.getItems();
            
            //check if any items
        
        if(items.length===0)
        {
            UICtrl.hideList();
        }else
        {
            UICtrl.populateItemList(items);
            const totalCalories=ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);

        }
                

         
            //load event listeners

            loadEventListeners();
        }
    }

})(ItemCtrl,StorageCtrl,UICtrl);


//Initialize App

App.init();