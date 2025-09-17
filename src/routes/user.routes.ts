import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth';

const router = Router();

// // router.get('/users', verifyToken, userController.getAll);
// router.get('/users', userController.getAll);
// // router.post('/users', verifyToken, userController.create);
// router.post('/users', userController.create);
// router.put('/users/:id', verifyToken, userController.update);
// router.delete('/users/:id', verifyToken, userController.delete);

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.put('/:id/password', userController.changePassword);

// router.get('/users/filter/:nombre', filterUser);
// router.get('/users/order', ordenUser);
// router.get('/users/page', paginacionUser);

export default router;
