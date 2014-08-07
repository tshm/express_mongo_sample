var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MeiboSchema = new Schema({
  name: String,
  gendar: String,
  dob: Date,
  dept: String
});

MeiboSchema.virtual('dobfmt')
  .get(function(){
    var yy = this.dob.getFullYear(),
      mm = ('0' + this.dob.getMonth()).substr( -2 ),
      dd = ('0' + this.dob.getDay()).substr( -2 );
    return yy + '-' + mm + '-' + dd;
  });

mongoose.model('Meibo', MeiboSchema);

