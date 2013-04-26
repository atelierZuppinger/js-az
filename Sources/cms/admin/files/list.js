AZ.CMS.Admin.Files = new Class({
	
	options: {
		/*oninsertFile
		  onclose*/
	},
	
	Extends: AZ.CMS.Admin.Pannel,
	
	Implements: [Options, Events],
	
	Binds: [ 'injectFiles', 'addFileToList', 'insertFile', 'highlight_attach_areas', "remove_highlight_attach_areas"],
	
	initialize: function(container){
	
		this.parent(container);
		
		this.field = document.id('upload-file');
		this.container = container;
		
		this.listContainer = container.getElement('#file-list');
		this.request = new Request.JSON({
			url: '/ajax/files/get_list', 
			onRequest: AZ.Spinner.show
		});
		this.base = this.container.getElement('.base');
		
		this.getFiles();
		
		this.uploader = new AZ.CMS.Admin.Files.Upload(this.field, this.field.getParent('form'));
		this.uploader.addEvent('requestSuccess', this.addFileToList);
		
		this.attachAreas = $$('.attach-file');
		
		this.listContainer.addEvent('click:relay(.insert)', this.insertFile );
		this.addEvent('close', this.remove_highlight_attach_areas);
		this.restoreDefaultInsertBehavior();
		
	},
	
	restore: function(){
		
		//this.getFiles();
		this.restoreDefaultInsertBehavior();
		
	},
	
	getFiles: function(){
		
		this.request.removeEvents('success');
		this.request.addEvent('success', this.injectFiles );
		this.request.send();
		
	},
	
	injectFiles: function(response){
		
		AZ.Spinner.hide();
		if( response.success ){
			var html = Elements.from(response.html);
			html.inject(this.listContainer );
		}
		
	},
	
	addFileToList: function( file ){
		
		var img = this.base.clone();
		img.set('data-file-id', file.id );
		img.getElement('img').set('src', file.src);
		img.removeClass('base').inject(this.listContainer);
		
		if( this.auto )
			this.insertFile({
				target: img.getElement('img')
			});
	},
	
	
	
	insertFile: function( file ){
		var list_el = file.target.getParent('.file'),
				img_el = list_el.getElement('img'),
				file_datas = {
					src: img_el.get('src'),
					id: list_el.get('data-file-id')
				};
		
		this.fireEvent('insertFile', file_datas);
		
	},
	
	restoreDefaultInsertBehavior: function(){
		this.removeEvents('insertFile');
		this.addEvent('insertFile', this.insertFromLibrary );
	},
	
	insertFromLibrary: function(file){
		this.admin.closeSections();
		this.highlight_attach_areas(file);
	},
	
	highlight_attach_areas: function(file){
		this.attachAreas.each(function(field){
			field.retrieve('behavior').fireEvent('highlight', file);
		});
	},
	
	remove_highlight_attach_areas: function(){
		this.attachAreas.each(function(field){
			field.retrieve('behavior').fireEvent('removeHighlight');
		});
	},
	
	openFinder: function(){
		this.field.click();
	},
	
	autoInsert: function(){
		this.auto = true;
	}

});