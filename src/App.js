import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState,useEffect } from 'react'; 
import SearchItem from "./SearchItem";

function App() {
  const API_URL = 'http://localhost:3500/items';
  const [items,setItems]=useState([]
    );
    // [JSON.parse(localStorage.getItem('Todo'))]
const [newItem,setNewItem]=useState('');

const [search,setSearch] = useState('');

useEffect(()=>{
  const fetchItems = async()=>{
    try{
      const response = await fetch(API_URL);
      const listItems =await response.json();
      setItems(listItems);
    }catch(err){
      console.log(err.stack);
    }
  }
  (async()=>await fetchItems())();
},[])
const addItem = (item)=>{
   const id=items.length?items[items.length-1].id+1:1;
  const addNewItem = {id,checked:false,item}
  const listItems = [...items,addNewItem]
  setItems(listItems);
  // localStorage.setItem("Todo",JSON.stringify(listItems));

}

const handleCheck = (id) => {
const listItems=items.map((item)=>item.id===id?{...item,checked:!item.checked}:item) 
setItems(listItems);
// localStorage.setItem("Todo",JSON.stringify(listItems));      
};


const handleDelete = (id) => {
    const listItem=items.filter((item)=>item.id!==id) ;
    setItems(listItem); 
    // localStorage.setItem("Todo",JSON.stringify(listItem));
};

const handleSubmit=(e)=>{
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem)
    setNewItem('')
}

  return (
    <div className="App">
         <Header title="To do list"/>
         <AddItem
            newItem={newItem}
            setNewItem={setNewItem}
            handleSubmit={handleSubmit}
         /> 
         <SearchItem
         search={search}
         setSearch={setSearch}  
         />
         <Content 
         items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase())) }
         handleCheck={handleCheck}
         handleDelete={handleDelete}         
         />
         <Footer 
         length={items.length}
         />

    </div>
  );
}

export default App;
