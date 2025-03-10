import { Router } from "express";
import { 
    todoHomePageServe,
    todoGetHandler,
} from "../controller/todoController.js";

const router = Router()


router.route('/')
    .get(todoHomePageServe);


router.route('/todo')
    .get(todoGetHandler);



export default router