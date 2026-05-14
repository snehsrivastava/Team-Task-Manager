export const getInitials = (name = '') => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export const truncate = (str, len = 50) => {
  if (!str) return ''
  return str.length > len ? str.slice(0, len) + '...' : str
}

export const cn = (...classes) => classes.filter(Boolean).join(' ')
