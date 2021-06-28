export var isDark = localStorage.getItem('theme') ? true : false;
export const root = document.getElementById('root')

export function toggleDarkMode() {
  if (isDark) {
    isDark = false
    localStorage.removeItem('theme')
    document.documentElement.classList.remove('dark')
    root!.style.setProperty('background', 'rgba(253, 242, 248)')
  } else {
    isDark = true
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')
    root!.style.setProperty('background', '#374151')
  }
}

export function updateRootElementColor() {
  if (isDark) {
    root!.style.setProperty('background', '#374151')
  } else {
    root!.style.setProperty('background', 'rgba(253, 242, 248)')
  }
}
