import Task from "../models/task.model.js";

export const createTask=(req,res)=>{
    if(!req.body.content || !req.body.description || !req.body.due_date || !req.body.projectid){
        res.status(400).send({
            message:"All fields are required"
        })
    }
    const task=new Task({content:req.body.content,description:req.body.description,due_date:req.body.due_date,projectid:req.body.projectid})
    Task.create(task,(err,result)=>{
        if(err){
            res.status(500).send({
                message:"some error occured while creating a project"
            })
        }
        else{
            res.status(201).send({
                message:"Task created",
                result

            })
        }
    })
}

export const findAllTask=(req,res)=>{
    
    Task.findAll((err,result)=>{
        if(err){
            res.status(500).send({message:"error occurred"})
        }
        res.status(200).send(result)
    })
}

export const deleteById=(req,res)=>{
    if(!req.params.id){
        res.status(400).send({message:"id required for deletion"})
        return
    }
    Task.delete(req.params.id,(err,result)=>{
        if(err){
            res.status(500).send({message:"some error occured while deleting"})
        }
        else{
            res.status(200).send({message:"deleted succesfully",result})
        }
    })
}

export const updateById=(req,res)=>{
    if(!req.body.content || !req.body.description || !req.body.due_date || !req.body.projectid){
        res.status(400).send({message:"require all the fields"})
    }
    Task.updateById(req.params.id,new Task(req.body),(err,result)=>{
        if(err){
            res.status(500).send({message:"some error occured while updating"})
        }
        else{
            res.status(201).send({message:"updated successfully",result})
        }
    })
}

export const findByProjectId=(req,res)=>{
    if(!req.params.id){
        res.status(400).send({message:"id required for retrieving"})
        return
    }
    Task.findByProjectId(req.params.id,(err,result)=>{
        if(err){
            res.status(500).send({message:"some error occurred while retrieving"})
        }
        else{
            res.status(200).send({result})
        }
    })
}

export const findById=(req,res)=>{
    if(!req.params.id){
        res.status(400).send({message:"id required for retrieving"})
        return
    }
    Task.findById(req.params.id,(err,result)=>{
        if(err){
            res.status(500).send({message:"some error occurred while retrieving"})
        }
        else{
            res.status(200).send({result})
        }
    })
}