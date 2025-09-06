import { Router } from 'express';
import { planificacionController } from '../controllers/planificacion.controller';
import { verifyToken } from '../middlewares/auth';

const router = Router();

// Rutas para planificaciones
router.get('/usuario/:usuarioId', verifyToken, planificacionController.getAllByUsuario);
router.get('/:id', verifyToken, planificacionController.getById);
router.post('/', verifyToken, planificacionController.create);
router.put('/:id', verifyToken, planificacionController.update);
router.delete('/:id', verifyToken, planificacionController.delete);
router.post('/:id/activate', verifyToken, planificacionController.activate);

// Rutas para días planificados
router.post('/dias', verifyToken, planificacionController.createDia);
router.put('/dias/:id', verifyToken, planificacionController.updateDia);
router.delete('/dias/:id', verifyToken, planificacionController.deleteDia);
router.get('/dias/planificacion/:planificacionId', verifyToken, planificacionController.getDiasByPlanificacion);
router.get('/dias/:id', verifyToken, planificacionController.getDiaById);

export default router;