/* CanYou? — shared UI primitives (minimal, flat, themed) */
const { useState, useEffect, useRef, useCallback } = React;

/* difficulty — dot + label, no fill */
function DiffBadge({ d }) {
  const cls = { "Лёгкий": "diff-easy", "Средний": "diff-med", "Сложный": "diff-hard" }[d];
  return <span className={"diff " + cls}>{d}</span>;
}

function Avatar({ initials, color, size = 38, ring }) {
  return <div className="avatar" style={{
    width: size, height: size, fontSize: size * 0.36,
    background: color || "var(--surface-3)",
    color: color ? "var(--on-accent)" : "var(--text-2)",
    boxShadow: ring ? "0 0 0 2px var(--bg), 0 0 0 3px var(--accent)" : null,
  }}>{initials}</div>;
}

function Placeholder({ label, h = 120, r = "var(--r-md)", style }) {
  return <div className="ph" style={{ height: h, borderRadius: r, ...style }}>
    {label && <span className="ph-label">{label}</span>}
  </div>;
}

function Pts({ v, sign, size = 14, color }) {
  return <span className="mono" style={{ fontWeight: 600, fontSize: size, color }}>
    {sign && v > 0 ? "+" : ""}{v.toLocaleString()}
  </span>;
}

function Progress({ value }) {
  return <div className="progress"><i style={{ width: Math.max(0, Math.min(100, value)) + "%" }} /></div>;
}

function Segs({ total, done, active }) {
  return <div className="segs">
    {Array.from({ length: total }).map((_, i) =>
      <i key={i} className={i < done ? "done" : i === active ? "active" : ""} />)}
  </div>;
}

function Toast({ children, icon }) { return <div className="toast">{icon}{children}</div>; }
function useToast() {
  const [t, setT] = useState(null);
  const show = useCallback((msg, icon) => {
    setT({ msg, icon }); clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => setT(null), 2200);
  }, []);
  return [t ? <Toast icon={t.icon}>{t.msg}</Toast> : null, show];
}

function fmtTime(s) { const m = Math.floor(s / 60), ss = s % 60; return `${String(m).padStart(2,"0")}:${String(ss).padStart(2,"0")}`; }

function TimerRing({ left, total, size = 156, label }) {
  const r = (size - 14) / 2, c = 2 * Math.PI * r;
  const frac = total > 0 ? left / total : 0;
  const danger = left <= 10;
  const stroke = danger ? "var(--hard)" : "var(--accent)";
  return <div style={{ position: "relative", width: size, height: size }}>
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth="6" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={stroke} strokeWidth="6"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - frac)}
        style={{ transition: "stroke-dashoffset 1s linear, stroke 300ms" }} />
    </svg>
    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
      <div>
        <div className="timer-num" style={{ fontSize: size * 0.24, color: danger ? "var(--hard)" : "var(--text)" }}>{fmtTime(left)}</div>
        {label && <div className="eyebrow" style={{ marginTop: 3 }}>{label}</div>}
      </div>
    </div>
  </div>;
}

function ProofPicker({ value, onChange, allow = ["photo", "camera", "text"] }) {
  const opts = {
    photo:  { icon: <IconImage size={18} />, label: "Загрузить" },
    camera: { icon: <IconCamera size={18} />, label: "Камера" },
    link:   { icon: <IconLink size={18} />, label: "Ссылка" },
    text:   { icon: <IconChat size={18} />, label: "Текст" },
  };
  return <div className="row g8" style={{ gap: 8 }}>
    {allow.map((k) => <button key={k} type="button" className={"proof-opt" + (value === k ? " on" : "")} onClick={() => onChange(k)}>
      {opts[k].icon}<span>{opts[k].label}</span>
    </button>)}
  </div>;
}

function emptyProof(kind = "photo") {
  return { kind, file: null, preview: null, fileName: "", link: "", text: "" };
}

function isProofFilled(p) {
  if (!p) return false;
  if (p.kind === "photo" || p.kind === "camera") return !!p.preview;
  if (p.kind === "link") return p.link.trim().length > 3;
  if (p.kind === "text") return p.text.trim().length > 0;
  return false;
}

function revokeProofPreview(p) {
  if (p?.preview) URL.revokeObjectURL(p.preview);
}

