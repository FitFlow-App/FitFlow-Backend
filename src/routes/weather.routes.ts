import { Router } from 'express';
import { obtenerClima } from '../controllers/weather.controllers';
import { verifyToken } from '../middlewares/auth';

const route = Router();

route.get('/weather', verifyToken, obtenerClima);

export default route;
