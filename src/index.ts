import express from 'express';
import routineRoutes from './routes/routines.routes';
import userRoutes from './routes/user.routes';
import { logger } from './middlewares/logger';
import ejerciciosRoutes from './routes/ejercicios.routes';

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(require('./middlewares/errorHandle').errorHandler);

app.use(logger);

// Rutas
app.use('/api/routines', routineRoutes);
app.use('/api/users', userRoutes); // Sin protección
// app.use('/api/users', authMiddleware, userRoutes); // Con protección
app.use('/api/ejercicios', ejerciciosRoutes);

app.get('/', (req, res) => {
  res.send('FitFlow API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
