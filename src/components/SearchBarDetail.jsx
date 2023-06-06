import React from 'react'
import axios from 'axios';
import globe from '../assets/globe.svg'
import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import {AiOutlineArrowLeft} from 'react-icons/ai';

function SearchBarDetail() {
  
  const [country, setCountry] = useState(null);
  const [callingCode, setCallingCode] = useState('');
  const {id} = useParams()

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${id}?fullText=true`)
      .then(response => {
        setCountry(response.data[0]);
      })
      .catch(error => {
        console.log(error);
      });

    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v2/currency/dkk`);
      const data = await response.json();
      if (data.length > 0) {
        setCallingCode(data[0].callingCodes[0]);
      } else {
        console.log('No data found for IDR currency');
      }
    } catch (error) {
      console.log('Failed to fetch data from API:', error);
    }
  };


  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto mt-20'>
      <Link to='/' className='flex items-center justify-around px-4 py-3 w-[229px] bg-second rounded-md text-white'><AiOutlineArrowLeft />Back to Homepage</Link>
      <div className='flex items-center gap-3 mt-12'>
        <h1 className='text-5xl font-bold'>{country.name.common}</h1>
        <img src={country.flags.svg} width={46} height={30} className='mt-4' alt={`Flag of ${country.name.common}`} />
      </div>

      <div className='flex gap-3 text-white mt-3'>
        <span className='px-4 py-1 bg-main rounded-full'>{country.altSpellings[0]}</span>
        <span className='px-4 py-1 bg-main rounded-full'>{country.altSpellings[1]}</span>
        <span className='px-4 py-1 bg-main rounded-full'>{country.altSpellings[2]}</span>
      </div>

      <div className='mt-6 flex gap-6'>
        <div className='w-[540px] shadow-md relative overflow-hidden'>
          <h1 className='text-lg font-medium mt-4 ml-4'>LatLong</h1>
          <h1 className='text-5xl font-bold text-second mt-4 ml-4'>{`${country.latlng[0]}.0, ${country.latlng[1]}.0`}</h1>
          <img className='max-w-full scale-125 mt-14 max-h-full absolute mr-10 top-0 right-0 bottom-0 m-auto' src={globe} alt="globe" />
        </div>

        <div className='w-[540px] h-[143px] shadow-md'>
          <p className='text-lg ml-4 mt-4'>Capital: <span className='font-bold'>{country.capital}</span></p>
          <p className='text-lg ml-4'>Region : <span className='font-bold'>{country.region}</span></p>
          <p className='text-lg ml-4'>SubRegion: <span className='font-bold'>{country.subregion}</span></p>
        </div>
      </div>

      <div className='mt-10 flex gap-[350px]'>
          <div>
            <h1 className='text-lg font-medium'>Calling Code</h1>
            {callingCode && <p className='text-5xl font-bold text-second'>{callingCode}</p>}
            <p className='font-medium'><span className='underline text-second'>1 country</span> with this calling code</p>
          </div>

          <div>
            <h1 className='text-lg font-medium'>Currency</h1>
            <h1 className='text-5xl font-bold text-second'>{Object.keys(country.currencies)}</h1>
            <p className='font-medium'><span className='underline text-second'>1 country</span> with this currency</p>
          </div>
        </div>
    </div>
  )
}

export default SearchBarDetail