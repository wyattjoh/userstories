var express = require('express');
var router = express.Router();
var Story = require('../resources/stories');

/* GET stories listing. */
router.get('/', function(req, res, next) {
  Story.find(function (err, stories) {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    res.render('stories', {stories: stories});
  });
});

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;

  console.log("DELETE Story({\"_id\": \"" + id + "\"})");

  Story.remove({"_id": id}, function(err) {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    res.redirect("/");
  })
});

router.get('/update/:id', function(req, res, next) {
  var id = req.params.id;

  Story.findOne({"_id": id}, function (err, story) {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    res.render('edit-stories', {story: story, next: "/stories#" + id, submit_text: "Update", submit_action: id});
  });
});

router.post('/update/:id', function(req, res, next) {
  var id = req.params.id;

  Story.update({"_id": id}, req.body, function(err) {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    res.json({"status": "ok"});
  });
});

router.get('/create', function(req, res) {
  var next = req.query.next;

  res.render('edit-stories', {story: {}, next: next, submit_text: "Create", submit_action: "create"});
});

router.post('/create', function(req, res, next) {
  var story = new Story(req.body);

  story.save(function(err, story) {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    res.json({"status": "ok", "id": story._id});
  });
});

module.exports = router;
