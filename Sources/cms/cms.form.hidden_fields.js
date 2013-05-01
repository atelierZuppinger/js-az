/*
---

name: CMS.Form.HiddenFields
description: extends CMS.Form to provide a hide method on fields
authors: AtelierZuppinger:@fingerflow
provides: AZ.CMS.Form.HiddenFields
requires:
  - AZ/CMS.Form

...
*/

AZ.CMS.Form.HiddenFields = new Class({
	
	Extends: AZ.CMS.Form,
	
	Binds: ['showField', 'hideField'],
	
	initialize: function(){
		var cms_form = this.parent();
		if( cms_form )
			this.initialize_hidden( cms_form );
		
	},
	
	initialize_hidden: function(cms_form){
		
		var hidden_fields = cms_form.getElements('.az_hidden_field');
		hidden_fields.addEvents({
			'click:relay(.add)': this.showField,
			'click:relay(.delete)': this.hideField
		});
		
		cms_form.getElements('.az_hidden_field.hidden').each( function(f){
			input = f.getElement('input').retrieve('behavior');
			input.hidden = true;
		});
		
	},
	
	showField: function( event ){
		var field = event.target.getParent('.az_hidden_field'),
				input = field.getElement('input'),
				i = input.retrieve('behavior');
		
		field.removeClass('hidden');
		i.hidden = false;
	},
	
	hideField: function( event ){
		var field = event.target.getParent('.az_hidden_field')
				input = field.getElement('input'),
				i = input.retrieve('behavior');
		
		field.addClass('hidden');
		i.hidden = true;
	}
	
});