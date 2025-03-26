import { Router } from "express";
import {
    todoHomePageServe,
    todoGetHandler,
    todoPosthandler,
	 todoDeleteHandler,
	 todoPatchHandler

} from "../controller/todoController.js";

const router = Router()


router.route('/')
    .get(todoHomePageServe);


router.route('/todo')
    .get(todoGetHandler)
    .post(todoPosthandler)
	 .delete(todoDeleteHandler)
	 .patch(todoPatchHandler)



export default router