export const allComponentContainers = {
  Button: async () => await import('../src/libs/atoms/button'),
  App: async () => await import('../src/app'),
  ButtonLegacy: async () => await import('../src/libs/atoms/button-legacy'),
  Input: async () => await import('../src/libs/atoms/input'),
  Card: async () => await import('../src/libs/molecules/card'),
  Icon: async () => await import('../src/libs/molecules/icon'),
}
