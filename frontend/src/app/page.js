import axios from 'axios';
import Link from 'next/link';
import styles from './page.module.css';

export default async function Home() {
  let countries = [];
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/countries`);
    countries = res.data;
  } catch (error) {
    console.error('Error al obtener los países:', error.message);
  }

  return (
    <div className={styles.page}>
      <h1>Listado de países</h1>
      <main className={styles.main}>
        <ul>
          {countries.map((country) => (
            <li key={country.code}>
              <Link href={`/countries/${country.code}`}>{country.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
