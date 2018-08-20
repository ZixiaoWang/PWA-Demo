const publicKey = 'BEmJf3booPd0dBVThbjbOCQphKvr7MP4NRnJW554Acc_MQx6byN-ohKz9tNCY3dFMRu-qL4mcN9NNO05PCyoaXU';

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


async function registerSW() {
    if('serviceWorker' in navigator) {
        let registration = await navigator.serviceWorker.register('./sw.js');
        return registration;
    } else {
        return void 0;
    }
}

async function requestionNotificationPermission() {
    let permission = Notification.requestPermission();
    return permission;
}

window.addEventListener(
    'load',
    async (event) => {
        let registration = await registerSW();
        let permission = await requestionNotificationPermission();
        let subscription;

        if(registration) {
            window['registration'] = registration;
            subscription = await registration.pushManager.getSubscription();
            if( !subscription ) {
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlB64ToUint8Array(publicKey)
                });
            }
            console.log('Subscription', subscription)
        }
    }
)