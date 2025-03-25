import path from "path"
import {
	Read,
	Write
} from '../model/helper.js'


export function todoHomePageServe(req, res){
    try{
        res.sendFile(path.join(process.cwd(), '/views/Todo.html'))
    } catch {
        res.end("internal server error")
    }
}


export function todoGetHandler(req, res){
	Read('/model/data.json')
	.then(readResp =>{
		res.status(200).json(readResp)
	})
	.catch(err => res.status(500).send(err))
}

export function todoPosthandler(req, res){
	Read('/model/data.json')
	.then(readResp => {
		readResp.push(req.body)
		return Write('/model/data.json', readResp)
	})
	.then(writeResp => {
		return res.status(200).json(req.body)
	})
	.catch(err => {
		console.log(err)
		res.status(500).send('internal server error')
	})
}

export function toDoDeleteHandler(req, res){
	Read('/model/data.json')
	.then((readResp)=>{
		let index = readResp.findIndex(value => value.id === Number(req.query.id));
		if (index !== -1) {
			readResp.splice(index, 1); // Remove item
			return Write('/model/data.json', readResp);
	  } else {
			res.status(404).send("Task not found");
			return Promise.reject("Task not found");
	  }
	})
	.then(() => {
		res.status(200).send("Task deleted successfully");
	})
	.catch(err => {
		console.error(err);
		res.status(500).send("Internal server error");
	})
	res.end();
}