function ProofUpload({ allow = ["photo", "camera", "text"], value, onChange, compact }) {
  const fileRef = useRef(null);
  const previewRef = useRef(null);
  const proof = value || emptyProof(allow[0]);
  const filled = isProofFilled(proof);
  const isImage = proof.kind === "photo" || proof.kind === "camera";

  previewRef.current = proof.preview;
  useEffect(() => () => revokeProofPreview({ preview: previewRef.current }), []);

  function setKind(k) {
    if (k === proof.kind) return;
    revokeProofPreview(proof);
    onChange(emptyProof(k));
  }

  function openPicker() { fileRef.current?.click(); }

  function onFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    revokeProofPreview(proof);
    onChange({ ...proof, file, preview: URL.createObjectURL(file), fileName: file.name });
  }

  function clearImage() {
    revokeProofPreview(proof);
    onChange({ ...proof, file: null, preview: null, fileName: "" });
  }

  const ic = filled
    ? <IconCheck size={compact ? 18 : 22} />
    : proof.kind === "camera" ? <IconCamera size={compact ? 18 : 20} />
    : proof.kind === "link" ? <IconLink size={compact ? 18 : 20} />
    : proof.kind === "text" ? <IconChat size={compact ? 18 : 20} />
    : <IconImage size={compact ? 18 : 20} />;

  return <>
    <ProofPicker value={proof.kind} onChange={setKind} allow={allow} />
    <input ref={fileRef} type="file" accept="image/*" capture={proof.kind === "camera" ? "environment" : undefined}
      style={{ display: "none" }} onChange={onFile} />

    {proof.kind === "link" && (
      <input className="field mt12" type="url" placeholder="https://…" value={proof.link}
        onChange={(e) => onChange({ ...proof, link: e.target.value })} />
    )}

    {proof.kind === "text" && (
      <textarea className="field mt12" placeholder="Опиши, как выполнил челлендж…" rows={compact ? 3 : 4}
        value={proof.text} onChange={(e) => onChange({ ...proof, text: e.target.value })} />
    )}

    {isImage && !compact && (
      <div className={"upload mt12" + (filled ? " done has-preview" : "")} onClick={filled ? undefined : openPicker} role={filled ? undefined : "button"} tabIndex={filled ? undefined : 0}
        onKeyDown={filled ? undefined : (e) => e.key === "Enter" && openPicker()}>
        {filled
          ? <div className="upload-preview-wrap">
              <img src={proof.preview} alt="Превью доказательства" className="upload-preview" />
              <div className="grow">
                <div className="h3">Доказательство прикреплено</div>
                <div className="small mono">{proof.fileName}</div>
                <button type="button" className="btn btn-ghost sm mt8" onClick={(e) => { e.stopPropagation(); openPicker(); }}>Заменить</button>
                <button type="button" className="btn btn-ghost sm mt8" style={{ marginLeft: 6 }} onClick={(e) => { e.stopPropagation(); clearImage(); }}>Удалить</button>
              </div>
            </div>
          : <>
              <div className="up-ic">{ic}</div>
              <div>
                <div className="h3">{proof.kind === "camera" ? "Открыть камеру" : "Добавить фото"}</div>
                <div className="small">{proof.kind === "camera" ? "Сними доказательство сейчас" : "Нажми, чтобы выбрать файл"}</div>
              </div>
            </>}
      </div>
    )}

    {isImage && compact && (
      !filled
        ? <button type="button" className="btn btn-ghost block mt12" onClick={openPicker}>
            {proof.kind === "camera" ? <><IconCamera size={18}/>Снять фото</> : <><IconImage size={18}/>Прикрепить фото</>}
          </button>
        : <div className="mt12">
            <img src={proof.preview} alt="Превью" className="proof-thumb" />
            <div className="row g8 mt8" style={{ gap: 8 }}>
              <button type="button" className="btn btn-ghost sm grow" onClick={openPicker}>Заменить</button>
              <button type="button" className="btn btn-ghost sm" onClick={clearImage}>Удалить</button>
            </div>
          </div>
    )}
  </>;
}

function ProofPreview({ proof, style }) {
  if (!proof) return null;
  if ((proof.kind === "photo" || proof.kind === "camera") && proof.preview) {
    return <img src={proof.preview} alt="Доказательство" className="proof-thumb" style={style} />;
  }
  if (proof.kind === "link" && proof.link) {
    return <div className="card card-pad row g8" style={{ gap: 8, padding: 10, marginBottom: 6, ...style }}>
      <IconLink size={15} style={{ color: "var(--accent-text)" }} />
      <span className="mono small" style={{ wordBreak: "break-all" }}>{proof.link}</span>
    </div>;
  }
  if (proof.kind === "text" && proof.text) {
    return <div className="card card-pad" style={{ padding: 10, marginBottom: 6, maxWidth: 220, ...style }}>
      <span className="small" style={{ whiteSpace: "pre-wrap" }}>{proof.text}</span>
    </div>;
  }
  return null;
}

function EmptyState({ icon, title, sub, action }) {
  return <div className="col center tac" style={{ padding: "52px 24px", gap: 14 }}>
    <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--surface-2)", border: "1px solid var(--border)", display: "grid", placeItems: "center", color: "var(--text-3)" }}>{icon}</div>
    <div><div className="h3" style={{ marginBottom: 5 }}>{title}</div><div className="small" style={{ maxWidth: 250, margin: "0 auto" }}>{sub}</div></div>
    {action}
  </div>;
}

function Typing() {
  return <span className="row g4" style={{ gap: 4 }}>
    {[0,1,2].map(i => <i key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-3)", animation: `blink 1.2s ${i*0.18}s infinite` }} />)}
  </span>;
}

function Stat({ label, value, color }) {
  return <div className="col" style={{ gap: 3 }}>
    <span className="mono" style={{ fontSize: 19, fontWeight: 700, color: color || "var(--text)", letterSpacing: "-0.02em" }}>{value}</span>
    <span className="eyebrow">{label}</span>
  </div>;
}

Object.assign(window, {
  DiffBadge, Avatar, Placeholder, Pts, Progress, Segs, Toast, useToast,
  fmtTime, TimerRing, ProofPicker, ProofUpload, ProofPreview, emptyProof, isProofFilled,
  EmptyState, Typing, Stat,
});
