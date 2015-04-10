var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userstories');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("database has been opened.");
});

// schema for story
var storySchema = mongoose.Schema({
    Name: String,
    Actors: String,
    Trigger: String,
    Goal: String,
    Precondition: String,
    Postcondition: String,
    BasicFlow: String,
    Exceptions: String
});

var Story = mongoose.model('Story', storySchema);

module.exports = Story;
