const { default: axios } = require("axios")
import styles from './countryDetails.module.css';

export default async function CountryDetails({params}) {
    const {countryCode}=params;

    //Busqueda de los detalles del pais desde el backend
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/countries/${countryCode}`);
    const { name, borders, flagUrl, populationHistory } = res.data;

    return (
        <div className={styles.page}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.container}>
            <div className={styles.info}>
            <img src={flagUrl} alt={`Flag of ${name}`} className={styles.flag} />
            <ul className={styles.borderList}>
                <h3>Países Fronterizos:</h3>
                {borders.length > 0 ? (
                borders.map((border) => <li key={border.code}>{border.name}</li>)
                ) : (
                <li>No hay países fronterizos</li>
                )}
            </ul>
            </div>
            <div className={styles.chart}>
            <h3>Población Histórica</h3>
            <PopulationChart data={populationHistory} />
            </div>
        </div>
        </div>
    );
}

// Componente para el gráfico de población histórica
function PopulationChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No hay datos disponibles para la población histórica.</p>;
  }

  return (
    <svg width="100%" height="200">
      {/* Renderizar el gráfico aquí */}
      {/* Ejemplo básico de un gráfico de líneas */}
      {data.map((point, index) => (
        <circle
          key={index}
          cx={(index / data.length) * 100 + "%"}
          cy={200 - point.population * 0.0001 + "px"}
          r="5"
        />
      ))}
    </svg>
  );
}