var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors');

// cors help from https://stackoverflow.com/questions/50873764/cross-origin-read-blocking-corb

app.use(bodyParser.json());

app.use(cors({
	'allowedHeaders': ['sessionId', 'Content-Type'],
	'exposedHeaders': ['sessionId'],
	'origin': '*',
	'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
	'preflightContinue': false
  }));

Property =require('./models/property');
Processing = require('./models/processing')

//mongoose.connect('mongodb://localhost/Database', { useNewUrlParser: true })
const uri = "mongodb+srv://Yang5297:hahaha123@homeaway-gux9g.mongodb.net/homeaway?retryWrites=true";
mongoose
  .connect(
    uri.toString()
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!");
    console.log(error);
  });

var HouseArray = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"]
var prices = [499, 199, 75, 143, 324, 659, 793, 458,834,3880]


// this is to RECREATE the database
var abc = function () {

    Property.remove({}, function (err) {
        console.log('collection removed')
    });
	console.log("geenrate")
	for (i = 0 ; i < 9; i++) {
		prop = {
			status: 0,
			location: HouseArray[i],
			rentee: "empty",
			company: "empty",
			price: prices[i],
			start: 0,
			end: 0,
			image: "./images/" + i.toString() + ".jpg"
		}

		Property.create(prop, (err,Propertyz) => {
        if(err){
            throw err;
        }
    })

	}
}
abc()
//hello :)


// finds all properties
app.get('/api/property', (req, res) => {
	Property.find((err, Propertys) => {
		if(err){
			throw err;
		}
		res.json({ data: Propertys});
	});
});

// deletes a property
app.delete('/api/delete', (req, res) => {
    var prop = req.body.property.location
    console.log(prop)
    Property.remove({ location: prop }, function (err) {
        if (err) return res.json({ success: false, error: err })
        return res.json({success: true})
    });
    
})

//creates a property
app.post('/api/property', (req, res) => {
    var prop = req.body.property
    Property.create(prop, (err,Propertyz) => {
        if(err){
            throw err;
        }
        res.json(Propertyz)
    })
})


// Changes or Cancels a property. The different between this and updateData is that
// It can override everything
app.post('/api/changeData', (req, res) => {
    console.log(req.body.update.location)
    Property.findOneAndUpdate({ location: req.body.update.location }, req.body.update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true })
    });
}
)

// ONLY updates if status 0 or 2
app.post('/api/updateData', (req, res) => {
	console.log(req.body.update.location)
	Property.findOneAndUpdate({ $or: [{status: 2}, {status: 0}], location: req.body.update.location }, req.body.update, err => {
	    if (err) return res.json({ success: false, error: err });
	    return res.json({ success: true })
	});
    //return res.json({success: false})
    /*
	Property.find({location: req.body.update.location}, (err, Propertyz) => {
		myProperty = Propertyz
		console.log(myProperty[0].status)
		if(myProperty[0].status != 1) { // returns and doesn't update if true
			console.log("updating")
			Property.findOneAndUpdate({ location: req.body.update.location }, req.body.update, err => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true });
			});
		}
		else {
			console.log("rejecting")
			return res.json({ success: true });
		}
	})
	
// can only update the database if avail or processing
/*
	Property.findOneAndUpdate({ location: req.body.update.location }, req.body.update, err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});


*/
    
	}
)

app.listen(3001)
console.log('starting')