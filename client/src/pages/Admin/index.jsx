import { useState } from "react"

// sections disponibles dans la sidebar
const sections = ["Challenges", "Catégories", "Utilisateurs", "Validations"]

export const Admin = () => {
  const [activeSection, setActiveSection] = useState("Challenges")

  return (
    <div className="flex min-h-screen">

      {/* sidebar de navigation */}
      <aside className="w-56 bg-base-100 border-r border-base-content/10 p-4 flex flex-col gap-1 shrink-0">
        <h2 className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-3">
          Admin panel
        </h2>
        <ul role="list" className="flex flex-col gap-1">
          {sections.map((section) => (
            <li key={section}>
              <button
                onClick={() => setActiveSection(section)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-200 text-base-content"
                }`}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* contenu principal */}
      <main className="flex-1 p-8 flex flex-col gap-6">

        {/* en-tête de section */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{activeSection}</h1>
          <button className="btn btn-primary btn-sm">+ Nouveau</button>
        </header>

        {/* tableau placeholder */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body p-0 overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Détails</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3} className="text-center text-base-content/40 text-sm py-8">
                    Aucune donnée pour le moment.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  )
}
