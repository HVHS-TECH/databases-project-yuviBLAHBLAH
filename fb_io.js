// common firebase functions throughout the code.//

function fb_authenticate(){
    // authenticate with Google
}

var GLOBAL_user;

function fb_login(){
 authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}

function fb_handleLogin(_user){
  if (_user) {
    console.log("user has logged in")
    HTML_OUTPUT.innerHTML = "yello " + name
    GLOBAL_user = _user; //save the user details object to a global var.
  
  } else{
    console.log("user hasnt logged in, starting popup process")
    fb_popupLogin();
  }
}

function fb_popupLogin(){
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user; 
    console.log("user has logged in")
  });
}

function fb_error(){
    // Don't forget your error handling!
    console.log("There was an error reading the message");
    console.error(error);
}
