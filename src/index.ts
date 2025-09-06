import express from 'express';
import routineRoutes from './routes/routines.routes';
import userRoutes from './routes/user.routes';
import { logger } from './middlewares/logger';
import ejerciciosRoutes from './routes/ejercicios.routes';
import routineExercisesRoutes from './routes/routinesExercises.routes';
import { verifyToken } from './middlewares/auth';
import loginRoutes from './routes/login.routes';
import cors from 'cors';
import planificacionRoutes from './routes/planificacion.routes';
import { errorHandler } from './middlewares/errorHandle';

const app = express();
const port = 3000;
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());
app.use(require('./middlewares/errorHandle').errorHandler);

app.use(logger);

// Rutas
app.use('/api/routines', verifyToken, routineRoutes);
//app.use('/api/users', verifyToken, userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/routine-exercises', verifyToken, routineExercisesRoutes);
// app.use('/api/users', authMiddleware, userRoutes); // Con protección
app.use('/api/ejercicios', ejerciciosRoutes);
app.use('/api', loginRoutes);
app.use('/api/planificaciones', planificacionRoutes);

app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('FitFlow API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(require('./middlewares/errorHandle').errorHandler);
