
const duration = 800
export const sidebarStyle = {
transition: `width ${duration}ms`
}
export const sidebarTransitionStyles = {
entering: { width: '90px'},
entered: { width: '190px' },
exiting: { width: '190px' },
exited: { width: '90px'}
}

export const linkStyle = {
transition: `opacity ${duration}ms`
}
export const linkTransitionStyles = {
entering: { opacity: 0 },
entered:  { opacity: 1},
exiting: { opacity: 1},
exited: { opacity: 0}
}
//export default {sidebarStyle,sidebarTransitionStyles,linkStyle,linkTransitionStyles}