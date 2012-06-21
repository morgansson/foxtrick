"use strict";
/**
 * forum-mod-link-icons.js
 * @author CatzHoek
 */

Foxtrick.modules["ForumModeratorIconLinks"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"),
	CSS: Foxtrick.InternalPath + "resources/css/forum-mod-link-icons.css",
	
	run : function(doc) {
		var modoption = doc.getElementById("cfModFunctions");
		
		if(modoption) {			
			var content = doc.getElementById("ctl00_ctl00_CPContent_pnlScrollContent");
			var popupdiv = Foxtrick.createFeaturedElement(doc, this, "div");
			Foxtrick.addClass(popupdiv, "ft-pop-up-container");
			Foxtrick.addClass(popupdiv, "ft-moderator-popup");
			Foxtrick.addClass(popupdiv, "ft-moderator-popup-align");
			var lnk = doc.createTextNode("Moderate");
			popupdiv.appendChild(lnk);
			
			content.insertBefore(popupdiv, content.firstChild);

			var ul = doc.createElement("ul");
			Foxtrick.addClass(ul, "ft-pop right");
			var content = doc.getElementById("ctl00_ctl00_CPContent_pnlScrollContent");
			var links = modoption.getElementsByTagName("a");
			for(var l = 0; l < links.length; l++){
				if(links[l].href.search("actionTypeFunctions") > -1 ){
					var actionTypeFunctions = Foxtrick.getParameterFromUrl(links[l].href, "actionTypeFunctions");
					var li = doc.createElement("li");
					var lnk_i =  links[l].cloneNode(true);
					li.appendChild(lnk_i);
					ul.appendChild(li);
					
				} else if(links[l].href.search("actionTypeWrite") > -1 ){
					var actionTypeWrite = Foxtrick.getParameterFromUrl(links[l].href, "actionTypeWrite");
					var li = doc.createElement("li");
					var lnk_i =  links[l].cloneNode(true);
					li.appendChild(lnk_i);
					ul.appendChild(li);
				}
			}
			popupdiv.appendChild(ul);
		}
	}
};
