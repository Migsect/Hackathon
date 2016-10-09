"use strict";
var Util = require("../Util");

var inputUserName = document.getElementById("input-username");
var errorMessages = document.getElementById("error-messages");

document.getElementById("button-login").addEventListener("click", function(event)
{
  errorMessages.innerHTML = "";
  var request = Util.sendPostRequest("/login",
  {
    name: inputUserName.value
  });

  request.onload = function()
  {

    console.log("Status:", request.status);
    console.log("Response:", request.responseText);
    if (request.status >= 200 && request.status < 400)
    {
      /* Forward to next page */
      window.location.replace("/games");
    }
    else
    {
      /* Error Message */
      errorMessages.innerHTML = request.responseText;
    }

  };
  request.onerror = function()
  {
    // Connection error
  };
});
