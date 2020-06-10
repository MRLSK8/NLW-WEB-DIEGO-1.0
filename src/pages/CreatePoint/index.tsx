import React from 'react';
import './styles.css';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

const CreatePoint: React.FC = () => {
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
            <li>
              <img src='http://localhost:3333/uploads/oleo.svg' alt='oleo' />
              <span>Óleo de cozinha</span>
            </li>
            <li className='selected'>
              <img src='http://localhost:3333/uploads/oleo.svg' alt='oleo' />
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src='http://localhost:3333/uploads/oleo.svg' alt='oleo' />
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src='http://localhost:3333/uploads/oleo.svg' alt='oleo' />
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src='http://localhost:3333/uploads/oleo.svg' alt='oleo' />
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src='http://localhost:3333/uploads/oleo.svg' alt='oleo' />
              <span>Óleo de cozinha</span>
            </li>
          </ul>
        </fieldset>

        <button type='submit'>Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
