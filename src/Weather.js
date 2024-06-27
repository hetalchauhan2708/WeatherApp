import React, { useState } from 'react'
import searchimg from '../src/Images/search.jpg'
import clearimg from '../src/Images/clear.png'
import cloudimg from '../src/Images/clouds.jpeg'
import mistimg from '../src/Images/mist.png'
import rainimg from '../src/Images/rain.png'
import errorimg from '../src/Images/error.png'

function Weather() {
    const [inputs,setInputs] = useState("")
    const [data,setData] = useState()
    const [err,setErr] = useState()

    const API_KEY = "103e50ebb59dfc12f02fa1e6d5a10525"
    const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
  
    const HandleChange = (e) => {
        setInputs(e.target.value)
    }
    const Myfun = async () => {
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputs}&appid=${API_KEY}&units=metric`);
        const jsondata = await get.json()
        console.log(jsondata);
        setData(jsondata)

        if(inputs === ""){
            // alert("Enter City Name")
            setErr("Plase Enter Name")
        }
        else if(jsondata.cod == "404"){
            setErr("Please Enter valid name")
        }
        else{
            setErr("")
        }
        setInputs("")
    }
    return (
    <>
        <div className='container'>
            <div className='search-input'>
                <input className='inputs' value={inputs} onChange={HandleChange} type='text' placeholder='Search Citys'></input>
                <img className='imgsearch' onClick={Myfun} src={searchimg}></img>
            </div>
            <div className='weather'>
                {
                    err ?
                    <div>
                        <p>{err}</p>
                        <img src={errorimg}></img>
                    </div>
                    :""
                }
               {
                data && data.weather ?
                <div>
                    <h2>{data.name}</h2>
                    <img className='cloudImage' src={data.weather[0].main == "Clouds"? cloudimg : ""}/>
                    <img className='cloudImage' src={data.weather[0].main == "Rain"? rainimg : ""}/>
                    <img className='cloudImage' src={data.weather[0].main == "Mist"? mistimg : ""}/>
                    <img className='cloudImage' src={data.weather[0].main == "Clear"? clearimg : ""}/>
                    <img className='cloudImage' src={data.weather[0].main == "Haze"? cloudimg : ""}/>
                    <h2>{Math.trunc(data.main.temp)}°C</h2>
                    <p>{data.weather[0].description}</p>
                </div> : ""
               }
            </div>
            
        </div>
    </>
  )
}

export default Weather