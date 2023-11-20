import './App.css'
import React, { useEffect, useState } from 'react'

 function App() {
    const [DATA,setDATA] = useState([])
    const [search,setSearch] = useState(null)
    const [textNewEl,setTextNewEl] = useState(null)
    const [dataDisplayed, setDataDisplayed] = useState([])
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response =>  response.json())
            .then(json => {
                setDataDisplayed(json);
                setDATA(json)
            })
      },[]);
    
    function SortItem () {
        dataDisplayed.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        setDataDisplayed([...dataDisplayed])
    }
    function ChangingSearch(e){
        setSearch(e.target.value)
    }
    function Search () {
        let searchData = DATA.filter(item => item.title.includes(search));
        setDataDisplayed([...searchData])
    }
    function ChangingAdd(e){
        setTextNewEl(e.target.value)
    }
    function AddNewElement () {
        console.log(DATA)
        let newAll = {
            title : textNewEl
        }
        setDATA([newAll,...DATA])
        setDataDisplayed([newAll,...DATA])
        document.getElementById('AddNewElement').value =""
        setTextNewEl("")
    }
    return (
        <div className="App">
            <div>
                <input onChange={ChangingSearch} />
                <button onClick={Search}>поиск</button>
            </div>
            <button onClick={SortItem}>sort A-Z</button>
            <div className='AddNewElement'>
                <input id='AddNewElement' onChange={ChangingAdd}/>
                <button onClick={AddNewElement}>добавить новый элемент</button>
            </div>
            <div className='AllElement'>
            {
            dataDisplayed.map((elem,index) => {
                return(
                    <div className="item" key={index} id={elem.id} loading="lazy">
                        <img 
                            src={elem.url} 
                            className='img' 
                            alt="img" 
                            width='60%' 
                            height='60%'
                            loading="lazy"
                        />
                        <p>{elem.title}</p>
                    </div>
                )
            })
            } 
            </div>  
        </div>
    );
}

export default App;
