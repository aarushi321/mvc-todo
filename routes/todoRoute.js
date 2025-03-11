import { Router } from "express";
import { 
    todoHomePageServe,
    todoGetHandler,
    todoPosthandler,
} from "../controller/todoController.js";

const router = Router()


router.route('/')
    .get(todoHomePageServe);


router.route('/todo')
    .get(todoGetHandler)
    .post(todoPosthandler)



export default router