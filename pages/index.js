import React from 'react';
import styles from '../styles/Pages/Index.module.css';

import ConversionEtCalcul from '../src/components/ConversionEtCalcul';

const Home = () => {
  return (
    <div className={styles.box}>
      <ConversionEtCalcul></ConversionEtCalcul>
    </div>
  );
};

export default Home;
