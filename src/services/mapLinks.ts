// Plain URL deep-links into Google Maps (opens the Maps app/site the user
// already has). This is NOT the Google Maps API — no key, no billing,
// just a normal link like any website would use.

export function openDirections(destinationAddress: string): void {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    destinationAddress
  )}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function openInGoogleMaps(address: string): void {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
