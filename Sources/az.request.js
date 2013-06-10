/*
---

name: AZ.Request
description: Sends requests and trigger notification on request complete.
authors: AtelierZuppinger:@fingerflow
provides: [AZ.Request]
requires:
  - AZ/AZ
  - Core/Class
  - Core/Element.Event
  - Core/Request.JSON
  - Notification/Notification

...
*/

AZ.Request = new Class({

	Extends: Request.JSON,
	
	options: {/*
		onError: function(){},
	*/
	},
	
	initialize: function(options){
		this.notification = AZ.Notification;
		this.pending = false;
		this.parent(options);
	},

	onSuccess: function(response, xml){

		if (response.success)
			this.parent(response, xml);
		else
			this.onError(response, xml);

		if (response.notifications)
			this.triggerNotifications(response.notifications, response.params);

	},

	onError: function(response, xml){

		this.fireEvent('error', arguments);

	},

	triggerNotifications: function(notifications, params){

		var reSend = (function(confirmed){
			this.reSend(confirmed, params);
		}).bind(this);

		notifications.each( function(notification){
			if (notification.options.type == 'alert') {
				this.pending = false;
				this.notification.alert( notification.options.level, notification.options.message );
			} else {
				this.notification.confirm(notification.options.level, notification.options.message, {
					onConfirm: reSend,
					duration: false,
					onHide: (function(){
						this.pending = false;
					}).bind(this),
					onShow: (function(body, idx){
						this.pending = body;
					}).bind(this)
				});
			}

		}, this);

	},

	send: function(options){
		if (!this.pending){
			this.parent(options);
		} else {

		}
	},

	reSend: function(confirmed, params){
		this.pending = false;
		params.confirmed = confirmed;
		this.send(JSON.encode(params));
	}
	
});
