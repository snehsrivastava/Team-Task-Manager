import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  isDark: localStorage.getItem('theme') === 'dark',
  toggle: () => set((state) => {
    const next = !state.isDark
    localStorage.setItem('theme', next ? 'dark' : 'light')
    return { isDark: next }
  }),
}))
