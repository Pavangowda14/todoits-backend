import Comment from "../models/comment.model.js";
import * as Yup from "yup";

const schema=Yup.object().shape({
    content:Yup.string().required("comment content is required"),
    posted_at:Yup.date().required("posted date is required"),
    comment_for: Yup.string()
    .oneOf(['project', 'task'], "comment_for must be 'project' or 'task'")
    .required("comment_for is required"),
    project_id:Yup.number().positive().integer().notRequired(),
    task_id:Yup.number().positive().integer().notRequired()
})

export const createComment=async (req,res)=>{
    try {
        const validatedData=await schema.validate(req.body,{abortEarly:false});
        const comment=new Comment(validatedData)
        const data=await Comment.create(comment);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).send({
            message: "error occured while deleting comment",
            error: error.message,
          });
    }
}

export const findAllComment=async(req,res)=>{
    try{
        const data=await Comment.findAll()
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).send({
            message: "error occured while deleting comment",
            error: error.message,
          });
    }
}

export const deleteById = async (req, res) => {
    try {
      const result = await Comment.delete(req.params.id);
      res.status(200).send({ result });
    } catch (error) {
      res.status(500).send({
        message: "error occured while deleting comment",
        error: error.message,
      });
    }
  };
  
  export const updateById = async (req, res) => {
    try {
      const validatedData = await schema.validate(req.body, {
        abortEarly: false,
      });
      const result = await Comment.updateById(
        req.params.id,
        new Comment(validatedData)
      );
      res.status(200).send({ result });
    } catch (error) {
        console.log(error)
      res.status(500).send({
        message: "error occured while updating comment",
        error: error.errors,
      });
    }
  };
  
  export const findById = async (req, res) => {
    try {
      const result = await Comment.findById(req.params.id);
      res.status(200).send({ result });
    } catch (error) {
        
      res.status(500).send({
        message: "error occured while retrieving comment",
        error: error.message,
      });
    }
  };