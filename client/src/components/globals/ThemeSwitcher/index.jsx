import { Sun, Moon } from "@phosphor-icons/react"

export const ThemeSwitcher = () => {
  return (
    <label className="swap swap-rotate">
      {/* cette checkbox cachée contrôle le thème via DaisyUI theme-controller */}
      <input type="checkbox" className="theme-controller" value="verdio-light" />

      {/* icône soleil — thème sombre actif */}
      <Sun className="swap-off h-6 w-6" weight="fill" />

      {/* icône lune — thème clair actif */}
      <Moon className="swap-on h-6 w-6" weight="fill" />
    </label>
  )
}
