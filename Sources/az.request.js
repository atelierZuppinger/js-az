/*
---

name: AZ.Request
description: Sends requests and trigger notification on request complete.
authors: AtelierZuppinger:@fingerflow
provides: [AZ.Request]
requires:
  - AZ/AZ
  - Class/Class.Binds
  - Core/Class
  - Core/Element.Event
  - Core/Request.JSON
  - Notification/Notification

...
*/

AZ.Request = new Class({

	Extends: Request.JSON,

	Options: {
		/*onError*/
	},

	Binds: ['queryEnd', 'queryStart', 'onComplete'],

	pendingQuery: false,
	
	initialize: function(options){
		this.notification = AZ.Notification;
		this.addEvent('complete', this.onComplete);
		this.parent(options);
	},

	onSuccess: function(text, xml){
		if(text.success)
			this.parent(text, xml);
		else
			this.onError(text, xml);
	},

	onError: function(){
		this.fireEvent('complete', arguments).fireEvent('error', arguments).callChain();
	},

	onComplete: function(response){
		if (response.notifications)
			this.triggerNotifications(response.notifications, response.params);
	},

	triggerNotifications: function(notifications, params){

		var reSend = (function(confirmed){
			this.reSend(confirmed, params);
		}).bind(this);
		notifications.each( function(notification){
			if (notification.options.type == 'alert') {
				this.notification.alert( notification.options.level, notification.options.message, {
					duration: 2500,
					className: 'roar notification alert',
					onShow: (function(body, id){
						this.queryStart(body, id);
						this.highLightField(notification.trigger.field_name);
					}).bind(this),
					onHide: this.queryEnd
				});
			} else {
				this.notification.confirm(notification.options.level, notification.options.message, {
					onConfirm: reSend,
					duration: false,
					className: 'roar notification confirm',
					onHide: this.queryEnd,
					onShow: (function(body, id){
						this.queryStart(body, id);
					}).bind(this)
				});
			}

		}, this);

	},

	send: function(options){

		$$('.cms-field').removeClass('field-error');
		if (!this.pendingQuery){
			this.parent(options);
		} else {
			this.pendingQuery.addClass('reveal');
			(function(){
				this.pendingQuery.removeClass('reveal');
			}).delay(1000, this);
		}
	},

	reSend: function(confirmed, params){
		this.queryEnd();
		if(params)
			params.confirmed = confirmed;
		else
			params = {
				confirmed: confirmed
			};
		this.send(JSON.encode(params));
	},

	queryEnd: function(){
		this.pendingQuery = false;
	},

	queryStart: function(body, idx){
		this.pendingQuery = body;
	},

	highLightField: function(fieldName) {
		$$('.cms-field.'+fieldName).addClass('field-error');
	}
	
});
