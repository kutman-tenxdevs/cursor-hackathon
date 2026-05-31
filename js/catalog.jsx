/* CanYou? — Catalog (minimal) */
function CatalogScreen({ me, onEarn, toast, device }) {
  const { useState, useEffect } = React;
  const [cat, setCat] = useState("Все");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [sel, setSel] = useState(null);
  const [creating, setCreating] = useState(false);
  const [completed, setCompleted] = useState({});

  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);
  const list = CATALOG.filter((c) => (cat === "Все" || c.cat === cat) && (q === "" || c.title.toLowerCase().includes(q.toLowerCase()) || c.author.includes(q.toLowerCase())));
  function complete(c) { setCompleted((x) => ({ ...x, [c.id]: true })); onEarn(c.pts); }

  return <>
    <div className="screen fade"><div className="pad">
      <div className="row between" style={{ alignItems: "flex-end" }}>
        <div><div className="eyebrow mb8">{CATALOG.length} активных челленджей</div><h1 className="display">Каталог</h1></div>
        {device === "desktop" && <button className="btn btn-primary sm" onClick={() => setCreating(true)}><IconPlus size={16} />Создать челлендж</button>}
      </div>

      <div className="search mt16">
        <IconTarget size={17} style={{ color: "var(--text-3)" }} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск челленджей…" />
      </div>

      <div className="row g8 mt12" style={{ gap: 8, overflowX: "auto", paddingBottom: 4 }}>
        {CATS.map((c) => <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}
      </div>

      {loading
        ? <div className="grid-cat mt16">{[0,1,2,3].map(i => <div key={i} className="card card-pad"><div className="skel" style={{ height: 13, width: "70%" }} /><div className="skel mt12" style={{ height: 9, width: "40%" }} /><div className="skel mt16" style={{ height: 56 }} /></div>)}</div>
        : list.length === 0
          ? <EmptyState icon={<IconTarget size={24} />} title="Пока пусто" sub="Нет челленджей по этому фильтру. Попробуй другую категорию или создай свой." action={<button className="btn btn-primary sm" onClick={() => setCreating(true)}><IconPlus size={16} />Создать челлендж</button>} />
          : <div className="grid-cat mt16">{list.map((c) => <CatalogCard key={c.id} c={c} done={completed[c.id]} onOpen={() => setSel(c)} />)}</div>}
    </div></div>

    {device === "mobile" && <button className="fab" onClick={() => setCreating(true)}><IconPlus size={20} sw={2.2} />Создать</button>}
    {sel && <ChallengeDetail c={sel} done={completed[sel.id]} onClose={() => setSel(null)} onComplete={() => complete(sel)} device={device} />}
    {creating && <CreateSheet onClose={() => setCreating(false)} onDone={() => { setCreating(false); toast("Челлендж опубликован", <IconCheck size={16} style={{ color: "var(--easy)" }} />); }} />}
  </>;
}

function CatalogCard({ c, done, onOpen }) {
  return <button className="card card-tap" onClick={onOpen} style={{ textAlign: "left", padding: 0, overflow: "hidden", width: "100%", display: "flex" }}>
    <Placeholder label={c.img} h="auto" r="0" style={{ width: 88, flex: "0 0 88px", borderRadius: 0, border: "none", borderRight: "1px solid var(--border)" }} />
    <div className="grow" style={{ padding: 13 }}>
      <div className="row between mb8">
        <DiffBadge d={c.diff} />
        {done ? <span className="diff diff-easy"><IconCheck size={12} sw={2.4} style={{ marginLeft: -2 }} />Готово</span> : <span className="tag" style={{ height: 19, fontSize: 10.5 }}>{c.cat}</span>}
      </div>
      <div className="h3" style={{ lineHeight: 1.3 }}>{c.title}</div>
      <div className="row between mt12">
        <div className="row g6" style={{ gap: 6 }}><Avatar initials={c.initials} size={19} /><span className="small">{c.author.trim()}</span></div>
        <div className="meta"><IconUsers size={12} /><span className="mono">{c.attempts.toLocaleString("ru-RU")}</span><span className="dot" /><span className="mono" style={{ color: "var(--accent-text)" }}>{c.pts} оч</span></div>
      </div>
    </div>
  </button>;
}

