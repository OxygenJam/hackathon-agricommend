// Too lazy to write down the whole code, so this is 
// a modified snippet taken from W3Schools lol 

function setUser(user, remember_me) {
    
    let exdays = remember_me ? 0 : 365;

    var d = new Date();

    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    var expires = `expires=${d.toUTCString()}`;

    document.cookie = `user=${user}; ${expires}; path=/`;
    
}

function setSessionToken(user){

    let token = '';
    // Do some algo here for tokenization

    document.cookie = `session_token=${token}; path=/`;
}
  
function getCookie(cname) {

    var name = cname + "=";
    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i++) {

      var c = ca[i];
      while (c.charAt(0) == ' ') {

        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {

        return c.substring(name.length, c.length);
      }
    }
    return "";
}
  