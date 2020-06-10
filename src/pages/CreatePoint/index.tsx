import React, { useEffect, useState } from 'react';
import './styles.css';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';

interface item {
  id: number;
  tittle: string;
  image_url: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<item[]>([]);

  const fetchItems = async () => {
    const items = await api.get('items');
    setItems(items.data);
  };

  useEffect(() => {
    fetchItems();
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

          <Map center={[-8.4672146, -35.7312247]} zoom={20.17}>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[-8.4672146, -35.7312247]} />
          </Map>

          <div className='field-group'>
            <div className='field'>
              <label htmlFor='uf'>Estado (UF)</label>
              <select name='uf' id='uf'>
                <option value='0'>Selecione um estado</option>
              </select>
            </div>

            <div className='field'>
              <label htmlFor='city'>Cidade</label>
              <select name='city' id='city'>
                <option value='0'>Selecione uma cidade</option>
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
