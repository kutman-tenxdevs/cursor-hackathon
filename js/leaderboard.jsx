/* CanYou? — Leaderboard / Top + Profile (minimal) */
function LeaderboardScreen({ me, device }) {
  const { useState } = React;
  const [scope, setScope] = useState("Global");
  const top3 = LEADERS.slice(0, 3);
  const rest = LEADERS.slice(3);

  return <div className="screen fade"><div className="pad">
    <div className="eyebrow mb8">Season 4 · ends in 12 days</div>
    <h1 className="display">Top players</h1>

    <div className="seg-line mt16">
      {["Global", "Friends", "Gold tier"].map((s) => <button key={s} className={"seg-line-btn" + (scope === s ? " on" : "")} onClick={() => setScope(s)}>{s}</button>)}
    </div>

    {/* podium */}
    <div className="row mt24" style={{ alignItems: "flex-end", justifyContent: "center", gap: 10, maxWidth: 460, marginInline: "auto" }}>
      {[top3[1], top3[0], top3[2]].map((p) => {
        const first = p.rank === 1; const h = first ? 88 : p.rank === 2 ? 66 : 52;
        return <div key={p.handle} className="col center" style={{ flex: 1, gap: 8 }}>
          <Avatar initials={p.initials} size={first ? 52 : 42} color={p.color} ring={first} />
          <div className="tac"><div className="h3" style={{ fontSize: 13 }}>{p.name.split(" ")[0]}</div><div className="mono small" style={{ color: first ? "var(--accent-text)" : "var(--text-3)" }}>{(p.pts/1000).toFixed(1)}k</div></div>
          <div style={{ width: "100%", height: h, borderRadius: "8px 8px 0 0", background: "var(--surface-2)", border: "1px solid var(--border)", borderBottom: "none", display: "grid", placeItems: "start center", paddingTop: 8 }}>
            <span className="mono" style={{ fontSize: 19, fontWeight: 700, color: first ? "var(--accent-text)" : "var(--text-3)" }}>{p.rank}</span>
          </div>
        </div>;
      })}
    </div>

    <div className="col g8 mt8" style={{ gap: 8 }}>{rest.map((p) => <LeaderRow key={p.handle} p={p} />)}</div>
  </div></div>;
}

function LeaderRow({ p }) {
  return <div className="card" style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 12,
    borderColor: p.me ? "var(--accent-line)" : "var(--border)", background: p.me ? "var(--accent-soft)" : "var(--surface)" }}>
    <span className="mono" style={{ width: 22, textAlign: "center", fontSize: 13.5, fontWeight: 600, color: p.me ? "var(--accent-text)" : "var(--text-3)" }}>{p.rank}</span>
    <Avatar initials={p.initials} size={34} color={p.color} ring={p.me} />
    <div className="grow">
      <div className="h3" style={{ fontWeight: 600 }}>{p.name}{p.me && <span className="tag tag-accent" style={{ height: 16, marginLeft: 7, fontSize: 9.5, padding: "0 6px" }}>YOU</span>}</div>
      <div className="small mono">{p.handle}</div>
    </div>
    <div className="col" style={{ alignItems: "flex-end", gap: 2 }}>
      <span className="mono" style={{ fontSize: 13.5, fontWeight: 600 }}>{p.pts.toLocaleString()}</span>
      {p.delta !== 0
        ? <span className="mono" style={{ fontSize: 10.5, color: p.delta > 0 ? "var(--easy)" : "var(--hard)", display: "flex", alignItems: "center", gap: 2 }}><IconArrowUp size={10} sw={2.4} style={{ transform: p.delta < 0 ? "rotate(180deg)" : "none" }} />{Math.abs(p.delta)}</span>
        : <span className="mono" style={{ fontSize: 10.5, color: "var(--text-4)" }}>—</span>}
    </div>
  </div>;
}

function ProfileScreen({ me, device }) {
  const cur = TIERS[2], nxt = TIERS[3];
  const prog = Math.round(((me.points - cur.min) / (nxt.min - cur.min)) * 100);
  const toNext = nxt.min - me.points;

  const badges = [["First blood", IconBolt, true], ["Streak x5", IconFlame, true], ["Duelist", IconSwords, true], ["Sharpshooter", IconTarget, true], ["Top 10", IconCrown, false], ["Marathoner", IconStar, false]];
  const activity = [["Beat AI on Hard", 180, IconBot], ["Won duel vs Yui T.", 220, IconSwords], ["Completed: Sketch coffee", 70, IconLayers]];

  return <div className="screen fade"><div className="pad">
    <div className="col center tac mt8" style={{ gap: 10 }}>
      <Avatar initials={me.initials} size={72} color={me.color} ring />
      <div><div className="h1">{me.name}</div><div className="small mono">{me.handle}</div></div>
      <div className="row g8" style={{ gap: 8 }}>
        <span className="tag"><IconMedal size={12} />{me.rank}</span>
        <span className="tag"><IconFlame size={12} />6-day streak</span>
      </div>
    </div>

    {/* tier progress */}
    <div className="card card-pad mt20">
      <div className="row between mb12">
        <div className="row g8" style={{ gap: 8 }}><span className="h3">{cur.name}</span><IconChevR size={13} style={{ color: "var(--text-4)" }} /><span className="h3" style={{ color: "var(--text-3)" }}>{nxt.name}</span></div>
        <span className="mono small">{prog}%</span>
      </div>
      <Progress value={prog} />
      <div className="row between mt12"><span className="small mono">{me.points.toLocaleString()} pts</span><span className="small">{toNext.toLocaleString()} to {nxt.name}</span></div>
    </div>

    <div className="row g12 mt16" style={{ gap: 12 }}>
      {[["Wins", "47"], ["Win rate", "68%"], ["Best streak", "14"]].map(([l, v]) => <div key={l} className="card card-pad grow tac" style={{ display: "flex", justifyContent: "center" }}><Stat label={l} value={v} /></div>)}
    </div>

    <div className="desk-row mt24">
      <div>
        <div className="section-head"><span className="eyebrow">Recent activity</span></div>
        <div className="col g8" style={{ gap: 8 }}>
          {activity.map(([t, p, I], i) => <div key={i} className="card" style={{ padding: "11px 13px", display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--surface-2)", border: "1px solid var(--border)", display: "grid", placeItems: "center", color: "var(--text-2)" }}><I size={16} /></div>
            <span className="grow small" style={{ color: "var(--text-2)" }}>{t}</span><Pts v={p} sign size={13} color="var(--accent-text)" />
          </div>)}
        </div>
      </div>
      <div>
        <div className="section-head"><span className="eyebrow">Badges</span><span className="small mono">9 / 24</span></div>
        <div className="row wrap g10" style={{ gap: 10 }}>
          {badges.map(([n, I, earned]) => <div key={n} className="col center g6" style={{ gap: 6, width: "calc(33.33% - 7px)" }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, display: "grid", placeItems: "center", background: "var(--surface)", border: "1px solid " + (earned ? "var(--border-strong)" : "var(--border-faint)"), color: earned ? "var(--text)" : "var(--text-4)", opacity: earned ? 1 : 0.55, position: "relative" }}>
              <I size={22} />{!earned && <span style={{ position: "absolute", right: 6, bottom: 6, color: "var(--text-4)" }}><IconLock size={11} /></span>}
            </div>
            <span className="small tac" style={{ fontSize: 10.5, color: earned ? "var(--text-2)" : "var(--text-4)" }}>{n}</span>
          </div>)}
        </div>
      </div>
    </div>
  </div></div>;
}

Object.assign(window, { LeaderboardScreen, ProfileScreen });
