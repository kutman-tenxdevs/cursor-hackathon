/* CanYou? — app shell, responsive (desktop sidebar / mobile tabs), theming */
const { useState, useEffect, useRef } = React;

function PointsReadout({ value, onClick }) {
  return <button className="points-btn" onClick={onClick}>
    <span className="points">{value.toLocaleString()}<small>pts</small></span>
  </button>;
}

const NAV = [
  { group: null,     items: [{ key: "home", label: "Home", icon: IconHome }] },
  { group: "Play",   items: [{ key: "vsai", label: "vs AI", icon: IconBot }, { key: "duel", label: "Duel", icon: IconSwords }] },
  { group: "Browse", items: [{ key: "catalog", label: "Catalog", icon: IconLayers }, { key: "leaderboard", label: "Leaderboard", icon: IconTrophy }] },
];
const TABS = [
  { key: "home", label: "Home", icon: IconHome },
  { key: "catalog", label: "Catalog", icon: IconLayers },
  { key: "leaderboard", label: "Top", icon: IconTrophy },
  { key: "profile", label: "Profile", icon: IconUser },
];

function App() {
  const [screen, setScreen] = useState("home");
  const [points, setPoints] = useState(ME.points);
  const [theme, setTheme] = useState(() => localStorage.getItem("canyou-theme") || "dark");
  const [device, setDevice] = useState(() => localStorage.getItem("canyou-device") || (window.innerWidth < 900 ? "mobile" : "desktop"));
  const [toastNode, showToast] = useToast();
  const me = { ...ME, points };

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); localStorage.setItem("canyou-theme", theme); }, [theme]);
  useEffect(() => { localStorage.setItem("canyou-device", device); }, [device]);
  const mainRef = useRef(null);
  function go(s) { setScreen(s); if (mainRef.current) mainRef.current.scrollTop = 0; }

  function onEarn(p) { setPoints((v) => v + p); showToast(`+${p} points`, <IconBolt size={15} style={{ color: "var(--accent-text)" }} />); }

  const isFlow = screen === "vsai" || screen === "duel";

  const screenEl = <>
    {screen === "home" && <HomeScreen go={go} me={me} device={device} />}
    {screen === "vsai" && <VsAiScreen back={() => go("home")} me={me} onEarn={onEarn} toast={showToast} device={device} />}
    {screen === "duel" && <DuelScreen back={() => go("home")} me={me} onEarn={onEarn} toast={showToast} device={device} />}
    {screen === "catalog" && <CatalogScreen me={me} onEarn={onEarn} toast={showToast} device={device} />}
    {screen === "leaderboard" && <LeaderboardScreen me={me} device={device} />}
    {screen === "profile" && <ProfileScreen me={me} device={device} />}
  </>;

  const themeToggle = <button className="pv-theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Toggle theme">
    {theme === "dark" ? <IconSun size={16} /> : <IconMoon size={16} />}
  </button>;

  return <>
    <div className={"app " + device}>
      {device === "desktop" ? (
        <>
          <aside className="sidebar">
            <div className="side-brand" onClick={() => go("home")}>
              <span className="brand-mark"><IconBolt size={16} sw={2.2} /></span>
              <span className="brand-name">CanYou?</span>
            </div>
            {NAV.map((g, gi) => <div className="nav-group" key={gi}>
              {g.group && <div className="nav-group-label">{g.group}</div>}
              {g.items.map((it) => { const I = it.icon; const on = screen === it.key;
                return <button key={it.key} className={"nav-item" + (on ? " active" : "")} onClick={() => go(it.key)}>
                  <I size={18} sw={on ? 2 : 1.75} />{it.label}
                </button>; })}
            </div>)}
            <div className="side-foot">
              <div className="row between" style={{ padding: "2px 8px 8px" }}>
                <PointsReadout value={points} onClick={() => go("profile")} />
                {themeToggle}
              </div>
              <button className={"side-profile" + (screen === "profile" ? "" : "")} onClick={() => go("profile")} style={{ background: screen === "profile" ? "var(--surface-2)" : undefined }}>
                <Avatar initials={me.initials} size={32} color={me.color} />
                <div style={{ textAlign: "left", lineHeight: 1.2 }}>
                  <div className="h3" style={{ fontWeight: 600 }}>{me.name}</div>
                  <div className="small mono">{me.rank}</div>
                </div>
              </button>
            </div>
          </aside>
          <main className="main" ref={mainRef}>
            <div className={isFlow ? "flow-center" : "main-inner"}>{screenEl}</div>
          </main>
        </>
      ) : (
        <>
          {!isFlow && <div className="topbar">
            <div className="side-brand" style={{ padding: 0 }} onClick={() => go("home")}>
              <span className="brand-mark"><IconBolt size={15} sw={2.2} /></span>
              <span className="brand-name">CanYou?</span>
            </div>
            <div className="row g10" style={{ gap: 10 }}>
              <PointsReadout value={points} onClick={() => go("profile")} />
              {themeToggle}
            </div>
          </div>}
          {screenEl}
          {!isFlow && <div className="tabbar">
            {TABS.map((t) => { const I = t.icon; const on = screen === t.key;
              return <button key={t.key} className={"tab" + (on ? " active" : "")} onClick={() => go(t.key)}>
                <I size={21} sw={on ? 2 : 1.75} /><span>{t.label}</span>
              </button>; })}
          </div>}
        </>
      )}
    </div>

    {toastNode}

    {/* preview-only meta control */}
    <div className="preview-bar">
      <div className="seg">
        <button className={device === "desktop" ? "on" : ""} onClick={() => setDevice("desktop")}><IconMonitor size={14} />Desktop</button>
        <button className={device === "mobile" ? "on" : ""} onClick={() => setDevice("mobile")}><IconPhone size={13} />Mobile</button>
      </div>
    </div>
  </>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
