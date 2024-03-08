import boardRoutes from './routes/boardRoutes';
import cardRouter from './routes/cardRoutes';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', boardRoutes);

// Use card routes under /boards/:boardId
app.use('/:boardId', cardRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
