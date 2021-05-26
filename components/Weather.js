import Image from 'next/image';
import styles from '../styles/weather.module.css';

export default function Weather({ weather }) {
  return (
    <div className={styles.container} title="Pune">
      <Image
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        width="60px"
        height="60px"
        alt="Weather Icon"
      />
      <span className={styles.temp}>{Math.round(weather.main.temp)}</span>
      <span className={styles.unit}>°C</span>
    </div>
  );
}
