/*
---
name: AZ/CMS/admin/Pannel
description: manage admin panels.
authors: AtelierZuppinger:@fingerflow
provides: AZ.CMS.Admin.Pannel
requires:
  - AZ/CMS.admin
..
*/
AZ.CMS.Admin.Pannel = new Class({
	
	options: {
		/*oninsertFile
		  onclose*/
	},
	
	Binds: ['changeScrollableHeight'],
	
	Implements: [Options, Events],
	
	initialize: function(container){
		
		this.admin = AZ.instances.cms.Admin;
		
		this.scrollableContent = container.getElement('.scrollbars');
		this.scrollbars = false;
		this.pannel = container;
		this.fixed = this.pannel.getElement('.fixed');
		
		window.addEvent('resize', this.changeScrollableHeight );
		
		this.changeScrollableHeight.delay(40);
		
	},
	
	changeScrollableHeight: function(){
		this.scrollableContent.setStyle('height', this.getAlocatedHeight() );
		/*
		if( !this.scrollbars ){
			this.scrollbars = this.scrollableContent.scrollbars({
				barOverContent: true
			});
		}*/
	},
	
	getAlocatedHeight: function(){
		
		var fullHeight = this.pannel.getSize(),
				fixedHeight = this.fixed.getSize(),
				padding = this.pannel.getStyle('padding-bottom').toInt();
		
		return fullHeight.y - padding *4 - fixedHeight.y;
		
	}
	

});