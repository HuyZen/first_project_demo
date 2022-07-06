
// var express = require('express')
// var app = express()
// var path = require('path')
// var bodyParser = require('body-parser')


// const DiennangModel = require('./models/dbconnect')
// const AccountModel = require('./models/dbconnect')
// // var LocalStorage = require('node-localstorage').LocalStorage,
// // localStorage = new LocalStorage('./scratch');
// const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser');
// app.use(cookieParser()); // Note the `()
// app.use('/public',express.static(path.join(__dirname , './public')))
// app.use("/scripts", express.static(__dirname+"/node_modules/web3.js-browser/build/"));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname, './index.html'))
// })




// app.get('/service',(req,res)=>{
//     res.sendFile(path.join(__dirname, './service.html'))
// })
// app.get('/contact',(req,res)=>{
//     res.sendFile(path.join(__dirname, './contact.html'))
// })
// app.get('/about',(req,res)=>{
//     res.sendFile(path.join(__dirname, './about.html'))
// })

// app.get('/stat',(req,res,next)=>{
//     try {
//         var token = req.cookies.token   
//         var ketqua =  jwt.verify(token,'mk')
//         if(ketqua){
//             next()
//         }
//     } catch (error) {
//         return res.redirect('/')
//     }
// },(req,res,next)=>{
//     res.sendFile(path.join(__dirname, './stat.html'))
// })

// app.get('/payment',(req,res,next)=>{
//     try {
//         var token = req.cookies.token   
//         var ketqua =  jwt.verify(token,'mk')
//         if(ketqua){
//             next()
//         }
//     } catch (error) {
//         return res.redirect('/')
//     }
// },(req,res,next)=>{
//     res.sendFile(path.join(__dirname, './payment.html'))
// })

// app.get('/home',(req,res,next)=>{
//     try {
//         var token = req.cookies.token   
//         var ketqua =  jwt.verify(token,'mk')
//         if(ketqua){
//             next()
//         }
//     } catch (error) {
//         return res.redirect('/')
//     }
// },(req,res,next)=>{
//     res.sendFile(path.join(__dirname, './page.html'))
// })
// // app.get('/stat2',(req,res)=>{
// //     res.sendFile(path.join(__dirname, './stat2.php'))
// // })
// app.get('/user',(req,res)=>{
//     DiennangModel.find({
        
//     })
//     .then(data=>{
//         res.json(data)
//     }).catch(err=>{
//         res.status(500).json('loi sv')
//     })
// })



// app.post('/',(req,res,next)=>{
//     var username =  req.body.username
//     var password = req.body.password


//  AccountModel.findOne({
//     username:username,
//     password:password
// })
// .then(data=>{
//    if(data){
//      var token =  jwt.sign({
//          _id:data._id
//      },'mk')
//      return  res.json({
//          message:'thanh cong',
//          token:token
//      })
//    }
//    else{
//        return res.json('dang nhap that bai')
//    }
        
// })

// .catch(err=>{
//     res.status(500).json('fail')    
// })

// })


// app.listen(3000,()=>{
//     console.log('run');
// })




var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')


const DiennangModel = require('./models/dbconnect')
const AccountModel = require('./models/dbconnect')
// var LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { Alert } = require('react-bootstrap')
app.use(cookieParser()); // Note the `()
app.use('/public',express.static(path.join(__dirname , './public')))
app.use("/scripts", express.static(__dirname+"/node_modules/web3.js-browser/build/"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, './index.html'))
})




app.get('/service',(req,res)=>{
    res.sendFile(path.join(__dirname, './service.html'))
})
app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname, './contact.html'))
})
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname, './about.html'))
})

var checkLogin = (req,res,next)=>{
    try {
        var token = req.cookies.token   
        var ketqua =  jwt.verify(token,'mk')
        AccountModel.findOne({
            _id:ketqua
        }
        ).then(data=>{
            if(data){
                req.data= data
                next()
            }
            else{
                res.json('not permission')
            }
        })
        .catch(err=>{
            
        })
       
    } catch (error) {
        return res.redirect('/')
    }
}


app.get('/stat',checkLogin,(req,res,next)=>{
    var username = req.data.username
    if(username === 'hoangduy'){
        res.sendFile(path.join(__dirname, './stat_duy.html'))
    }
    if(username === 'minhhuy'){
        res.sendFile(path.join(__dirname, './stat_huy.html'))
    }
    if(username === 'cilphol'){
        res.sendFile(path.join(__dirname, './stat_phol.html'))
    }
})

app.get('/payment',checkLogin,(req,res,next)=>{
    var username = req.data.username
    if(username === 'hoangduy'){
        res.sendFile(path.join(__dirname, './payment_duy.html'))
    }
    if(username === 'minhhuy'){
        res.sendFile(path.join(__dirname, './payment_huy.html'))
    }
    if(username === 'cilphol'){
        res.sendFile(path.join(__dirname, './payment_phol.html'))
    }
    
})

app.get('/home',checkLogin,(req,res,next)=>{
    // res.sendFile(path.join(__dirname, './page.html'))
    var username = req.data.username
    if(username === 'hoangduy'||username === 'minhhuy'||username === 'cilphol'){
        res.sendFile(path.join(__dirname, './page.html'))
    }
    
})

app.get('/user',(req,res)=>{
    DiennangModel.find({
        
    })
    .then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json('loi sv')
    })
})


app.post('/',(req,res,next)=>{
    var username =  req.body.username
    var password = req.body.password


 AccountModel.findOne({
    username:username,
    password:password
})
.then(data=>{
   if(data){
     var token =  jwt.sign({
         _id:data._id
     },'mk')
     return  res.json({
         message:'thanh cong',
         token:token
     })
   }
   else{
       return res.json('dang nhap that bai')
   }
        
})

.catch(err=>{
    res.status(500).json('fail')    
})

app.get('/private/:token',(req,res,next)=>{
try {
    var token = req.params.token
    var ketqua =  jwt.verify(token,'mk')
    if(ketqua){
        next()
    }
} catch (error) {
    Alert('sai')
    return res.json('ban can dang nhap')
}
},(req,res,next)=>{
res.json('welcome')
})
})

app.listen(3000,()=>{
    console.log('run');
})