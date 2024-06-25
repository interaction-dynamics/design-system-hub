export function useBetaLink() {
  return `mailto:${process.env.REQUEST_BETA_EMAIL}?subject=Request beta access`
}
