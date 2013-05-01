/*
---

name: CMS.Admin.Files.Upload
description: manage files
authors: AtelierZuppinger:@fingerflow
provides: AZ.CMS.Admin.Files
requires:
  - AZ/CMS.Admin.Files

...
*/

AZ.CMS.Admin.Files.Upload = new Class({

	options: {
		/*onRequestSuccess:event*/
	},
	Binds: [ 'ondrop', 'onremove', 'onmouseenter', 'onmouseleave', 'fileRequestCompleted', 'submitForm'],
	Implements: [Options, Events],
	
	initialize: function(field, form, options){
		
		this.form = form;
		this.field = field;
		this.container = field.getElement('! > .drop-file');
		this.dropArea = this.container.getElement('.droppable');
		this.fileList = this.container.getElement('.file-list');
		this.requestOptions = {
			url: form.get('action'),
			onRequest: AZ.Spinner.show,
			onSuccess: this.fileRequestCompleted
		};
		
		
		
		if ('FormData' in window) this.modernUpload();
		else this.legacyUpload();
			

		
		this.field.addEvent('change', this.submitForm );
		

	},
	
	modernUpload: function(){
		
		this.form.addEvent('submit', (function(){
			
			this.parseFilesAndSend();

		}).bind(this));
		
		this.upload = new Form.MultipleFileInput(this.field, this.fileList, this.dropArea, {
				onDrop: this.ondrop,
				onDragenter: this.onmouseenter,
				onDragleave: this.onmouseleave
		});

		this.fileRequest = new Request.File(this.requestOptions);
	},
	
	legacyUpload: function(){
		
		this.upload = new iFrameFormRequest(this.form, {
			onRequest: AZ.Spinner.show,
			onComplete: this.fileRequestCompleted
		});
		
		
	},
	
	submitForm: function(){
		
		if ('FormData' in window){
			this.form.fireEvent('submit');
		} else {
			this.form.fireEvent('submit');
			this.form.submit();
		}
		
	},
	
	parseFilesAndSend: function(){
		
		this.upload.getFiles().each( (function(file){
			this.fileRequest.append('url[]', file);
		}).bind(this));
		this.fileRequest.send();
	},
	
	ondrop: function(event){
		this.onmouseleave();
		this.parseFilesAndSend();
	},
	onmouseenter: function(){
		this.dropArea.addClass('hover');
	},
	onmouseleave: function(){
		this.dropArea.removeClass('hover');
	},
	fileRequestCompleted: function(response){
		AZ.Spinner.hide();
		response = JSON.decode(response);
		
		if( response.success ){
			response.files.each( function(file){
				
				this.fireEvent('requestSuccess', file);
				
			},this);
			this.resetFileRequest();
		} else {
			
			response.notification.each( (function(notification){
				AZ.Notification.alert( notification.options.level, notification.options.message );
				this.resetFileRequest();
			}).bind(this));
		}
		
	},
	
	resetFileRequest: function(){
		
		this.upload._files = [];
		if( this.fileRequest )
			this.fileRequest.reset();
		this.form.reset();
		
		
	}
});