Object: AZ.Request {#AZ.Request}
==========================

Sends requests and trigger notification on request complete

### From code

	new AZ.Request({
		url: deleteUrl,
		onSuccess: requestSuccess,
		onError: requestError
	}).send();

### Behavior

1 Send request
2 Analyse request response
3 OnSuccess:
	3.1 notification.alert (optionnal)
	3.2 execute onSuccess()
4 OnError:
	4.1 notification.alert || notification.confirm (optionnal)
	4.2 execute onError()
5 If notification.confirm:
	5.1 send request back with confirm value
	5.2 back to step 1