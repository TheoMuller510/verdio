import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart } from "@phosphor-icons/react"
import { Avatar } from "../../globals/Avatar"

export const FeedCard = ({
  userId,
  pseudo,
  challengeIcon,
  challengeTitle,
  likes: initialLikes = 0,
}) => {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)

  // on génère les initiales de l'utilisateur pour l'avatar
  const initials = pseudo
    .split(" ")
    .map((w) => w[0].toUpperCase())
    .join("")
    .slice(0, 2)

  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1))
    setLiked((prev) => !prev)
  }

  return (
    <article className="card bg-base-100 shadow-md">
      <div className="card-body flex-row items-center gap-4 p-4">
        {/* avatar de l'utilisateur */}
        <Avatar initials={initials} size="sm" />

        {/* texte de l'action */}
        <p className="flex-1 text-sm">
          <Link
            to={`/profil/${userId}`}
            className="font-semibold hover:text-primary transition-colors"
          >
            {pseudo}
          </Link>{" "}
          a validé{" "}
          <span role="img" aria-hidden="true">
            {challengeIcon}
          </span>{" "}
          <span className="text-primary font-medium">{challengeTitle}</span>
        </p>

        {/* bouton like */}
        <button
          onClick={handleLike}
          aria-label={liked ? "Retirer le like" : "Liker"}
          className={`flex items-center gap-1 text-sm transition-colors ${liked ? "text-error" : "text-base-content/40 hover:text-error"}`}
        >
          <Heart weight={liked ? "fill" : "regular"} className="h-4 w-4" />
          <span>{likes}</span>
        </button>
      </div>
    </article>
  )
}
