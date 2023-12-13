function parseUserAgent() {
    const userAgent = navigator.userAgent;

    const browser = detectBrowser(userAgent);
    const browserVersion = detectBrowserVersion(userAgent);
    const ipAddressElement = document.getElementById('ipAddress'); // Get the element for IP address
    const webGLSupport = detectWebGLSupport();
    const canvasSupport = detectCanvasSupport();
    const timeZone = getTimeZone();
    const languages = getLanguages();
    
    // Use a service like ipify.org to fetch the user's IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip || "Not Available";
            ipAddressElement.textContent = ipAddress;
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
            ipAddressElement.textContent = "Not Available";
        });

    document.getElementById('userAgent').textContent = userAgent;
    document.getElementById('browser').textContent = browser;
    document.getElementById('browserVersion').textContent = browserVersion;
    document.getElementById('webGLSupport').textContent = webGLSupport;
    document.getElementById('canvasSupport').textContent = canvasSupport;
    document.getElementById('timeZone').textContent = timeZone;
    document.getElementById('languages').textContent = languages;
}

function detectBrowser(userAgent) {
    if (userAgent.includes("Chrome")) {
        return "Chrome";
    } else if (userAgent.includes("Firefox")) {
        return "Firefox";
    } else if (userAgent.includes("Safari")) {
        return "Safari";
    } else if (userAgent.includes("Edge")) {
        return "Edge";
    } else if (userAgent.includes("Opera")) {
        return "Opera";
    } else {
        return "Unknown";
    }
}

function detectBrowserVersion(userAgent) {
    // Extract and return the browser version from the user agent string
    // Example: "Chrome/94.0.4606.71"
    const match = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)\/([\d.]+)/);
    return match ? match[2] : "Unknown";
}

function detectWebGLSupport() {
    // Check if WebGL is supported in the user's browser
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return gl ? "Supported" : "Not Supported";
}

function detectCanvasSupport() {
    // Check if Canvas is supported in the user's browser
    const canvas = document.createElement('canvas');
    return canvas.getContext ? "Supported" : "Not Supported";
}

function getTimeZone() {
    // Get and return the user's time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone || "Unknown";
}

function getLanguages() {
    // Get and return the user's preferred languages
    const languages = navigator.languages || [navigator.language || navigator.userLanguage];
    return languages.join(", ") || "Unknown";
}

function detectOS() {
    const userAgent = navigator.userAgent;
    let os = "Unknown";
    
    if (userAgent.includes("Windows")) {
        os = "Windows";
    } else if (userAgent.includes("Mac OS")) {
        os = "Mac OS";
    } else if (userAgent.includes("Linux")) {
        os = "Linux";
    } else if (userAgent.includes("Android")) {
        os = "Android";
    } else if (userAgent.includes("iOS")) {
        os = "iOS";
    }
    
    return os;
}

// Usage example:
const os = detectOS();
document.getElementById('os').textContent = os;

function detectDevice(userAgent) {
    const userAgentLC = userAgent.toLowerCase();

    if (userAgentLC.includes("iphone")) {
        return "iPhone";
    } else if (userAgentLC.includes("ipad")) {
        return "iPad";
    } else if (userAgentLC.includes("android")) {
        return "Android Device";
    } else if (userAgentLC.includes("macintosh")) {
        return "Macintosh";
    } else if (userAgentLC.includes("windows")) {
        return "Windows PC";
    } else if (userAgentLC.includes("linux")) {
        return "Linux PC";
    } else {
        return "Unknown";
    }
}

// Usage example:
const userAgent = navigator.userAgent;
const device = detectDevice(userAgent);
document.getElementById('device').textContent = device;


// Trigger the user agent parsing when the page loads
window.onload = parseUserAgent;

// Function to copy the User-Agent string to the clipboard and play a sound
    function copyUserAgent() {
    const userAgentText = document.getElementById('userAgent');
    const userAgent = userAgentText.textContent;
            
    const textArea = document.createElement('textarea');
    textArea.value = userAgent;
        
    document.body.appendChild(textArea);
    textArea.select();
            
    document.execCommand('copy');
    document.body.removeChild(textArea);

     // Change the button text to indicate successful copying
    const copyButton = document.querySelector('.copy-button');
    copyButton.textContent = 'Copied!';
            
    // Play a sound when copying is done
     const audio = new Audio('copy-sound.mp3'); // Replace 'copy-sound.mp3' with your sound file
     audio.play();
 }