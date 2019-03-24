const express  = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      cookieParser = require('cookie-parser'),
      acl = require('acl'),
      permissions = require('./utils/permissions.js');




const app = express()

var FileStore = require('session-file-store')(session);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(session({
  store: new FileStore(),
  secret: 'hLrQGkZWeU',
  cookie: {expires: new Date(253402300000000)}
}))

var acl_;
//Set up default mongoose connection
mongoose.connect('mongodb://localhost/slms_db',function (err) {
   if (err) throw err;
   console.log('db connected...');
   acl_ = new acl(new acl.mongodbBackend(mongoose.connection.db,"permit_"));
});




var User = require("./models/userModel.js")

User.findOne({
    email : "admin@school.com",
    password : "1234",
}).exec(function(err,user){
  if(!user){
    new User({
      email : "admin@school.com",
      password : "1234"
    }).save();
  }
});

app.get("/", (req,res)=>{
  res.sendfile(__dirname + '/public/index.html');
})

app.post('/login', (req, res) => {
  console.log(req.body);
	User.findOne({
      email : req.body.email,
      password : req.body.password
  }).exec(function(err, user) {
        if(user && !err){
          req.session.login = true;
          req.session._id   = user._id;
          res.json(user);
        }
        else
          res.sendStatus(400);
  });
});

app.get('/checkLogin',function(req,res){
  if(req.session.login){
    return res.json({'login':true});
  }else{
    return res.json({'login':false});
  }
});

app.post("/verifyEmail",function(req,res){
    console.log(req.body);
    if(req.body.email != null){
      if(req.body == req.body.email)
        return res.sendStatus(200);
      User.find({email : req.body.email},function(err,user){
        if(!err && user)
          return res.sendStatus(200);
        else
          return res.sendStatus(400);
      });
    }else{
      return res.sendStatus(400);
    }
});

app.get('/logout',function(req,res){
  req.session.destroy(function(err) {
   res.sendStatus(200);
  })
});

/* Branches */
var branches = require('./routes/branchRoutes');
app.use('/branches', branches);

/* Profiles */
var profiles = require('./routes/profileRoutes');
app.use('/profiles', profiles);

/* Actions  */
app.get("/actions",function(req,res){
  res.json(permissions);
});

/* Years  */
var years = require('./routes/yearRoutes');
app.use('/years', years);


/* Qualifications */
var qualifications = require('./routes/qualificationsRoutes.js');
app.use('/qualifications',qualifications);

/* Courses */
var courses = require('./routes/coursesRoutes.js');
app.use('/courses',courses);


/* Periods */
var periods = require('./routes/periodsRoutes.js');
app.use('/periods',periods);

/* Leave Types */
var leaveTypes = require('./routes/leaveTypesRoutes.js');
app.use('/leaveTypes',leaveTypes);


/* Users  */
var users = require('./routes/userRoutes.js');
app.use('/users', users);


/* Config */
var config = require('./routes/configRoutes.js');
app.use('/config', config);




/* attach permission */
var profileModel = require('./models/profileModel.js');
app.post("/permissions/:profileId",function(req,res){
  var id = req.params.id;
  profileModel.findOne({_id: req.params.profileId}, function (err, profile) {
      if (err) {
          return res.status(500).json({
              message: 'Error when getting profile.',
              error: err
          });
      }
      if (!profile) {
          return res.status(404).json({
              message: 'No such profile'
          });
      }
      var name = profile.name;
      for(action in req.body){
        var permit = [];
        for(type in req.body[action])
          if(req.body[action][type])
            permit.push(type)

        acl_.allow(name, action, permit);
      }
      return res.status(200).json({
          message: 'permissions granted to ' + name
      });
  });
});

app.get('/permissions/granted/:profile',function(req,res){
  acl_.whatResources(req.params.profile, function(err, permissions){
      res.json(permissions);
  })
});

app.listen(8000, () =>
	console.log('listening on port 8000!')
);
