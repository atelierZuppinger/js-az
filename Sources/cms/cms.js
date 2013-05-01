/*
---

name: AZ.CMS
description: manages CMS behavior. Init panel and load plugin scripts
authors: AtelierZuppinger:@fingerflow
provides: [AZ.CMS]
requires:
  - AZ/AZ

...
*/

AZ.CMS = new Class({
	
	options: {},
	
	Binds: ['submit', 'success', 'deleteElement'],
	
	Implements: [Options, Events],
	
	initialize: function(){
		
		if( AZ.CMS.Admin ){
			var adminPanel = document.getElement('#admin');
			this.Admin = new AZ.CMS.Admin(adminPanel);
		}
		
		if( AZ.CMS.Form ){
			if( AZ.CMS.Form.HiddenFields )
				this.Form = new AZ.CMS.Form.HiddenFields();
			else
				this.Form = new AZ.CMS.Form();
		}
		
	}
	
});
