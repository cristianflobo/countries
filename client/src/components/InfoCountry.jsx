import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { inicio } from '../actions/actions'

const InfoCountry = () => {
    var find = []
    const Dispatch = useDispatch()
    const info =useSelector((store =>store.countries.countrie))
    const load =useSelector((store =>store.countries.load))
    if (info.length === 0) {
        Dispatch(inicio())
    }
    const id = useParams().id
    if(load){
        console.log("info")
    find = info.find(item => item.id == id )
    console.log(find)
    }
    return (
    <div>InfoCountry
        <img src={find.imagen}></img>
    </div>
    )
    
    
}

export default InfoCountry