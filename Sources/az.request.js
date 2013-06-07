/*
---

name: AZ.Request
description: Sends requests and trigger notification on request complete.
authors: AtelierZuppinger:@fingerflow
provides: [AZ.Request]
requires:
  - AZ/AZ
  - Core/Request.JSON
  - Notification/Notification

...
*/

AZ.Request = new Class({

	Extends: Request.JSON,
	
	onSuccess: function(){
		this.parent(arguments);
	}
	
});
