function autoConvertLink(n){
	console.log('Running autoConvertLink()...');
	var texts = document.querySelectorAll('*');
	for(var i in texts){
		var childs = texts[i].childNodes;
		for(var j in childs){
			if(childs[j].nodeType == Node.TEXT_NODE 
				&& childs[j].nodeValue.trim() != '' 
				&& childs[j].parentElement.getAttribute('class') != 'autoConvertLink'){
				var text = 	childs[j].nodeValue.match(/978[0-9]{10}/g);
				if(text){
					var k = 0;
					childs[j].parentElement.innerHTML = childs[j].nodeValue.replace(/978[0-9]{10}/g,function() {
						// var url = 'http://bookscouter.com/prices.php?isbn='+text[k]+'&searchbutton=Sell';
						var url = 'https://www.bookbyte.com/buyback2.aspx?isbns='+text[k];
						setPopover(text[k]+''+k, url);
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
autoConvertLink(0);