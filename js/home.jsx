/* CanYou? — Home / mode selector (minimal) */
function HomeScreen({ go, me, device }) {
  const modes = [
    { key: "vsai", title: "vs AI", icon: IconBot, tag: "Solo", desc: "Beat the machine across three timed tasks." },
    { key: "duel", title: "Duel", icon: IconSwords, tag: "1v1", desc: "Challenge a friend or a random rival." },
    { key: "catalog", title: "Catalog", icon: IconLayers, tag: "Open", desc: "Take on challenges from the community." },
  ];

  return <div className="screen fade min-fill">
    <div className="pad">
      <div className="eyebrow mb8">Tuesday · 6-day streak</div>
      <h1 className="display">Can you handle today?</h1>

      {/* daily drop */}
      <div className="card card-tap card-pad mt20" onClick={() => go("catalog")}>
        <div className="row between mb12">
          <span className="tag tag-accent">Daily drop</span>
          <span className="mono small">resets 14:22</span>
        </div>
        <div className="h2">No-phone afternoon — 3 hours</div>
        <div className="row between mt16">
          <div className="meta"><IconUsers size={14} /><span className="mono">3,320</span> in<span className="dot" /><span className="mono">80</span> pts</div>
          <span className="link">Accept <IconChevR size={14} /></span>
        </div>
      </div>

      {/* modes */}
      <div className="section-head mt32"><span className="eyebrow">Choose a mode</span></div>
      <div className="grid-modes">
        {modes.map((m) => { const I = m.icon;
          return <button key={m.key} className="card card-tap" onClick={() => go(m.key)}
            style={{ textAlign: "left", padding: 18, display: "flex", flexDirection: "column", gap: 16, minHeight: device === "desktop" ? 168 : "auto" }}>
            <div className="row between" style={{ alignItems: "flex-start" }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: "var(--surface-2)", border: "1px solid var(--border)", display: "grid", placeItems: "center", color: "var(--text)" }}><I size={21} /></div>
              <span className="tag" style={{ height: 20, fontSize: 10.5 }}>{m.tag}</span>
            </div>
            <div className="grow" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div className="h2">{m.title}</div>
              <div className="small mt4" style={{ lineHeight: 1.4 }}>{m.desc}</div>
            </div>
          </button>; })}
      </div>

      {/* rank progress */}
      <div className="card card-tap card-pad mt24" onClick={() => go("profile")}>
        <div className="row between mb12">
          <div className="row g10" style={{ gap: 10 }}>
            <Avatar initials={me.initials} size={32} color={me.color} />
            <div><div className="h3" style={{ fontWeight: 600 }}>{me.rank}</div><div className="small">1,180 pts to Platinum</div></div>
          </div>
          <span className="mono small">71%</span>
        </div>
        <Progress value={71} />
      </div>
    </div>
  </div>;
}
window.HomeScreen = HomeScreen;
