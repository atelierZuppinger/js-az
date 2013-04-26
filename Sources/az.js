/*
---
name: AZ
description: manages CMS behavior. Init panel and load plugin scripts
authors: AtelierZuppinger:@fingerflow
requires:
  - Class/Class.Extra
  - CanevasLoader
..
*/

AZ = {};

Date.defineParser( "%d/%m/%Y" );
Locale.use('fr-FR');

window.addEvent('domready', function(){
	
	AZ.instances = {};

	if( document.getElement('#canvasloader-container')){
		var cl = new CanvasLoader('canvasloader-container');
		cl.setColor('#fcfcfc'); // default is '#000000'
		cl.setShape('spiral'); // default is 'oval'
		cl.setDiameter(41); // default is 40
		cl.setDensity(31); // default is 40
		cl.setSpeed(1); // default is 2
		cl.show(); // Hidden by default
		
		var spinner = document.getElement('.spinner');
		AZ.Spinner = {
			show: function(){
				spinner.addClass('load');
			},
			hide: function(){
				spinner.removeClass('load');
			}
		};
		
	}
	
	if( AZ.Users )
		AZ.instances.users = new AZ.Users();
	
	if( document.id('authentification') && AZ.Login ){
		AZ.instances.login = new AZ.Login( document.id('authentification') );
	}
	
	if( AZ.Events ){
		AZ.instances.events = new AZ.Events( document.id('event' ));
	}
	
	if( AZ.CMS ){
		AZ.instances.cms = {};
		//AZ.instances.cms = new AZ.CMS();
		if( AZ.CMS.Admin ){
			var adminPanel = document.getElement('#admin');
			AZ.instances.cms.Admin = new AZ.CMS.Admin(adminPanel);
		}
		
		if( AZ.CMS.Form ){
			if( AZ.CMS.Form.HiddenFields )
				AZ.instances.cms.Form = new AZ.CMS.Form.HiddenFields();
			else
				AZ.instances.cms.Form = new AZ.CMS.Form();
		}
	}
	
	if( AZ.Sponsors ){
		AZ.instances.sponsors = new AZ.Sponsors(document.id('sponsors'));
	}
	
	try {
		AZ.Notification = new Roar({
			position: 'upperRight',
			duration: 50000,
			onShow: AZ.Spinner.hide
		});
	} catch(e){
		
	}
	

	
});