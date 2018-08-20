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
    }
)