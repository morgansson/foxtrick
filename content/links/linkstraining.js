/**
 * linksleague.js
 * Foxtrick add links to coach pages
 * @author convinced
 */

////////////////////////////////////////////////////////////////////////////////
var FoxtrickLinksTraining = {
	
    MODULE_NAME : "LinksTraining",
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	DEFAULT_ENABLED : true,
	OPTIONS : {}, 

    init : function() {
            Foxtrick.registerPageHandler( 'training',
                                          FoxtrickLinksTraining );
			Foxtrick.initOptionsLinks(this,"traininglink");
    },

    run : function( page, doc ) {

	if (doc.location.href.search(/ChangeCoach/i)>-1 || doc.location.href.search(/YouthTraining/i)>-1) {return;}
		//addExternalLinksToCoachPage
		
		var alldivs = doc.getElementsByTagName('div');
		for (var j = 0; j < alldivs.length; j++) {
			if (alldivs[j].className=="main mainRegular") {
				var Coach,TI,STA,TrainingType; 
				var alllinks = alldivs[j].getElementsByTagName('a');
				for (var i = 0; i < alllinks.length; i++) {
					if (alllinks[i].href.match(/skillshort/i)) { 
						Coach = FoxtrickHelper.getSkillLevelFromLink(alllinks[i]);
						break;
					}
				}
				STA = doc.getElementById("ctl00_CPMain_txtTrainingLevelStamina").value;
				TI = doc.getElementById("ctl00_CPMain_txtTrainingLevel").value;
				TrainingType= doc.getElementById("ctl00_CPMain_ddlTrainingType").value;
						
			
				var links = getLinks("traininglink", {"Coach":Coach,"TI":TI,"STA":STA,"TrainingType":TrainingType}, doc, this);  
                  
				if (links.length > 0) {
					var ownBoxBody = doc.createElement("div");
					var header = Foxtrickl10n.getString("foxtrick.links.boxheader" );
					var ownBoxId = "foxtrick_" + header + "_box";
					var ownBoxBodyId = "foxtrick_" + header + "_content";
					ownBoxBody.setAttribute( "id", ownBoxBodyId );
                                
					for (var k = 0; k < links.length; k++) {
						links[k].link.className ="inner";
						ownBoxBody.appendChild(doc.createTextNode(" "));
						ownBoxBody.appendChild(links[k].link);
					}
						
					Foxtrick.addBoxToSidebar( doc, header, ownBoxBody, ownBoxId, "first", "");
			                                                        
					FoxtrickLinksCustom.add( page, doc,ownBoxBody,this.MODULE_NAME );	
				}
            }
		}
    },
	
	change : function( page, doc ) {
		var header = Foxtrickl10n.getString("foxtrick.links.boxheader" );
		var ownBoxId = "foxtrick_" + header + "_content";
		if( !doc.getElementById ( ownBoxId ) ) {
			this.run( page, doc );
		}
	}, 
};