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
	.then(readResp => res.status(200).json(readResp))
	.catch(err => res.status(500).send(err))
}

export function todoPosthandler(req, res){
	Read('/model/data.json')
	.then(readResp => {
		readResp.push(req.body)
		return Write('/model/data.json', readResp)
	})
	.then(writeResp => {
		res.status(200).json(req.body)
	})
	.catch(err => {
		console.log(err)
		res.status(500).send('internal server error')
	})
}	
