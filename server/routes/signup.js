const router = require('express').Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');

router.post("/",async(req,res) => {
    try{
        const {error} = validate(req.body);

        if(error)
            return res.status(400).send({message: error.details[0].message});

        const username = await User.findOne({username:req.body.username});
        if(username)
            return res.status(409).send({message: "Username is not available"})
            
        const email = await User.findOne({email:req.body.email});
        if(email)
            return res.status(409).send({message: "User with given email already exist"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message:'User created successfully'});

    }catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
})

router.get("/", async(req,res)=> {
    const users = await User.find();
    res.send(users)
})

router.get("/active", async(req,res)=> {
    const user = await User.find(req.query);
    res.send(user)
})

router.post("/bebro", async (req,res) => {
    await User.findOneAndUpdate({username:req.body.username}, {$push: {bros:req.body.bro}})
    res.send()
})

router.post("/bebront", async (req,res) => {
    await User.findOneAndUpdate({username:req.body.username}, {$pull: {bros:req.body.bro}})
    await User.findOneAndUpdate({username:req.body.username}, {$pull: {bestbros:req.body.bro}})
    await User.findOneAndUpdate({username:req.body.bro}, {$pull: {bestbroingme:req.body.username}})
    res.send()
})

router.post("/bebestbro", async (req,res) => {
    await User.findOneAndUpdate({username:req.body.bro}, {$push: {bestbroingme:req.body.username}})
    await User.findOneAndUpdate({username:req.body.username}, {$push: {bestbros:req.body.bro}})
    res.send()
})

router.post("/editbio", async (req,res) => {
    await User.findOneAndUpdate({username:req.body.username}, {bio:req.body.bio})
    res.send()
})

module.exports = router;