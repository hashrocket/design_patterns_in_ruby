function User() {
  this.greet = function() {
    return 'Greetings from user';
  }

  this.say = function(msg) {
    console.log('User says: ' + msg);
  }
}

function GenericProxy(klass) {
  var subject = new klass();
  var methods = {};

  function before() {
    console.log("Running before");
  }

  function after() {
    console.log("Running after");
  }

  function proxied_method(method) {
    return function() {
      before();
      var return_value = method.apply(subject, arguments);
      after();
      return return_value;
    }
  }

  $.each(subject, function(method_name, method) {
    methods[method_name] = proxied_method(method);
  });

  return methods;
}

var user_proxy = GenericProxy(User);
console.log(user_proxy.greet());
user_proxy.say('Proxy sends arguments');

console.log("Generic Proxy finished\n\n");
