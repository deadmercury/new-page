import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const redirect = (link) => (window.location.href = encodeURI(link));
  const handleFormSubmit = (e) => {
    e.preventDefault();
    switch (engines[engineIdx]) {
      case 'google':
        redirect(`https://www.google.com/search?q=${searchText}`);
        break;
      case 'bing':
        redirect(`https://www.bing.com/search?q=${searchText}`);
        break;
      case 'duckduckgo':
        redirect(`https://duckduckgo.com/?q=${searchText}`);
        break;
    }
  };
  const engines = ['google', 'bing', 'duckduckgo'];
  const [engineIdx, setEngineIdx] = useState(0);
  const changeEngine = () => {
    setEngineIdx((engineIdx + 1) % 3);
  };
  return (
    <form action="/" onSubmit={handleFormSubmit} className={styles.form}>
      <span id="input_label" hidden>
        Enter your query
      </span>
      <input
        type="text"
        value={searchText}
        aria-labelledby="input_label"
        onInput={(e) => {
          setSearchText(e.target.value);
        }}
        className={styles.searchbar}
      />
      <button
        type="submit"
        aria-labelledby="button-label"
        className={styles.searchicon}
      >
        <span id="button-label" hidden>
          Enter Your Query
        </span>
        <svg
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
        </svg>
      </button>
      <button type="button" className={styles.select} onClick={changeEngine}>
        <Image
          src={`/${engines[engineIdx]}.svg`}
          width="36px"
          height="36px"
          alt={`${engines[engineIdx]} icon`}
        />
      </button>
    </form>
  );
}
