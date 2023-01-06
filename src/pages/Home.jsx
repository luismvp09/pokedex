import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTrainerGlobal } from '../store/slices/trainer.slice';
import './style/Home.css'

const Home = () => {

 const dispatch = useDispatch()
 const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(setTrainerGlobal(e.target.name.value.trim()))
        e.target.name.value = ''
        navigate('/pokedex')
    }

  return (
    <div className='home'>
        <img className='logo__img' src="/home/pokedex.png" alt="" />
        <h1 className='titulo'>Hola entrenador</h1>
        <p className='titulo'>Para poder comezar, dame tu nombre</p>
        <form className='form' onSubmit={handleSubmit}>
            <input className='input' id='name' type="text" />
            <button className='button'>Start</button>
        </form>
    </div>
  )
}

export default Home