import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

function CountryPage({ countryCode }) {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    if (countryCode) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/countries/border/${countryCode}`)
        .then((response) => setCountryData(response.data))
        .catch((error) => console.error('Error al obtener el país:', error));
    }
  }, [countryCode]);

  if (!countryData) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{countryData.name}</h2>
      <img src={countryData.flag} alt={`Flag of ${countryData.name}`} />
      <h3>Población:</h3>
      <p>{countryData.population}</p>
      <h3>Paises Limítrofes:</h3>
      <ul>
        {countryData.borders.map((border) => (
          <li key={border}>{border}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/countries`)
      .then((res) => setCountries(res.data))
      .catch((error) => console.error('Error al obtener los países:', error.message));
  }, []);

  return (
    <div className={styles.page}>
      <h1>Listado de países</h1>
      <main className={styles.main}>
        <ul>
          {countries.map((country) => (
            <li key={country.countryCode}>
              <Link href={`/countries/${country.countryCode}`}>
                <a onClick={() => setSelectedCountryCode(country.countryCode)}>{country.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      {selectedCountryCode && <CountryPage countryCode={selectedCountryCode} />}
    </div>
  );
}
