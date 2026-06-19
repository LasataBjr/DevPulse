function ProfileStats({ user }) {
  const stats = [
    {
      label: "Repositories",
      value: user.public_repos,
    },
    {
      label: "Followers",
      value: user.followers,
    },
    {
      label: "Following",
      value: user.following,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center"
        >
          <h3 className="text-3xl font-bold text-violet-400">
            {stat.value}
          </h3>

          <p className="mt-2 text-slate-400">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProfileStats;