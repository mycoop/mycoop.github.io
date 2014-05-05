/**
 * Define core Tax object
 * 
 * Dependencies:
 * -jQuery.js
 */
var Tax = {
	/**
	 * Reference to window, always use this inside Tax functions to allow for unit testing. 
	 * 
	 * See example in Tax.getUrlPath test cases.
	 */
	wd : window,
	
	priorityCode : null,
	
	segment : null,
	
	/**
	 * Called automatically on Tax object creation
	 */
	loaded : function(jQueryLoaded) {
	    //if the jQuery object isn't available
	    if (typeof(jQuery) == 'undefined') {
	    
	        if (!jQueryLoaded) {
	            document.write("<scr" + "ipt type=\"text/javascript\" src=\"/common/js/legacy/jquery.1.7.1.min.js\"></scr" + "ipt>");
	        }
	        
	        setTimeout("Tax.loaded(true)", 50);
	    } 
	    else {         
	        $(function() {  
	            Tax.initialize();
	        });
	    }
	},
	
	/**
	 * Called automatically on document.ready
	 */
	initialize : function() {
		
	},
	
	/**
	 * Get a named url param value
	 * 
	 * @param key url param to get
	 * @param url Optionally check a given url
	 * @return value of param or null if not found
	 */
	getUrlParam : function(key, url) {
		var qs = Tax.wd.location.search;
		
		if (url) {
			var fs = url;			
		}
		else {
			var	fs = qs;
		}
		
		var prefix = key + "=";
		var begin = fs.indexOf(prefix);
		
		if (begin == -1) {
			begin = fs.indexOf(prefix);
			if (begin != 0) {
				return null;
			}
		}
		
		var end = (fs.indexOf("&",begin));
		if (end == -1) {
		  end = fs.length;
		}
		
		return unescape(fs.substring(begin + prefix.length, end));
	},
	
	/**
	 * Test if param is a function
	 * 
	 * @return true if function, false otherwise
	 */
	isFunction : function(func) {
		return (typeof func === 'function');
	},
	
	/**
	 * Test if given string contains given substring
	 * 
	 * @param string
	 * @param substring
	 * @return true if string contains substring
	 */
	strContainsSubstr : function(string, substring) {
		return string.indexOf(substring) != -1;
	},
	
	/**
	 * Return a text name consistent with pricing.xml
	 * 
	 * @param pid
	 */
	productIdToName : function(pid) {
		switch(pid.toString()) {
			case '512':
				return 'LEO';
			case '2':
				return 'BASIC';
			case '16':
				return 'DELUXE';
			case '8':
				return 'PREMIER';
			case '32':
				return 'HBIZ';
			case '4':
				return 'FFA';
			default:
				return 'unknown';
		}
	},
	
	nameToProductId : function(name) {
		switch(name) {
			case 'LEO':
				return '512';
			case 'BASIC':
				return '2';
			case 'DELUXE':
				return '16';
			case 'PREMIER':
				return '8';
			case 'HBIZ':
				return '32';
			case 'FFA':
				return '4';
			default:
				return 'unknown';
		}
	}
	
	
	
}

/**
 * Define Cookie module
 */
Tax.Cookie = {
	/**
	 * Default options - Change to affect further calls on this page that don't pass their own options
	 * 
	 * - expires : set to '' for session, number for +X days, or date object
	 * - path : set to '' for root
	 * - domain : set to '' for current domain
	 * - secure : set to true for transfer on https only
	 */
	options : {
		expires : '',
		path : '/',
		domain : 'turbotax.intuit.com',
		secure : false
	},	
		
	/**
	 * Usage: Tax.Cookie.write('the_cookie', 'the_value', { expires: 7, path: '/some/path', domain: 'turbotax.intuit.com', secure: false });
	 * 
	 * @param name
	 * @param value
	 * @param options
	 */
	write : function(name, value, options) {
		options = options || Tax.Cookie.options;
		
	    if (value === null) {
	        value = '';
	        options.expires = -1;
	    }
	    
	    var expires = '';
	    
	    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	        var date;
	        if (typeof options.expires == 'number') {
	            date = new Date();
	            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	        } else {
	            date = options.expires;
	        }
	        expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	    }
	    
	    var path = options.path ? '; path=' + (options.path) : '';
	    var domain = options.domain ? '; domain=' + (options.domain) : '';
	    var secure = options.secure ? '; secure' : '';
	    
	    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	},
	
	/**
	 * Read a cookie value
	 * 
	 * @param name
	 * @return value
	 */
	read : function(name) {
		var cookieValue = null;
		
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
	},
	
	/**
	 * Delete a cookie
	 * 
	 * Ensure path and domain options match cookie to be deleted.
	 * 
	 * @param name
	 * @param options
	 */
	remove : function(name, options) {
		Tax.Cookie.write(name, null, options);
	}
}

Tax.loaded();