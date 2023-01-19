/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/apparel';
const router = express.Router();

router.get('/getapparels', controller.getApparels);
router.get('/getsingapparel/:id', controller.getSingleApparel);
router.put('/updateapparel/:id', controller.updateApparel);
router.delete('/deleteapparel/:id', controller.deleteApparel);
router.post('/addapparel', controller.addApparel);
router.put('/updateapparelsymultiniously', controller.updateApparelSymultiniouly);
export = router;