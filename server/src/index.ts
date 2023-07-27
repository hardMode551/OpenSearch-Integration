const { Client } = require('@opensearch-project/opensearch');
import express, { Request, Response } from 'express';
const cors = require('cors');

interface item {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

// Создание экземпляра клиента OpenSearch
const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'admin',
    password: 'admin',
  },
});

const app = express();
const port = 3000;

// Использование cors() перед обработкой запросов
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Запрос к OpenSearch для получения данных
app.get('/data', async (req: Request, res: Response) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const data = await response.json(); 
    const cleanedData = data.map((item: item) => ({
      postId: item.postId,
      id: item.id,
      name: item.name,
      email: item.email,
      body: item.body,
    }))


    // Загрузка данных в OpenSearch
    for (const item of cleanedData) {
      await client.index({
        index: 'data',
        body: item,
      });
    }

    res.json(cleanedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
