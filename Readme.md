# model-nest

  Allows nesting models.

## Installation

 With component:

    $ component install nw/model-nest

## Examples

  Just `use` the plugin:
  
```js
var nest = require('model-nest')
  , model = require('model');
  
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
        

var user = new User({
  name: 'Joe',
  age: 13,
  contact: {
    phone: '555-555-5555', 
    email: 'joe@live.com',
    other: { twitter: 'joemoments'}
  }});
  
user.contact.email('new@email.com');

user.contact.other.twitter('spammer');

user.contact.phone(); // '555-555-5555';

User.on('change contact.email', function(model, val, prev){
  
})

user.on('change contact.other.twitter', function(val, prev){
  
})
```

## License

(The MIT License)

Copyright (c) 2013 Nathan White <nw@nwhite.net>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


