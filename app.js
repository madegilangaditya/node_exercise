var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    app         = express();

    mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds157971.mlab.com:57971/node_exercise');

// middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.set("view engine", "ejs");

    var campSchema = new mongoose.Schema({
      title: String,
      image: String,
      description: String
    })

    var Campground = mongoose.model("Campground", campSchema);

    // Campground.create({
    //   title: "Bukit beranjing",
    //   image: "http://www.photosforclass.com/download/2602356334",
    //   description: "kucing lemah minggir!! "
    // },
    //  function(err, camp){
    //   if(err){
    //     console.log(err);
    //   }else{
    //     console.log(camp);
    //   }
    // });



// HOMEPAGE
app.get("/", function(req, res){
  res.redirect("/campgrounds");
});


// INDEX ROUTE
app.get("/campgrounds", function(req, res){

  Campground.find({}, function(err, data){
    if(err){
      console.log(err)
    }else{
      res.render("index", {camps: data});
    }
  })
});


// NEW ROUTE
app.get("/campgrounds/new", function(req, res){
  res.render("new");
});


// CREATE ROUTE
// app.post("/campgrounds", function(req, res){
//
// });

app.listen(3000, function(err){
  if(err){
    console.log(err)
  }else{
    console.log("server starting");
  }
});
