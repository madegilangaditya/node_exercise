var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    method      = require("method-override"),
    app         = express();

    mongoose.connect('mongodb://kumpul:fuckingmyass@ds157631.mlab.com:57631/kumpul');

// middleware
    app.use(method("_method"));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.set("view engine", "ejs");

    var campSchema = new mongoose.Schema({
      title: String,
      image: String,
      description: String
    })

    var Campground = mongoose.model("Campground", campSchema);

    /* Campground.create({
       title: "Bukit beranjing",
       image: "http://www.photosforclass.com/download/2602356334",
       description: "kucing lemah minggir!! "
     },
      function(err, camp){
       if(err){
         console.log(err);
       }else{
         console.log(camp);
       }
     });*/



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
 app.post("/campgrounds", function(req, res){
  var title =  req.body.title;
  var image =  req.body.image;
  var description =  req.body.description;

  var newCamp = {title: title, image: image, description: description};

  Campground.create(newCamp, function(err, newCamp){
    if (err) {
      console.log(err);
    }else{
      res.redirect("/");
    }
  });
 });

//SHOW ROUTE
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function(err, foundCamp){
    if (err){
      console.log(err);
    }else{
      res.render("show", {camp: foundCamp});
    }
  })
});

//EDIT ROUTE
app.get("/campgrounds/:id/edit", function(req, res){
  Campground.findById(req.params.id, function(err, foundCamp){
    if (err){
      console.log(err);
    }else{
      res.render("edit", {camp: foundCamp});
    }
  })
});

//UPDATE ROUTE
app.put("/campgrounds/:id", function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, update) {
    if (err) {
      console.log(err)
    }else{
      res.redirect(req.params.id);
    }
  });
});

//DELETE ROUTE
app.delete("/campgrounds/:id", function(req, res){
  Campground.findByIdAndRemove(req.params.id, req.body.camp, function(err, update) {
    if (err) {
      console.log(err)
    }else{
      res.redirect("/campgrounds");
    }
  });
});

app.listen(3000, function(err){
  if(err){
    console.log(err)
  }else{
    console.log("server starting");
  }
});
