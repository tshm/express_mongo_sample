(function( window, $, undefined ) {
$(function() {

  var newid = 0;

  $('#new').click(function() {
    var node = $('li:last').clone( true );
    node.find('input').attr('name', newid++);
    console.log( node );
    $('ul').append( node );
  });

  $('ul').delegate('.del', 'click', function(evt) {
    var elm = $(evt.target).closest('li');
    elm.hide();
    elm.find('input').attr({ type: 'hidden', value: ''});
    console.log( elm );
  });

  $('#cancel').click(function() {
    console.log(arguments);
    window.history.back();
  });

});
})( window, $ );
