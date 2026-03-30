// variant correspond aux classes DaisyUI : "primary", "ghost", "outline", etc.
// btn-${variant} construit dynamiquement la classe, ex: "btn btn-primary"
export const Button = ({ onClick, children, variant = "primary" }) => {
  return (
    <button onClick={onClick} className={`btn btn-${variant}`}>
      {children}
    </button>
  )
}
