/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/users';
const router = express.Router();

router.get('/getusers', controller.getUsers);
router.get('/getsinguser/:id', controller.getSingleUser);
router.put('/updateuser/:id', controller.updateUser);
router.delete('/deleteuser/:id', controller.deleteUser);
router.post('/adduser', controller.addUser);

export = router;