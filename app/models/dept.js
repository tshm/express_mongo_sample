var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DeptSchema = new Schema({
  name: String
});

mongoose.model('Dept', DeptSchema);

