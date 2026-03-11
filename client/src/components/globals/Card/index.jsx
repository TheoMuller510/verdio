// Composant Card basé sur les classes DaisyUI
// title : titre affiché en haut de la card
// children : contenu libre (texte, boutons, etc.)
// TODO: gestion des variantes comme les boutons à faire plus tard si besoin
export const Card = ({ title, children }) => {
    return (
        <div className="card bg-base-200">
            <div className="card-body">
                {title && <h2 className="card-title">{title}</h2>}
                {children}
            </div>
        </div>
    )
}
