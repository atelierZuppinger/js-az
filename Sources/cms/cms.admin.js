/*
---
name: AZ.CMS.Admin
description: 
authors: AtelierZuppinger:@fingerflow
provides: AZ.CMS.Admin
requires:
  - CMS
..
*/

AZ.CMS.Admin = new Class({
	
	options: {},
	
	Binds: ['click', 'openSection', 'closeSection', 'deleteElement'],
	
	Implements: [Options, Events],
	
	initialize: function(adminPanel){
		
		this.container = adminPanel;
		this.menus = adminPanel.getElements('#admin-bar li > button');
		this.panels = adminPanel.getElements('> section');
		this.closeButtons = adminPanel.getElements('> section .close');
		
		this.menus.addEvent('click', this.click );
		this.closeButtons.addEvent('click', this.closeSection );
		
		return this;
	},
	
	click: function(event){
		var button = event.target;
		
		if( button.get('data-href') )
			window.location.href = button.get('data-href');
		else
			this.openSection(button);
		
	},
	
	openSection: function(button){
		
		var panel = this.panels.filter( function(panel){
				return panel.get('id') == button.get('data-panel-id');
			});
		
		var panel = this.panels[this.menus.indexOf(button)],
				adminClass = panel.get('data-az-cms-class'),
				obj = AZ.CMS.Admin[adminClass],
				instance = panel.retrieve('instance');
		
		if( !instance ){
			var o = new obj(panel);
			panel.store('instance', o );
		} else{
			instance.restore();
		}
		
		this.closeSections();
		panel.setStyle('display', 'block');
		
	},
	
	closeSection: function( event ){
		
		var panel = this.panels[this.closeButtons.indexOf(event.target)];
		panel.retrieve('instance').fireEvent('close');
		panel.setStyle('display', 'none');
		
	},
	
	closeSections: function(){
		
		this.panels.setStyle('display', 'none');
		
	}
	
	

});