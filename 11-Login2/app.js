const express = require("express")
const app = express()
const { Server:HttpServer } = require("http")
const httpServer = new HttpServer(app)
const { Server:ServerIo } = require("socket.io")
const io = new ServerIo(httpServer)
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const mongoStore = require('connect-mongo')

app.set("view engine", "pug")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use(cookieParser(process.env.COOKIES_SECRET || 'cwcQ9*5j3Ia0m7GFug#b'))

app.use(session({
    secret: process.env.SESSION_SECRET || 'IFnB2Q7hfqqI3w7H',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 600000 },
    store: mongoStore.create({mongoUrl: process.env.MONGO_URL || 'mongodb+srv://keith:yAk4wvBuSoPI5zO4@cluster0.ijmkqg9.mongodb.net/ecommerce', mongoOptions:{useNewUrlParser:true, useUnifiedTopology: true}})

}))

// app.use(logger('dev'))


//////////////////////////////////////////////////////
/////////////////////////LOG IN///////////////////////
//////////////////////////////////////////////////////

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

app.use(passport.initialize())
app.use(passport.session())

/////////// utils /////////

const userModel = require('./DB/usuarios.model')

const isValidePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }else{
        res.redirect('/api/login')
    }

}
////////// PASSPORT  midelware //////////

passport.use('login', new LocalStrategy(
    async ( username, password, done )=>{
        let user = await userModel.findOne({username: username})

        if (!user) {
            console.log(`No existe el usuario ${username}`)
            return done(null, false, { message: 'User not found' })
        }
            
        if (!isValidePassword(user, password)) {
            console.log('Password incorrecto')
            return done(null, false, { message: 'Password incorrect' })
        }
        
        done(null, user)
    }
))

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    let user = await userModel.findOne({username: username})

    if (user) {
        console.log(`El usuario ${username} ya existe`)
        return done(null, false, { message: 'User already exists' })
    }

    const newUser = new userModel({
        username: username,
        password: createHash(password)
    })

    await newUser.save()

    return done(null, req.body)

}))
//////////////////   passport serialize   ///////


passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user['_id'],
        username: user.username
      });
    });
  });

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

/////////////////////////////////////////////////

app.get('/api/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/api/')
    } else {
        res.render('index', {username:undefined})
    }
    
})

app.post('/api/login', passport.authenticate('login',{
    successRedirect: '/api/',
    failureRedirect: '/api/login'
}),(req, res) => { 
    res.redirect('/api/')
})

app.get('/api/signup', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/api/')
    } else {
        res.render('index', {username:'wip'})
    }
    
})

app.post('/api/signup', passport.authenticate('signup',{
    successRedirect: '/api/',
    failureRedirect: '/api/login'
}),(req, res) => {
    res.redirect('/api/')

})

app.get('/api/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect('/api/login')
    })
})

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////


const productsRouter = require('./routes/Productos')
const testRouter = require('./routes/Test')

app.use("/api/", checkAuth, productsRouter)
app.use("/api/", testRouter)


app.use( (req, res) => {
    res.status(404);
    res.send("...huh?");
})


//////////////////////////////////////////////////////
////////////////////////CLIENTE///////////////////////
//////////////////////////////////////////////////////

const ProductosDaos = require('./daos/ProductosDaos')
const db = new ProductosDaos()

// const ChatDaosFirebase = require('./daos/ChatDaosFirebase')
// const { Session } = require("inspector")
// const chatdb = new ChatDaosFirebase()

io.on('connection', (socket) => {
    console.log('Unknown bunny connected')

    db.get().then((products) => {
        socket.emit('connection', {"products": products})
    }).catch((err) => {
        console.log(err) ; throw err
    })

    // chatdb.crudChat().then((chat) => {
    //     socket.emit('connection', {"chat":chat})
    // }).catch((err) => {
    //     console.log(err) ; throw err
    // })

    // NUEVOS PRODUCTOS
    socket.on('postProduct', (product) => {
        db.add(product)
        io.emit('postProduct', product)
    })

    // // NUEVOS MENSAJES DEL CHAT
    // socket.on('chatter', (message) => {
    //     chatdb.crudChat(message)
    //     io.emit('chatter', message)
    // })
})

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

module.exports = {
    app,
    httpServer,
    io
}