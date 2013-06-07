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
		this.notification = new Roar({
			position: 'upperRight',
			duration: 50000
		});
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
			
			if (notification.options.type == 'alert')
				this.notification.alert( notification.options.level, notification.options.message );
			else 
				this.notification.confirm(notification.options.level, notification.options.message, {
					onConfirm: reSend
				});

		}, this);

	}, 

	reSend: function(confirmed, params){
		params.confirmed = confirmed;
		this.send(JSON.encode(params));
	}
	
});

window.addEvent('load', function(){
	var result = document.id('result'),
		sendrequest = document.id('sendrequest'),
		success = function(response){
			console.log('success √');
		},
		error = function(response){
			console.log('error X');
		},
		request = new AZ.Request({
			url: '/ajax/notification',
			onSuccess: success,
			onError: error
		});

	sendrequest.addEvent('click', function(){
		request.send(JSON.encode({
			param: 1
		}));
	})

});