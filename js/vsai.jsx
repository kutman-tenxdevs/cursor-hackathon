/* CanYou? — vs AI mode (minimal) */
function VsAiScreen({ back, me, onEarn, toast, device }) {
  const { useState, useEffect } = React;
  const [phase, setPhase] = useState("intro");
  const [diff, setDiff] = useState("Medium");
  const [idx, setIdx] = useState(0);
  const [proof, setProof] = useState("photo");
  const [filled, setFilled] = useState(false);
  const [results, setResults] = useState([]);

  const tasks = AI_TASKS[diff];
  const task = tasks[idx];
  const meta = DIFF_META[diff];
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (phase !== "active") return;
    if (left <= 0) { submit(true); return; }
    const id = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, left]);

  function start() { setPhase("reveal"); setTimeout(() => { setLeft(task.time); setPhase("active"); }, 1600); }
  function submit(timedOut) {
    setPhase("submitting");
    setTimeout(() => {
      const speed = timedOut ? 24 : Math.round(40 + (left / task.time) * 60);
      const acc = timedOut ? 50 : Math.round(72 + Math.random() * 26);
      const comp = timedOut ? 60 : 100;
      const pts = Math.round(meta.base * (speed/100*0.4 + acc/100*0.35 + comp/100*0.25));
      const aiSpeed = Math.round(55 + Math.random()*35);
      const ai = Math.round(meta.base * (aiSpeed/100*0.4 + (78+Math.random()*18)/100*0.35 + 0.25));
      setResults((rs) => [...rs, { speed, acc, comp, pts, ai, you: pts, timedOut }]);
      onEarn(pts); setPhase("score");
    }, 1400);
  }
  function next() {
    if (idx >= 2) { setPhase("done"); return; }
    setIdx((i) => i + 1); setProof("photo"); setFilled(false); setPhase("reveal");
    setTimeout(() => { setLeft(tasks[idx+1].time); setPhase("active"); }, 1400);
  }
  function restart() { setPhase("intro"); setIdx(0); setResults([]); setFilled(false); setProof("photo"); }

  const youTotal = results.reduce((s, r) => s + r.you, 0);
  const aiTotal = results.reduce((s, r) => s + r.ai, 0);

  return <>
    <div className="flowhead">
      <button className="icon-btn" onClick={back}><IconArrowL size={18} /></button>
      <div className="grow">
        <div className="fh-title row g8" style={{ gap: 8 }}>vs AI <span className="tag tag-accent" style={{ height: 19 }}>Solo</span></div>
        {phase !== "intro" && phase !== "done" && <div className="fh-sub">Task {idx + 1} of 3 · {diff}</div>}
      </div>
      {phase !== "intro" && phase !== "done" &&
        <div className="mono small">{youTotal} : {aiTotal}</div>}
    </div>

    <div className="screen fade min-fill">
      {phase !== "intro" && phase !== "done" &&
        <div className="pad" style={{ paddingTop: 2, paddingBottom: 16 }}><Segs total={3} done={results.length} active={idx} /></div>}

      {/* INTRO */}
      {phase === "intro" && <div className="pad col">
        <div className="eyebrow mb8">3 tasks · best score wins</div>
        <h1 className="display">Think you're faster than AI?</h1>
        <p className="body mt12">The AI fires three timed challenges. Beat it on speed, accuracy and completion.</p>

        <div className="eyebrow mt32 mb12">Difficulty</div>
        <div className="col g8" style={{ gap: 8 }}>
          {["Easy","Medium","Hard"].map((d) => { const on = diff === d; const dm = DIFF_META[d];
            return <button key={d} className="card" onClick={() => setDiff(d)}
              style={{ padding: 14, display: "flex", alignItems: "center", gap: 13, cursor: "pointer",
                borderColor: on ? "var(--accent-line)" : "var(--border)", background: on ? "var(--accent-soft)" : "var(--surface)" }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", border: "1px solid " + (on ? "var(--accent)" : "var(--border-strong)"), display: "grid", placeItems: "center" }}>
                {on && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />}
              </span>
              <div className="grow" style={{ textAlign: "left" }}>
                <div className="h3">{d}</div>
                <div className="small">{d === "Easy" ? "Quick wins, shorter clock" : d === "Medium" ? "Balanced tasks & timing" : "Tougher tasks, more time"}</div>
              </div>
              <span className="mono small" style={{ color: on ? "var(--accent-text)" : "var(--text-3)", fontWeight: 600 }}>{dm.mult}</span>
            </button>; })}
        </div>

        <button className="btn btn-primary lg block mt24" onClick={start}><IconBolt size={18} />Start challenge</button>
        <div className="small tac mt12">Tap to receive your first challenge from the AI</div>
      </div>}

      {/* REVEAL */}
      {phase === "reveal" && <div className="pad col center" style={{ padding: "60px 18px", gap: 18 }}>
        <div style={{ width: 56, height: 56, borderRadius: 15, background: "var(--surface-2)", border: "1px solid var(--border)", display: "grid", placeItems: "center", color: "var(--accent-text)" }}><IconBot size={28} /></div>
        <div className="col center g10" style={{ gap: 10 }}><span className="eyebrow">AI is choosing your challenge</span><Typing /></div>
      </div>}

      {/* ACTIVE */}
      {(phase === "active" || phase === "submitting") && <div className="pad col" style={{ gap: 18 }}>
        <div className="card card-pad">
          <div className="row g8 mb8" style={{ gap: 8, alignItems: "center" }}>
            <Avatar initials="AI" size={24} color="var(--accent)" /><span className="eyebrow">AI challenge</span>
          </div>
          <div className="h1">{task.title}</div>
          <p className="body mt8">{task.desc}</p>
        </div>

        <div className="col center" style={{ padding: "6px 0" }}><TimerRing left={left} total={task.time} label="remaining" /></div>

        <div>
          <div className="eyebrow mb12">Submit proof</div>
          {task.kind === "text"
            ? <textarea className="field" placeholder="Type your answer…" onChange={(e) => setFilled(e.target.value.length > 0)} />
            : <>
                <ProofPicker value={proof} onChange={setProof} allow={["photo","camera"]} />
                <div className={"upload mt12" + (filled ? " done" : "")} onClick={() => setFilled(true)}>
                  <div className="up-ic">{filled ? <IconCheck size={22} /> : proof === "camera" ? <IconCamera size={20} /> : <IconImage size={20} />}</div>
                  <div>{filled ? <><div className="h3">Proof attached</div><div className="small mono">IMG_4821.heic</div></> : <><div className="h3">{proof === "camera" ? "Open camera" : "Add a photo"}</div><div className="small">{proof === "camera" ? "Snap your proof now" : "Tap to choose a file"}</div></>}</div>
                </div>
              </>}
        </div>

        <button className="btn btn-primary lg block" disabled={!filled || phase === "submitting"} onClick={() => submit(false)}>
          {phase === "submitting" ? <><span className="spinner" style={{ width: 17, height: 17 }} /> AI is scoring…</> : <>Submit proof <IconChevR size={18} /></>}
        </button>
      </div>}

      {/* SCORE */}
      {phase === "score" && (() => {
        const r = results[results.length - 1]; const won = r.you >= r.ai;
        return <div className="pad col" style={{ gap: 18 }}>
          <div className="tac">
            <div className="pop" style={{ width: 56, height: 56, margin: "0 auto", borderRadius: "50%", display: "grid", placeItems: "center", background: "var(--surface-2)", border: "1px solid var(--border)", color: won ? "var(--easy)" : "var(--hard)" }}>{won ? <IconCheck size={30} sw={2.2} /> : <IconBot size={28} />}</div>
            <div className="h1 mt12">{won ? "You beat the AI" : "AI edged you"}</div>
            <div className="small mt4">{r.timedOut ? "Timed out — partial completion" : "Task complete"}</div>
          </div>
          <div className="card card-pad col g16" style={{ gap: 16 }}>
            <div className="eyebrow">AI scoring</div>
            {[["Speed", r.speed], ["Accuracy", r.acc], ["Completion", r.comp]].map(([k, v]) =>
              <div key={k}><div className="row between mb8"><span className="small" style={{ color: "var(--text-2)" }}>{k}</span><span className="mono small" style={{ fontWeight: 600 }}>{v}%</span></div><Progress value={v} /></div>)}
            <hr className="divider" />
            <div className="row between"><span className="h3">Points earned</span><Pts v={r.pts} sign size={19} color="var(--accent-text)" /></div>
          </div>
          <div className="card card-pad row">
            <div className="grow tac"><Stat label="You" value={r.you} /></div>
            <div style={{ width: 1, alignSelf: "stretch", background: "var(--border)" }} />
            <div className="grow tac" style={{ display: "flex", justifyContent: "center" }}><Stat label="AI" value={r.ai} color="var(--text-3)" /></div>
          </div>
          <button className="btn btn-primary lg block" onClick={next}>{idx >= 2 ? "See final results" : "Next task"} <IconChevR size={18} /></button>
        </div>;
      })()}

      {/* DONE */}
      {phase === "done" && (() => {
        const won = youTotal >= aiTotal;
        return <div className="pad col" style={{ gap: 18 }}>
          <div className="tac mt8">
            <div className="pop" style={{ width: 72, height: 72, margin: "0 auto", borderRadius: 18, display: "grid", placeItems: "center", background: won ? "var(--accent)" : "var(--surface-2)", border: won ? "none" : "1px solid var(--border)", color: won ? "var(--on-accent)" : "var(--text-3)" }}>{won ? <IconTrophy size={36} /> : <IconGhost size={36} />}</div>
            <div className="eyebrow mt16">{won ? "Victory" : "Defeated"}</div>
            <h1 className="display mt8">{won ? "You won the match" : "AI took this one"}</h1>
          </div>
          <div className="card card-pad row">
            <div className="grow tac" style={{ display: "flex", justifyContent: "center" }}><Stat label="Your score" value={youTotal} color="var(--accent-text)" /></div>
            <div style={{ width: 1, alignSelf: "stretch", background: "var(--border)" }} />
            <div className="grow tac" style={{ display: "flex", justifyContent: "center" }}><Stat label="AI score" value={aiTotal} color="var(--text-3)" /></div>
          </div>
          <div className="card card-pad col g12" style={{ gap: 10 }}>
            <div className="eyebrow mb8">Task breakdown</div>
            {results.map((r, i) => <div key={i} className="row between"><span className="small" style={{ color: "var(--text-2)" }}>Task {i+1} · {AI_TASKS[diff][i].title}</span><span className="mono small" style={{ color: r.you >= r.ai ? "var(--easy)" : "var(--hard)" }}>{r.you}–{r.ai}</span></div>)}
          </div>
          <div className="row g10" style={{ gap: 10 }}>
            <button className="btn btn-ghost lg grow" onClick={restart}><IconRefresh size={18} />Rematch</button>
            <button className="btn btn-primary lg grow" onClick={back}>Done</button>
          </div>
        </div>;
      })()}
    </div>
  </>;
}
window.VsAiScreen = VsAiScreen;
