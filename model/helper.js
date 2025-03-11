import fs from 'fs'
import path from 'path'

export function Read(file){
    return new Promise((resolve, reject)=> {
        fs.readFile(path.join(process.cwd(), file), 'utf-8', (err, data)=>{
            if(err) reject('error reading file')
            if(data.length != 0) data = JSON.parse(data)
            else data = []
            resolve(data)
        })
    })
}

export function Write(file, data){
    return new Promise((resolve, reject)=>{
        fs.writeFile(path.join(process.cwd(), file), JSON.stringify(data), (err)=>{
            if(err){
                reject('error writing file')
            } else {
                resolve('done writing')
            }
        })
    })
}