// Opens the global application modal. Optional product name prefills the form.
export function openApplication(product?: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('dcb:apply', { detail: { product } }));
}
