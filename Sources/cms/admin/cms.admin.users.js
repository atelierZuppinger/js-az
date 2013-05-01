/*
---

name: CMS.Admin.Users
description: Don't do anything yet
authors: AtelierZuppinger:@fingerflow
provides: AZ.CMS.Admin.Pannel
requires:
  - AZ/CMS.Admin

...
*/

AZ.CMS.Admin.Users = new Class({
	
	options: {},
	
	Binds: ['openSection', 'closeSection', 'deleteElement'],
	
	Implements: [Options, Events],
	
	initialize: function(container){
	
		this.container = container;
		
	},
	
	restore: function(){
		
		
		
	}
	
});