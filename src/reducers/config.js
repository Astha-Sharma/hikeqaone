export function config(
  state = {
    layout: 'default-sidebar-1',
    background: 'light',
    navbar: 'secondary',
    topNavigation: 'info',
    collapsed: false,
    logo: 'info',
    leftSidebar: 'dark',
    rightSidebar: false,
  },
  action
) {
  switch (action.type) {
    case 'SET_CONFIG':
      return Object.assign({}, state, {
        ...action.config
      })
    default:
      return state
  }
}
