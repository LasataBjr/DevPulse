import { FiMapPin, FiBriefcase, FiLink } from "react-icons/fi";

function ProfileCard({ user }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-col items-center text-center">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="h-28 w-28 rounded-full border-4 border-violet-500"
        />

        <h2 className="mt-4 text-2xl font-bold text-white">
          {user.name || user.login}
        </h2>

        <p className="text-cyan-400">
          @{user.login}
        </p>

        {user.bio && (
          <p className="mt-3 max-w-md text-slate-400">
            {user.bio}
          </p>
        )}

        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
          {user.location && (
            <span className="flex items-center gap-1">
              <FiMapPin />
              {user.location}
            </span>
          )}

          {user.company && (
            <span className="flex items-center gap-1">
              <FiBriefcase />
              {user.company}
            </span>
          )}

          {user.blog && (
            <span className="flex items-center gap-1">
              <FiLink />
              {user.blog}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;