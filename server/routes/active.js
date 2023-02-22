const router = require('express').Router();
const {Active} = require('../models/active');
const {User} = require('../models/user');

router.get("/", async (req,res) => {
    const active = await Active.findOne();
    const user = await User.findOne({email: active.email});
    res.send(user)
})

router.post("/", async (req,res) => {
    await Active.deleteMany({})
})

module.exports = router;