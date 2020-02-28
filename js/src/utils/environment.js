export function getEnvironment() {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return`   * Platform: ${navigator.platform}
                        * Oscpu: ${navigator.oscpu}
                        * Browser CodeName: ${navigator.appCodeName}
                        * Browser Name: ${navigator.appName}
                        * Browser Version: ${navigator.appVersion}
                        * Cookies Enabled: ${navigator.cookieEnabled}
                        * Platform: ${navigator.platform}
                        * Width: ${w}
                        * Height: ${h}`;
}