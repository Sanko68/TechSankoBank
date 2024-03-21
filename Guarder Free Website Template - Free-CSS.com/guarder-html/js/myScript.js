function login(){
	
	console.log("login triggered");
const apiUrl = 'http://localhost:8081/sys-sign-api/signin';
const data = {
  accountNo: document.getElementById('username').value,
  pass: document.getElementById('password').value
};

const requestOptions = {
	
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
	"Access-Control-Allow-Credentials": "true",
    "access-control-allow-origin": 'http://localhost:8081/sys-sign-api/signin',
	"env": "local"
  },
  body: JSON.stringify(data),
};


const responses = fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
		
		window.location = 'login.html';
		console.log(JSON.stringify(data));
		alert("Invalid username or password");
		
      throw new Error('Network response was not ok');
    }
	return response.json();
    
  })
  .then(data => {
    // Display data in an HTML element
   
	//console.log(responses);
	
	var user = data.userName;
	var acnt  = data.account;
	localStorage.setItem('user',user);
	localStorage.setItem('account',acnt);

	
	return window.location.href = "about.html";

	
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

//====================================================================

function signup(){
	
	return window.location = 'signup.html';
	
};
//======================================================================

function accountOpen(){
const apiUrl = 'http://localhost:8081/sys-sign-api/signup';
const data = {
  username: document.getElementById('username').value,
  email: document.getElementById('email').value,
  contact: document.getElementById('contact').value,
  pass: document.getElementById('pass').value
};

const requestOptions = {
	
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
	"Access-Control-Allow-Credentials": "true",
    "access-control-allow-origin": 'http://localhost:8081/sys-sign-api/signup',
	"env": "local"
  },
  body: JSON.stringify(data),
};


fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
		
		window.location = 'login.html';
		
      throw new Error('Network response was not ok');
    }
    return window.location = 'login.html';
  })
  .then(data => {
    // Display data in an HTML element
    outputElement.textContent = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

//======================================================================

function populateDetails(){
	
	
	console.log("getting user details");
	
	const apiUrl = 'http://localhost:8081/sys-sign-api/populate';
const data = {
  amount : document.getElementById('amt').value,
  account: localStorage.getItem("account")
};

const requestOptions = {
	
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
	"Access-Control-Allow-Credentials": "true",
    "access-control-allow-origin": 'http://localhost:8081/sys-sign-api/populate',
	"env": "local"
  },
  
  body: JSON.stringify(data),
  
};


fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
		
		window.location = 'about.html';
		
      throw new Error('Network response was not ok');
    }
	
	
	
    return response.json();
  })
  .then(data => {
    // Display data in an HTML element
	
	var loanamt  = data.loan;
	localStorage.setItem('loan',loanamt);
	
	var amount  = data.amount;
	localStorage.setItem('amount',amount);
	
	
	window.location.reload();
	
	
  })
  .catch(error => {
    console.error('Error:', error);
  });
};


//======================================================================

function deposit(y){
	console.log("deposit triggered");
	var choice;
	if(y=='d')
	{
		console.log("d selected ");
		choice = "deposit";
	}
	else if(y=='w')
	{
		console.log("w selected ");
		choice = "withdraw";
	}
	
	
const apiUrl = 'http://localhost:8081/sys-sign-api/deposit';
const data = {
  amount : document.getElementById('amt').value,
  account: localStorage.getItem("account")
};

const requestOptions = {
	
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
	"Access-Control-Allow-Credentials": "true",
    "access-control-allow-origin": 'http://localhost:8081/sys-sign-api/deposit',
	"env": "local",
	"choice": choice
	
	
	
  },
  body: JSON.stringify(data),
};


fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
		
		window.location = 'about.html';
		alert(response.data);
		
      throw new Error('Network response was not ok');
    }
	
    return window.location = 'about.html';
  })
  .then(data => {
    // Display data in an HTML element
	
	if(choice=='withdraw')
    {
	  alert(document.getElementById('amt').value +" Withdrawn from your account");
	}
	else{
	alert(document.getElementById('amt').value +" Deposited to your account");	
	}

    outputElement.textContent = JSON.stringify(data, null, 2);
	
	
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

//==========================================================================



//==========================================================================

const handleLogout = () => {
  localStorage.removeItem('user');
  window.location.reload(true);
  window.location.replace('/');
};