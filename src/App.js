import './App.css';
import { useEffect, useState } from 'react';
import Select from 'react-select'

function App() {
  const [datas, setDatas] = useState([])
  const [userSelect, setUserSelect] = useState("")
  const [isShow, setIsShow] = useState(false)

  const getBerries = async() => {
    const berries = await fetch("https://pokeapi.co/api/v2/berry/")
    const value = await berries.json()
    let result = value.results.map(data => {
      return {
        label: data.name,
        value: data.name
      }
    })
    setDatas(result.sort((a, b) => a.label.localeCompare(b.label)))
  }
  
  useEffect(()=> {
    getBerries()
  }, [])

  const handleSubmit = () => {
    setIsShow(state => !state)
  }

  const handleChange = (value) => {
    setUserSelect(value)
  }

  return (
    <div className="App">
      <Select className='px-10 pt-10 py-5 capitalize' options={datas} onChange={(e) => handleChange(e.value)}></Select>
      
      <button className='w-40 bg-black p-2 rounded-lg text-white' onClick={() => handleSubmit()} disabled={!userSelect}>
        {isShow ? "Hide Values" : "Show Values"}
      </button>

      <br/>
      <br/>

      <h1 className='text-4xl font-bold underline capitalize'> {isShow ? userSelect: ""} </h1>
    </div>
  );
}

export default App;