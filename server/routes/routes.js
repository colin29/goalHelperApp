const userRoutes = require('./users');
const goalRoutes = require('./goals');

const appRouter = (app, fs) => {
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });



  // run our user route module here to complete the wire up
  userRoutes(app, fs);
  goalRoutes(app, fs);


  app.use(function(req, res){
       res.send('Default route: you requested: ' + req.originalUrl);
  });
};

// this line is unchanged
module.exports = appRouter;
