import path from "path"

export function todoHomePageServe(req, res){
    try{
        res.sendFile(path.resolve('/MVC-TODO/views/Todo.html'))
    } catch {
        res.end("internal server error")
    }
}


export function todoGetHandler(req, res){
    fs.readFile(path.resolve('/MVC-TODO/views/data.json'), 'utf-8', (err, data)=>{
		if(!data){
            console.log("get is handled")
			res.json([]);
		}
		else{
			try {
				const parsedData = JSON.parse(data);
				res.json(parsedData);
			} catch (parseError) {
				console.error("Error parsing JSON:", parseError);
				res.json([]);
			}
		}
	})
}
