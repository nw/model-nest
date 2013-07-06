



module.exports = function (model){
  
  model.on('construct', function(instance, props){
    for(var prop in model.attrs) 
      nest(prop, instance, props[prop]);
  });

  
  model.prototype.toJSON = function(){
    var obj = {}
      , attrs = this.attrs;
      
    for(var i in attrs){
      obj[i] = (attrs[i] && typeof attrs[i].toJSON === 'function') 
        ? attrs[i].toJSON()
        : attrs[i];
    }
    return obj;
  }
  
  function nest(prop, instance, val){
    var submodel = model.attrs[prop];
      
    if(!model.attrs[prop] 
      || 'function' !== typeof model.attrs[prop]
      || !model.attrs[prop].modelName) return;
      
    var sub = new submodel(val);

    sub.on('change', function(name, val, prev){
      var ns = getNS(name, sub)
        , root = ns[0]
        , path = ns[1];
        
      root.model.emit('change ' + path, root, val, prev);
      root.emit('change ' + path, val, prev);
    });

   instance[prop] = instance.attrs[prop] = sub;
   sub._parent = [prop, instance];
  }
  
}

function getNS(name, instance){
  var keys = [name];
  while(instance && instance._parent){
    keys.unshift(instance._parent[0]);
    instance = instance._parent[1];
  }
  return [instance, keys.join('.')];
}