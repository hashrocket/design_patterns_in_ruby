function Account() {
  var balance = 50;

  this.balance = function() {
    console.log("Balance is " + balance);
    return balance;
  }

  this.withdraw = function(amount) {
    console.log("Withdrawing " + amount);
  }
}

function AccountProtectionProxy(account, owner_name) {
  var subject = account;
  var methods = {};

  function check_access() { // private method
    if (owner_name != 'sandro') {
      message = "Illegal access: " + owner_name + " cannot access account."
      throw Error(message);
    }
  }

  // This function returns an anonymous function which runs
  // the check_access code and then returns the return value
  // of the delegated method.
  // We use #apply to call the account method within the context
  // (binding) of our subject (the account).
  // All functions have an #arguments object which contains the
  // arguments used to call the function.
  function method_with_access_check(method) {
    return function() {
      check_access();
      return method.apply(subject, arguments);
    }
  }

  $.each(subject, function(method_name, method) {
    methods[method_name] = method_with_access_check(method);
  });

  return methods;
}

var account = new AccountProtectionProxy(new Account, 'sandro');
var balance = account.balance();
console.log("return value from proxied balance " + balance);
account.withdraw(30);

var invalid_account = new AccountProtectionProxy(new Account, 'bob');
try {
  invalid_account.balance();
}
catch(e) { console.log(e.message); }

console.log("Account Protection Proxy finished\n\n");
