var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Dept = mongoose.model('Dept'),
  Meibo = mongoose.model('Meibo');

module.exports = function (app) {
  app.use('/', router);
};


/**
 * meibo
 */
var update = function(err, item, obj, done) {
  item.name = obj.name;
  item.dept = obj.dept;
  item.gendar = obj.gendar;
  item.dob = new Date(obj.dob);
  item.save(function(err) {
    console.log(!err ? 'updated' : err, obj);
    done();
  });
};

router.post('/edit', function(req, res, next) {
  var item = new Meibo();
  update(false, item, req.body, function() {
    res.redirect('/');
  });
});

router.post('/edit/:id', function(req, res, next) {
  Meibo.findById( req.params.id, function(err, item) {
    update(err, item, req.body, function() {
      res.redirect('/');
    });
  });
});

router.get('/edit', function(req, res, next) {
  var item = {
    name: '',
    dob: '',
    dept: '',
    gendar: ''
  };
  Dept.find(function(err, depts) {
    res.render('edit', { id: '', item: item, depts: depts });
  });
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  Dept.find(function(err, depts) {
    Meibo.findById( id, function(err, item) {
      console.log('depts', depts);
      console.log('item', item);
      res.render('edit', { id: id, item: item, depts: depts});
    });
  });
});

router.get('/', function (req, res, next) {
  Meibo.find(function (err, meibo) {
    if (err) return next(err);
    res.render('index', {
      title: 'Meibo',
      meibo: meibo
    });
  });
});

router.post('/del/:id', function(req, res, next) {
  Meibo.findById(req.params.id, function(err, item) {
    item.remove(function(err) {
      console.log( !err ? 'deleted' : err );
    });
    res.redirect('/');
  });
});

/**
 * depts
 */
router.get('/depts', function (req, res, next) {
  Dept.find(function (err, depts) {
    if (err) return next(err);
    console.log(depts);
    res.render('depts', { items: depts });
  });
});

router.post('/depts', function (req, res, next) {
  var updateItem = function(k, v) {
    Dept.findById(k, function(err, item) {
      if (v) {
        if (err) {
          item = new Dept();
        }
        item.name = v;
        item.save();
      } else {
        item.remove();
      }
    });
  };
  for ( var k in req.body ) {
    updateItem(k, req.body[k]);
  }
  res.redirect('/depts');
});