function ChallengeDetail({ c, done, onClose, onComplete, device }) {
  const { useState } = React;
  const [stage, setStage] = useState(done ? "done" : "view");
  const [proof, setProof] = useState(() => emptyProof("photo"));
  const filled = isProofFilled(proof);
  function submit() { setStage("submitting"); setTimeout(() => { onComplete(); setStage("done"); }, 1300); }
  const footStyle = { flex: "0 0 auto", borderTop: "1px solid var(--border)", background: "var(--surface)", padding: "12px 16px calc(14px + env(safe-area-inset-bottom))" };
  const inner = { maxWidth: 560, margin: "0 auto", width: "100%" };

  return <div className="detail">
    <div className="flowhead" style={{ padding: "12px 14px" }}>
      <button className="icon-btn" onClick={onClose}><IconArrowL size={18} /></button>
      <div className="grow" /><button className="icon-btn"><IconShare size={18} /></button>
    </div>
    <div className="screen" style={{ flex: 1, overflowY: "auto" }}>
      <div style={inner}>
        <Placeholder label={c.img} h={device === "desktop" ? 240 : 190} r="0" style={{ border: "none", borderBlock: "1px solid var(--border)" }} />
        <div className="pad">
          <div className="row g12 mb12" style={{ gap: 12 }}><DiffBadge d={c.diff} /><span className="tag">{c.cat}</span></div>
          <h1 className="h1" style={{ fontSize: 24 }}>{c.title}</h1>
          <div className="row g10 mt16" style={{ gap: 10 }}><Avatar initials={c.initials} size={32} /><div><div className="h3" style={{ fontWeight: 600 }}>{c.author.trim()}</div><div className="small">Автор</div></div></div>
          <div className="card card-pad row mt16">
            <div className="grow"><Stat label="Награда" value={c.pts + " оч"} color="var(--accent-text)" /></div>
            <div style={{ width: 1, background: "var(--border)" }} />
            <div className="grow" style={{ paddingLeft: 16 }}><Stat label="Попыток" value={c.attempts.toLocaleString("ru-RU")} /></div>
            <div style={{ width: 1, background: "var(--border)" }} />
            <div className="grow" style={{ paddingLeft: 16 }}><Stat label="Прохождение" value="38%" /></div>
          </div>
          <div className="mt20"><div className="eyebrow mb12">Условия</div><p className="body">{c.desc}</p></div>
          <div className="card card-pad mt16 row g10" style={{ gap: 10, alignItems: "flex-start" }}>
            <IconLock size={16} style={{ color: "var(--med)", marginTop: 1, flex: "0 0 auto" }} />
            <span className="small" style={{ color: "var(--text-2)" }}>Одна попытка — сделай доказательство с первого раза.</span>
          </div>
          {stage === "submit" && <div className="card card-pad mt16 fade">
            <div className="eyebrow mb12">Отправь доказательство</div>
            <ProofUpload allow={["photo","camera","link","text"]} value={proof} onChange={setProof} />
          </div>}
        </div>
      </div>
    </div>
    <div style={footStyle}><div style={inner}>
      {stage === "view" && <button className="btn btn-primary lg block" onClick={() => setStage("submit")}>Принять челлендж <IconBolt size={18} /></button>}
      {stage === "submit" && <button className="btn btn-primary lg block" disabled={!filled} onClick={submit}><IconCheck size={18} />Отправить</button>}
      {stage === "submitting" && <button className="btn btn-primary lg block" disabled><span className="spinner" style={{ width: 17, height: 17 }} />Проверка…</button>}
      {stage === "done" && <div className="col center tac pop" style={{ gap: 10 }}>
        <div className="row g8" style={{ gap: 8 }}><span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--easy)", display: "grid", placeItems: "center" }}><IconCheck size={16} sw={2.4} /></span><span className="h3">Челлендж выполнен</span></div>
        <div className="small">Ты получил <Pts v={c.pts} sign color="var(--accent-text)" /> очков</div>
        <button className="btn btn-ghost block mt8" onClick={onClose}>В каталог</button>
      </div>}
    </div></div>
  </div>;
}

function CreateSheet({ onClose, onDone }) {
  const { useState } = React;
  const [title, setTitle] = useState(""); const [diff, setDiff] = useState("Средний"); const [cat, setCat] = useState("Фитнес");
  const valid = title.trim().length > 4;
  return <div className="overlay" onClick={onClose}>
    <div className="sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480, marginInline: "auto", width: "100%" }}>
      <div className="sheet-grip" />
      <div className="row between mb16"><h2 className="h2">Новый челлендж</h2><button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32 }}><IconClose size={16} /></button></div>
      <label className="eyebrow">Название</label>
      <input className="field mt8 mb16" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="например: 50 приседаний за 2 минуты" autoFocus style={{ height: 48 }} />
      <label className="eyebrow">Сложность</label>
      <div className="row g8 mt8 mb16" style={{ gap: 8 }}>
        {["Лёгкий","Средний","Сложный"].map((d) => { const on = diff === d;
          return <button key={d} className="btn" onClick={() => setDiff(d)} style={{ flex: 1, height: 40, background: on ? "var(--accent-soft)" : "var(--surface-2)", border: "1px solid " + (on ? "var(--accent-line)" : "var(--border)"), color: on ? "var(--accent-text)" : "var(--text-2)" }}>{d}</button>; })}
      </div>
      <label className="eyebrow">Категория</label>
      <div className="row g8 mt8 mb20" style={{ gap: 8, overflowX: "auto", paddingBottom: 4 }}>
        {CATS.slice(1).map((c) => <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <button className="btn btn-primary lg block" disabled={!valid} onClick={onDone}>Опубликовать</button>
      {!valid && <div className="small tac mt8">Введи название для публикации</div>}
    </div>
  </div>;
}

Object.assign(window, { CatalogScreen });
