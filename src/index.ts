import express from 'express';
import routineRoutes from './routes/routines.routes';

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/routines', routineRoutes);

app.get('/', (req, res) => {
  res.send('FitFlow API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
