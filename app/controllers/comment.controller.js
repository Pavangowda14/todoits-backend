import Comment from "../models/comment.model.js";
import * as Yup from "yup";
import logger from "../utils/logger.js";

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
        logger.info("comment data created")
        res.status(201).json(data)
    } catch (error) {
      logger.error(`error occured while creating comment ${error.message}`);
        res.status(500).send({
            message: "error occured while creating comment",
            error: error.message,
          });
    }
}

export const findAllComment=async(req,res)=>{
    try{
        const data=await Comment.findAll()
        logger.info("comment data retrieved")
        res.status(200).json(data)
    }
    catch(error){
      logger.error(`error occured while retrieving comment ${error.message}`);
        res.status(500).send({
            message: "error occured while retrieving comment",
            error: error.message,
          });
    }
}

export const deleteById = async (req, res) => {
    try {
      const result = await Comment.delete(req.params.id);
      logger.info("comment deleted")
      res.status(200).send({ result });
    } catch (error) {
      logger.error(`error occured while deleting comment ${error.message}`);
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
      logger.info("comment updated")
      res.status(200).send({ result });
    } catch (error) {
      logger.error(`error occured while updating comment ${error.message}`);
      res.status(500).send({
        message: "error occured while updating comment",
        error: error.errors,
      });
    }
  };
  
  export const findById = async (req, res) => {
    try {
      const result = await Comment.findById(req.params.id);
      logger.info("comment retrieved")
      res.status(200).send({ result });
    } catch (error) {
      logger.error(`error occured while retrieving comment ${error.message}`);
      res.status(500).send({
        message: "error occured while retrieving comment",
        error: error.message,
      });
    }
  };