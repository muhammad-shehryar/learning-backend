const express = require("express")
const router = express.Router()
const Post = require("../models/Post")
const authMiddleware = require("../middleware/auth")


//create post
router.post("/",authMiddleware,async(req,res)=>{
    const {title,content}=req.body;
    try{
        const newPost = new Post({
            title,content,
            author:req.newPost.id,
        })
        const post = await newPost.save()
        res.json(post)
    }catch(error){
        return res.status(400).send("server error")
    }
})

//get all posts

router.get("/",async(req,res)=>{
    try{
        const allPost = await Post.find().populate('author',['name','email'])
        const post = await allPost.save()
        res.json(post)
    }catch(error){
        res.status(501).json({message:"erro"})
    }
})

//get a single post

router.get("/:id",async(req,res)=>{
    try{
        const singlepost = await Post.finById(req.params.id)

        if(!singlepost){
            return res.status(401).json({msg:"no post"})
        }
        res.json(singlepost)
    }catch(error){
        res.status(500).json({msg:"SERVER ERRIR"})
    }
})

//update a sinle post

router.put("/:id",authMiddleware,async(req,res)=>{
   const {title,content}=req.body
    try{
        const post = await Post.finById(req.params.id)

        if(!post){
            return res.status(400).json({msg:"no post found"})
        }
        const updatePost = post.finByIdAndUpdate(req.params.id,{title,content},{new:true})
        res.json(updatedPost)
    }catch(error){
        res.status(500).json({msg:"server errir"})
    }
   
})

//delete a post

router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({msg:"no post"})
        }
        if(post.author.toString() !== req.user.id){
            return res.status(404).json({msg:"server error"})
        }
        await post.remove()
        res.json({msg:"post remove"})
    }catch(error){
        console.error(error)
        res.status(500).json({msg:"erorr"})
    }
})

module.exports = router;