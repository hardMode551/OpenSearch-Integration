import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { RootState, useAppDispatch } from '../store/store';
import { fetchOpenSearchData } from '../store/slices/asyncAction';

import styles from '../styles/TablePage.module.scss';
import Spinner from '../components/Spinner';

const TablePage = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useSelector((state: RootState) => state.openSearch);

  const navigation = useNavigate();

  // Состояние для пагинации и фильтрации
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Фильтрация данных по полю "id"
  const filteredData = data.filter((item) => searchTerm === '' || item.id === Number(searchTerm));

  // Сортировка данных по полю "id"
  const sortedData = [...filteredData].sort((a, b) => a.id - b.id);

  // Функция для изменения текущей страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    try {
      await dispatch(fetchOpenSearchData());
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // Проверка количества отображаемых данных
  const shouldDisablePagination = filteredData.length <= pageSize;

  // Конфигурация столбцов для таблицы Ant Design Table
  const columns: ColumnsType<(typeof data)[0]> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Body',
      dataIndex: 'body',
    },
  ];

  const handleDataAsId = (id: number) => {
    navigation(`/comment/${id + 1}`);
  };

  return (
    <div className={styles.root}>
      <Link to="/" className={styles.backBtn}>
        Назад
      </Link>
      <input
        type="text"
        placeholder="Поиск по id..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <Table
          onRow={(record, id: number) => {
            return {
              onClick: () => {
                handleDataAsId(id);
              },
            };
          }}
          className={styles.booking_information_table}
          columns={columns}
          dataSource={sortedData}
          pagination={
            !shouldDisablePagination && {
              total: filteredData.length,
              pageSize,
              current: currentPage,
              onChange: handlePageChange,
            }
          }
        />
      )}
    </div>
  );
};

export default TablePage;
