/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);


/***/ },

/***/ 6:
/***/ function(module, exports) {

	"use strict";
	/* global decodeURIComponent */

	var Utils = {};

	Object.defineProperties(Utils,
	{
	  convertNodeListToArray:
	  {
	    /**
	     * The node list to convert to an array of nodes
	     * @param  {NodeList} nodeList The node list
	     * @return {Node[]}           The converted array of nodes
	     */
	    value: function(nodeList)
	    {
	      return Array.prototype.slice.call(nodeList, 0);
	    }
	  },
	  querySelectorAll:
	  {
	    /**
	     * Does a document.querySelectorAll but makes it into a standard array instead of
	     * a node list making it better to work with.
	     * 
	     * @param  {String} queryString The query String
	     * @return {HTMLElement[]}      A list of the html elements
	     */
	    value: function(queryString)
	    {
	      return Utils.convertNodeListToArray(document.querySelectorAll(queryString));
	    }
	  },
	  sendGetRequest:
	  {
	    value: function(url, json)
	    {
	      var request = new XMLHttpRequest();
	      request.open("GET", url, true);
	      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8; charset=UTF-8');
	      request.send(JSON.stringify(json));
	      return request;
	    }
	  },
	  sendPostRequest:
	  {
	    /**
	     * Sends a post request with the json as the data to the specified URL
	     * 
	     * @param  {String} url  The URL to send the post to
	     * @param  {Json} json A json object to send
	     * @return {XMLHttpRequest}      The requuest that was sent
	     */
	    value: function(url, json)
	    {
	      var request = new XMLHttpRequest();
	      request.open("POST", url, true);
	      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8; charset=UTF-8');
	      request.send(JSON.stringify(json));
	      return request;
	    }
	  },
	  getParameterByName:
	  {
	    /**
	     * Retrieves the value of a paramter in a URL.
	     * 
	     * @param  {String} name The name of the parameter to extract.
	     * @param  {String} url  The url to extract the paremter from.
	     * @return {String}      The parameter's value.
	     */
	    value: function(name, url)
	    {
	      if (!url)
	      {
	        url = window.location.href;
	      }
	      name = name.replace(/[\[\]]/g, "\\$&");
	      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
	      var results = regex.exec(url);
	      if (!results)
	      {
	        return null;
	      }
	      if (!results[2])
	      {
	        return '';
	      }
	      return decodeURIComponent(results[2].replace(/\+/g, " "));
	    }
	  },
	  htmlToElement:
	  {
	    /**
	     * Converts an HTML string into a DOM node.
	     * Mostly meant to be used with templates.
	     * 
	     * @param  {String} html The html string to covnert to a node.
	     * @return {DOMNode}     The resulting node from the string.
	     */
	    value: function(html)
	    {
	      var template = document.createElement("template");
	      template.innerHTML = html;
	      return template.content.firstChild;
	    }
	  },
	  escapeHTML:
	  {
	    value: function(str)
	    {
	      return String(str)
	        .replace(/&/g, '&amp;')
	        .replace(/</g, '&lt;')
	        .replace(/>/g, '&gt;')
	        .replace(/"/g, '&quot;');

	    }
	  }
	});

	module.exports = Utils;


/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Util = __webpack_require__(6);

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


/***/ }

/******/ });