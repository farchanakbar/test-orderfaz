import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AiOutlineSearch} from 'react-icons/ai';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`);
        setData(response.data.slice(0, 5));
      } catch (error) {
        setData([]);
        setError('Data not found');
      }
    };

    if (searchTerm) {
      fetchCountries();
    } else {
      setData([]);
      setError(null);
    }
  }, [searchTerm]);

  const onChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className='w-full mt-[15%] flex flex-col items-center'>
      <h1 className='text-7xl font-bold'>Country</h1>
      <span className='w-[700px] h-14 flex items-center border border-main rounded-lg mt-10 px-4'>
        <input type="text" className='w-full h-full outline-none border-none' value={searchTerm} onChange={onChange} placeholder='Type any country name' />
        <AiOutlineSearch size={27} className='text-main' />
      </span>
      {data.length > 0 && !error && <ul className='w-[700px] border shadow-md rounded-lg mt-3'>
        {data.map((item) => (
          <li key={item.name.common} className='hover:bg-[#F4F4F4]'>
            <Link to={`/detail/${item.name.common}`}>
              <p className='m-2 py-2 text-lg font-medium'>{item.name.common}</p>
            </Link>
          </li>
        ))}
      </ul>}
      {error && <ul className='w-[700px] border shadow-md rounded-lg mt-3'>
        <li className='text-lg text-red-500 font-semibold w-full px-3 py-1 hover:bg-[#F4F4F4]'>{error}</li>
      </ul>}
    </div>
  );
}

export default SearchBar;