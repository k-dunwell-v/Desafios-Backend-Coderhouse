const express = require("express")
const router = express.Router()

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    
    req.session.user = username

    res.cookie('logged', username, {signed:true, maxAge:60000})
    
    res.redirect('back')
})

router.get("/logout", async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({success:'false', error:err})
        }

        res.clearCookie('logged')
        res.redirect('back')
    })
})


module.exports = router