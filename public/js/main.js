var webPush = require('web-push');

var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/coyetzY-0SQ:APA91bFSfVBxDuAZn5XguIKK2GhrV3uLw4otU3Ve5iEgzgG-PX5j8nF-r8Qo0bwWVw-5xnQnu4H8b5Etc6LLZdsR5RQNGyDYE5s6rfNSvu0ZsZDDsMtNlRs9h5UjkiDtOz-C5-K6jYRO",
    "keys": {
        "p256dh": "BBYt9VzwcV2SRHvBaN1jhRzQsaIRNdtVa3lcTDrzOsHyxfzPaghH6haJVQcG3Usv4SmzFBOtH8WQm+OKnU+wGGA=",
        "auth": "iDvCtTKCxRfU5lKBGSDKtQ=="
    }
};

var payload = "Here is a payload!";

var options = {
    gcmAPIKey: 'GCM_KEY',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);