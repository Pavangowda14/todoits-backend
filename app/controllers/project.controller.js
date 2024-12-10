import Project from "../models/project.model.js";

export const createProject = (req, res) => {
    if (!req.body.pname || !req.body.color) {
        res.status(400).send({
            message: "All fields are required",
        });
        return;
    }

    Project.findByName(req.body.pname, (err, existingProject) => {
        if (err) {
            res.status(500).send({
                message: "Error occurred while checking for existing project",
            });
            return;
        }

        if (existingProject) {
            res.status(400).send({
                message: "A project with the same name already exists",
            });
            return;
        }

        const project = new Project({
            pname: req.body.pname,
            color: req.body.color,
            is_favorite: req.body.favorite || false,
        });

        Project.create(project, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while creating a project",
                });
            } else {
                res.status(201).send({
                    message: "Project created successfully",
                    result,
                });
            }
        });
    });
};


export const findAllProject=(req,res)=>{
    Project.findAll(req.query.name,(err,result)=>{
        if(err){
            res.status(500).send({message:"error occured while retrieving projects"})
        }
        else{
            res.status(200).send(result)
        }
    })
}

export const deleteById=(req,res)=>{
    if(!req.params.id){
        res.status(400).send({message:"id required for deletion"})
        return
    }
    Project.delete(req.params.id,(err,result)=>{
        if(err){
            res.status(500).send({message:"some error occured while deleting"})
        }
        else{
            res.status(200).send({message:"deleted succesfully",result})
        }
    })
}

export const deleteAll=(req,res)=>{
    Project.deleteAll((err,result)=>{
        if(err){
            res.status(500).send({message:"some error occured while deleting"})
        }
        else{
            res.status(200).send({message:"deleted succesfully",result})
        }
    })
}


export const updateById=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"require all the fields"})
    }
    Project.updateById(req.params.id,new Project(req.body),(err,result)=>{
        if(err){
            res.status(500).send({message:"some error occured while updating"})
        }
        else{
            res.status(201).send({message:"updated successfully",result})
        }
    })
}

export const findById=(req,res)=>{
    if(!req.params.id){
        res.status(400).send({message:"id required for retrieving"})
        return
    }
    Project.findById(req.params.id,(err,result)=>{
        if(err){
            res.status(500).send({message:"some error occurred while retrieving"})
        }
        else{
            res.status(200).send({result})
        }
    })
}