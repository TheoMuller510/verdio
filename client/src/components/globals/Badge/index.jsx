// mapping des variantes sémantiques vers les classes DaisyUI
// centraliser ici pour changer une couleur sans toucher aux composants appelants
const variantClasses = {
    valide:    'badge-primary',
    attente:   'badge-accent',
    refuse:    'badge-error',
    facile:    'badge-secondary',
    moyen:     'badge-accent',
    difficile: 'badge-error',
}

export const Badge = ({ variant = 'facile', children }) => {
    return (
        <span className={`badge ${variantClasses[variant]}`}>
            {children}
        </span>
    )
}