/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/orders';
const router = express.Router();

router.get('/getorders', controller.getOrders);
router.get('/getsingorder/:id', controller.getSingleOrder);
router.delete('/deleteorder/:id', controller.deleteOrder);
router.post('/addorder', controller.addOrder);

export = router;