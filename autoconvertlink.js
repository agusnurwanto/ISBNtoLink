function autoConvertLink(n){
	console.log('Running autoConvertLink()...');
	var texts = document.querySelectorAll('*');
	for(var i in texts){
		var childs = texts[i].childNodes;
		for(var j in childs){
			if(childs[j].nodeType == Node.TEXT_NODE 
				&& childs[j].nodeValue.trim() != '' 
				&& childs[j].parentElement.getAttribute('class') != 'autoConvertLink'){
				var text = 	childs[j].nodeValue.match(/978(-?)[0-9]{10}/g);
				if(text){
					var k = 0;
					childs[j].parentElement.innerHTML = childs[j].nodeValue.replace(/978(-?)[0-9]{10}/g,function() {
						var urlPrice = 'https://www.bookbyte.com/buyback2.aspx?isbns='+text[k];
						setPopover(text[k]+''+k, urlPrice);
						var url = 'http://bookscouter.com/prices.php?isbn='+text[k]+'&searchbutton=Sell';
				        return '<a href="'+url+'" id="'+text[k]+''+k+'" target="blank" class="autoConvertLink" style="color:red; text-decoration:underline">'
				        	+text[k++]
				        	+'</a>';
				    });
				}
			}
		}
	}
	if(n<=50){
		n++;
		setTimeout(function(){ autoConvertLink(n) }, 10000);
	}
}

function setPopover(id, url){
	console.log('typeof jQuery', typeof jQuery);
	if(typeof jQuery != 'undefined'){
		var option = {
    		title: 'ISBN description', 
    		content: '<iframe frameborder="0" class="isbn-class" src="'+url+'">', 
    		html:true,
    		placement: 'right',
    		trigger: 'manual'
    	}
    	jQuery(document).ready(function($){
    		$('#'+id).popover(option)
    		.on("mouseenter", function () {
		        var _this = this;
		        $(this).popover("show");
		        $(this).siblings(".popover").on("mouseleave", function () {
		            $(_this).popover('hide');
		        });
		    });
    	});
    }else{
    	setTimeout(function(){ setPopover(id) }, 5000);
    }
}

// set library manual, without manifest.json
function setLibrary(){
	var bootsrapCSS = chrome.extension.getURL("bootsrap.min.css");
	var customCSS = chrome.extension.getURL("custom.css");
	var bootsrapJS = chrome.extension.getURL("bootsrap.min.js");
	var jquery = chrome.extension.getURL("jquery.min.js");

	(function() {
	    var css = document.createElement('link'); css.rel = 'stylesheet';
	    css.src = bootsrapCSS;
	    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('head')[0]).appendChild(css);

	    var css = document.createElement('link'); css.rel = 'stylesheet';
	    css.src = customCSS;
	    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('head')[0]).appendChild(css);
	    
	    var js = document.createElement('script'); js.type = 'text/javascript'; js.async = true;
	    js.src = jquery;
	    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('head')[0]).appendChild(js);
	    
	    var bootstrap = document.createElement('script'); bootstrap.type = 'text/javascript'; bootstrap.async = true;
	    bootstrap.src = bootsrapJS;
	    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('head')[0]).appendChild(bootstrap);
	})();
}

autoConvertLink(0);