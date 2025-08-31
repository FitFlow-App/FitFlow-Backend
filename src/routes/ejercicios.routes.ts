import { Router } from 'express';
import { ejercicioController } from '../controllers/ejercicios.controller';

const router = Router();

router.get('/', ejercicioController.getAll);
router.get('/:id', ejercicioController.getById);
router.post('/', ejercicioController.create);
router.put('/:id', ejercicioController.update);
router.delete('/:id', ejercicioController.delete);

export default router;