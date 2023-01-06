import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pokedex/Pagination";
import PokeCard from "../components/pokedex/PokeCard";
import './style/pokedex.css'

const Pokedex = () => {
  const { trainer } = useSelector((state) => state);

  const [pokemons, setPokemons] = useState();
  const [types, setTypes] = useState();
  const [typeSelected, setTypeSelected] = useState("Todos los pokemones");

  const navigate = useNavigate();

  useEffect(() => {
    if (typeSelected !== "Todos los pokemones") {
      axios
        .get(typeSelected)
        .then((res) => setPokemons(res.data.pokemon.map((e) => e.pokemon)))
        .catch((err) => console.log(err));
    } else {
      const URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000";
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [typeSelected]);
  //console.log(pokemons);
  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err));
  }, []);
  //console.log(types);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim().toLowerCase();
    navigate(`/pokedex/${input}`);
  };

  const handleChange = (e) => {
    setTypeSelected(e.target.value);
    setPage(1)
  };
  //console.log(typeSelected);

  // paginacion
  const [page, setPage] = useState(1);
  const [pokePage, setPokePage] = useState(20);
  const initialPoke = (page - 1) * pokePage;
  const finalPoke = page * pokePage;
  const maxPage = pokemons && Math.ceil(pokemons.length / pokePage);

  return (
    <div className="container">
      <h2 className="titulo">Bienvenido {trainer}, aqui podras encontrar tu pokemon favorito</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" id="search" type="text" />
        <button className="button">Search</button>  
        <select className="klk" onChange={handleChange}>
        <option value={"Todos los pokemones"}>Todos los pokemones</option>
        {types?.map((type) => (
          <option key={type.url} value={type.url}>
            {type.name}
          </option>
        ))}
      </select>
      </form>
   
      <Pagination page={page} maxPage={maxPage} setPage={setPage} />
      <div className="poke-container">
        {pokemons?.slice(initialPoke, finalPoke).map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </div>
      <Pagination page={page} maxPage={maxPage} setPage={setPage} />
    </div>
  );
};

export default Pokedex;
