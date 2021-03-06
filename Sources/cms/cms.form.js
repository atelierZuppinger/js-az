/*
---

name: AZ.CMS.Form
description: manage edit forms of admin panel
authors: AtelierZuppinger:@fingerflow
provides: AZ.CMS.Form
requires:
  - Core/DOMReady
  - AZ/AZ.CMS
  - More/Form.Validator
  - Request.JSON
  - Input/Input.Handlers

...
*/

AZ.CMS.Form = new Class({
	
	options: {},
	
	Binds: ['submit', 'success', 'deleteElement'],
	
	Implements: [Options, Events],
	
	initialize: function(){
		var cmsForm = document.id('cms-form'),
			cmsAdmin = document.id('admin');
		
		if( cmsForm ){
			this.initialize_edit_form(cmsForm);
			return cmsForm;
		}
		
		return false;
	},
	
	initialize_edit_form: function( container ){
		
		this.cancel = container.getElement('button[type="reset"]');
		this.deleteButton = container.getElement('button.delete.global');
		
		this.formValidator = new Form.Validator(container,{
			onFormValidate: this.submit
		});

		this.submitRequest = new AZ.Request({
			url: container.get('action'),
			onSuccess: this.saveSuccess,
			onRequest: AZ.Spinner.show,
			onError: AZ.Spinner.hide,
			onFailure: AZ.Spinner.hide
		});
		
		if( this.deleteButton ){
			
			this.deleteRequest = new AZ.Request({
				url: this.deleteButton.get('data-href'),
				onSuccess: this.deleteSuccess
			});
			
			this.deleteButton.addEvent('click', this.deleteElement );
			
		}
		
		
		this.cancel.addEvent('click', this.cancelForm );
		this.inputs = new Input.Handlers( container.getElements('input,select,textarea, *[data-custom-input-type]'),container );
		
	},
	
	cancelForm: function() {
		
		history.back();
	
	},
	
	deleteElement: function() {
		
		if( confirm('Voulez-vous vraiment supprimer cet évènement?') ){
			this.deleteRequest.post(JSON.encode( this.inputs.getValues() ));
		}
	
	},
	
	submit: function( passed, element, event) {
		event.stop();
		
		if( passed )
			this.submitRequest.post(JSON.encode(this.inputs.getValues()));
		else
			alert('some validation failed');
	},
	
	saveSuccess: function( response ){
		
		window.location.href=response.redirect;
	
	},
	
	deleteSuccess: function( response ){
		if( response == undefined )
			alert('Une erreur s\'est produite');
		
		if( response.success ){
			window.location.href=response.redirect;
		} else {
			alert('une erreur s\'est produite');
		}
	}
	
});