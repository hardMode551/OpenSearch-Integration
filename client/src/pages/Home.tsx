import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../store/store';

import Spinner from '../components/Spinner';

import styles from '../styles/Json.module.scss';
import { fetchOpenSearchData } from '../store/slices/asyncAction';

const Home = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useSelector((state: RootState) => state.openSearch);

  const fetchData = async () => {
    await dispatch(fetchOpenSearchData());
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.root}>
      <button className={styles.fetchBtn} onClick={fetchData}>
        Получение данных
      </button>

      <Link to="/table">
        <button>Просмотр в виде таблицы</button>
      </Link>

      <br />
      <div className={styles.data}>
        <h2>Data:</h2>
        {loading ? <Spinner /> : <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
};

export default Home;
