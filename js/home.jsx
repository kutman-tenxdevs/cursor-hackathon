/* CanYou? — Home / mode selector (minimal) */
function HomeScreen({ go, me, device }) {
  const modes = [
    { key: "vsai", title: "Против ИИ", icon: IconBot, tag: "Соло", desc: "Три задания на время — обыграй машину." },
    { key: "duel", title: "Дуэль", icon: IconSwords, tag: "1 на 1", desc: "Вызови друга или случайного соперника." },
    { key: "catalog", title: "Каталог", icon: IconLayers, tag: "Открыто", desc: "Челленджи от сообщества." },
  ];

  return <div className="screen fade min-fill">
    <div className="pad">
      <div className="eyebrow mb8">Вторник · серия 6 дней</div>
      <h1 className="display">Справишься сегодня?</h1>

      <div className="card card-tap card-pad mt20" onClick={() => go("catalog")}>
        <div className="row between mb12">
          <span className="tag tag-accent">Челлендж дня</span>
          <span className="mono small">сброс 14:22</span>
        </div>
        <div className="h2">Без телефона днём — 3 часа</div>
        <div className="row between mt16">
          <div className="meta"><IconUsers size={14} /><span className="mono">3 320</span> в игре<span className="dot" /><span className="mono">80</span> очк.</div>
          <span className="link">Принять <IconChevR size={14} /></span>
        </div>
      </div>

      <div className="section-head mt32"><span className="eyebrow">Выбери режим</span></div>
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

      <div className="card card-tap card-pad mt24" onClick={() => go("profile")}>
        <div className="row between mb12">
          <div className="row g10" style={{ gap: 10 }}>
            <Avatar initials={me.initials} size={32} color={me.color} />
            <div><div className="h3" style={{ fontWeight: 600 }}>{me.rank}</div><div className="small">1 180 очк. до Платины</div></div>
          </div>
          <span className="mono small">71%</span>
        </div>
        <Progress value={71} />
      </div>
    </div>
  </div>;
}
window.HomeScreen = HomeScreen;
