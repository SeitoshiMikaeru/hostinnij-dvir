if(!window.Promise){
    window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register("/sw.js")
        .then(() => {console.log("Service Worker is registered.")})
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default browser install prompt
    event.preventDefault();
    // Store the event to use later
    deferredPrompt = event;
    // Show the install button
    let btn = document.getElementById('installButton');
    if (btn) {
        document.getElementById('btn-wrap').style.padding = '15px';
        btn.style.display = 'block';
    }
});

document.getElementById('installButton').addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the native browser install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;
        // Hide the button regardless of the user's choice
        if(choiceResult.outcome === 'accepted') {
            document.getElementById('btn-wrap').style.display = 'none';
            document.getElementById('btn-wrap').style.padding = '0';
        }
        // Clear the deferredPrompt variable
        deferredPrompt = null;
    }
});



