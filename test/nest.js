var model = require('model')
  , assert = require('component-assert')
  , nest = require('model-nest');

var User = model('User')
  .use(nest)
  .attr('name', { type: 'string' })
  .attr('age', { type: 'number' })
  .attr('contact', model('Contact')
      .use(nest)
      .attr('phone', {type: 'string'})
      .attr('email', {type: 'string'})
      .attr('other', model('Other')
        .attr('twitter', {type: 'string'})));
  
describe('nesting models', function(){
  it('should allow setting nested objects', function(done){
    var user = new User({
      name: 'Joe',
      age: 13,
      contact: {
        phone: '555-555-5555', 
        email: 'joe@live.com',
        other: { twitter: 'joemoments'}
      }});
      
    assert(user.age() == 13);
    assert(user.contact.phone() == '555-555-5555');
    assert(user.contact.other.twitter() == 'joemoments');

    done();
  })
  
  it('should trigger events', function(done){
    var user = new User({
      name: 'Joe',
      age: 13,
      contact: {
        phone: '555-555-5555', 
        email: 'joe@live.com',
        other: { twitter: 'joemoments'}
      }});
      
    var count = 4;
    
    User.on('change contact.email', function(model, val, prev){
      assert(model === user); // asserts that we are indeed passing the root
      assert(val === 'joe@momma.com');
      assert(prev === 'joe@live.com');
      finish();
    })
      
    user.on('change contact.email', function(val, prev){
      assert(val === 'joe@momma.com');
      assert(prev === 'joe@live.com');
      finish();
    })
    
    User.on('change contact.other.twitter', function(model, val, prev){
      assert(model === user); // asserts that we are indeed passing the root
      assert(val === 'mommajokes');
      assert(prev === 'joemoments');
      finish();
    })
    
    user.on('change contact.other.twitter', function(val, prev){
      assert(val === 'mommajokes');
      assert(prev === 'joemoments');
      finish();
    })
    
    
    user.contact.email('joe@momma.com');
    user.contact.other.twitter('mommajokes');
    
    function finish(){
      if(--count) return done();
    }
    
  })
  
})