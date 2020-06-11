import React, { useEffect, useState, ChangeEvent } from 'react';
import './styles.css';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';
import axios from 'axios';

interface item {
  id: number;
  tittle: string;
  image_url: string;
}

interface state {
  id: number;
  nome: string;
  sigla: string;
}

interface city {
  id: number;
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<item[]>([]);
  const [states, setStates] = useState<state[]>([]);
  const [cities, setCities] = useState<city[]>([]);
  const [selectedStates, setSelectedStates] = useState('default');
  const [selectedCity, setSelectedCity] = useState('default');
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const fetchItems = async () => {
    const items = await api.get('items');
    setItems(items.data);
  };

  const fetchUFs = async () => {
    const states = await axios.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
    );
    setStates(states.data);
  };

  const fetchCity = async () => {
    const states = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedStates}/municipios?orderBy=nome`
    );
    setCities(states.data);
  };

  const handleSelectedState = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStates(event.target.value);
  };

  const handleSelectedCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleMapClick = (event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    fetchUFs();
  }, []);

  useEffect(() => {
    if (selectedStates === 'default') return;
    fetchCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStates]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);
  return (
    <div id='page-create-point'>
      <header>
        <img src={Logo} alt='Ecoleta' />
        <Link to='/'>
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form>
        <h1>
          Cadastro do <br />
          ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className='field'>
            <label htmlFor='name'>Nome da entidade</label>
            <input type='text' name='name' id='name' />
          </div>

          <div className='field-group'>
            <div className='field'>
              <label htmlFor='email'>E-mail</label>
              <input type='email' name='email' id='email' />
            </div>

            <div className='field'>
              <label htmlFor='whatsapp'>Whatsapp</label>
              <input type='text' name='whatsapp' id='whatsapp' />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className='field-group'>
            <div className='field'>
              <label htmlFor='uf'>Estado (UF)</label>
              <select
                onChange={handleSelectedState}
                value={selectedStates}
                name='uf'
                id='uf'
              >
                <option value='default' disabled>
                  Selecione um estado
                </option>
                {states.map((state) => (
                  <option key={state.id} value={state.sigla}>
                    {state.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className='field'>
              <label htmlFor='city'>Cidade</label>
              <select
                onChange={handleSelectedCity}
                value={selectedCity}
                name='city'
                id='city'
              >
                <option value='default'>Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className='items-grid'>
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.tittle} />
                <span>{item.tittle}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type='submit'>Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
