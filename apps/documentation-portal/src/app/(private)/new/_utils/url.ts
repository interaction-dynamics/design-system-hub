export const getFigmaCallbackUrl = () =>
  `${
    window.location.host.includes('localhost')
      ? 'https://beta.design-system-hub.com'
      : window.location.origin
  }/new/figma-callback`
