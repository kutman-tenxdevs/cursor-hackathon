/* CanYou? — Duel mode (1v1, minimal) */
function DuelScreen({ back, me, onEarn, toast, device }) {
  const { useState, useEffect, useRef } = React;
  const [phase, setPhase] = useState("lobby");
  const [mode, setMode] = useState(null);
  const [first, setFirst] = useState(null);
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState("issue");
  const [msgs, setMsgs] = useState([]);
  const [score, setScore] = useState({ me: 0, opp: 0 });
  const [proof, setProof] = useState(() => emptyProof("photo"));
  const filled = isProofFilled(proof);
  const [draft, setDraft] = useState("");
  const [flipping, setFlipping] = useState(false);
  const threadRef = useRef(null);
  const opp = OPPONENT;

  const order = first ? (first === "me" ? ["me","opp","me","opp","me","opp"] : ["opp","me","opp","me","opp","me"]) : [];
  const issuer = order[step];
  const responder = issuer === "me" ? "opp" : "me";
  function addMsg(m) { setMsgs((x) => [...x, { id: Math.random(), ...m }]); }

  useEffect(() => { const el = threadRef.current; if (el) el.scrollTop = el.scrollHeight; }, [msgs, stage, phase]);

  function findMatch(m) { setMode(m); setPhase("searching"); setTimeout(() => setPhase("coinflip"), m === "random" ? 2000 : 1300); }
  function flip() {
    setFlipping(true);
    setTimeout(() => {
      const w = Math.random() < 0.5 ? "me" : "opp"; setFirst(w); setFlipping(false);
      setTimeout(() => { setPhase("play"); addMsg({ type: "sys", text: w === "me" ? "Ты выиграл жребий — ты задаёшь первым" : `${opp.name.split(" ")[0]} выиграл жребий — он начинает` }); }, 850);
    }, 2400);
  }

  useEffect(() => {
    if (phase !== "play") return;
    const oppIssues = stage === "issue" && issuer === "opp";
    const oppResponds = stage === "respond" && issuer === "me";
    if (!oppIssues && !oppResponds) return;
    addMsg({ type: "typing", who: "opp" });
    const t = setTimeout(() => {
      setMsgs((x) => x.filter((m) => m.type !== "typing"));
      if (oppIssues) { addMsg({ type: "challenge", who: "opp", text: DUEL_CHALLENGES_POOL[Math.floor(Math.random()*DUEL_CHALLENGES_POOL.length)] }); setStage("respond"); }
      else { addMsg({ type: "proof", who: "opp", kind: ["photo","link","text"][Math.floor(Math.random()*3)], note: "Готово — доказательство прикреплено" }); const pts = Math.round(70 + Math.random()*60); addMsg({ type: "score", who: "opp", pts }); setScore((s) => ({ ...s, opp: s.opp + pts })); advance(); }
    }, oppIssues ? 1600 : 2000);
    return () => clearTimeout(t);
  }, [phase, step, stage, issuer]);

  function advance() { setTimeout(() => { if (step >= 5) setPhase("done"); else { setStep((s) => s + 1); setStage("issue"); setProof(emptyProof("photo")); setDraft(""); } }, 450); }
  function sendChallenge() { if (!draft.trim()) return; addMsg({ type: "challenge", who: "me", text: draft.trim() }); setDraft(""); setStage("respond"); }
  function sendProof() { addMsg({ type: "proof", who: "me", kind: proof.kind, proof, note: "Отправлено" }); const pts = Math.round(80 + Math.random()*55); addMsg({ type: "score", who: "me", pts }); setScore((s) => ({ ...s, me: s.me + pts })); onEarn(pts); setProof(emptyProof("photo")); advance(); }

  const myTurnIssue = phase === "play" && stage === "issue" && issuer === "me";
  const myTurnRespond = phase === "play" && stage === "respond" && responder === "me";

  if (phase === "lobby") return <>
    <DuelHead back={back} />
    <div className="screen fade min-fill"><div className="pad col">
      <div className="eyebrow mb8">Шесть челленджей · по три с каждой стороны</div>
      <h1 className="display">Выбери бой</h1>
      <p className="body mt12">Задавай челленджи, выполняй чужие, обойди соперника за три раунда.</p>
      <div className="col g12 mt24" style={{ gap: 12 }}>
        <button onClick={() => findMatch("random")} className="card card-tap" style={{ padding: 16, display: "flex", gap: 14, alignItems: "center", textAlign: "left" }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--surface-2)", border: "1px solid var(--border)", display: "grid", placeItems: "center", color: "var(--text)" }}><IconDice size={22} /></div>
          <div className="grow"><div className="h2">Случайный соперник</div><div className="small mt4">Подбор по близкому рангу.</div></div>
          <IconChevR size={20} style={{ color: "var(--text-3)" }} />
        </button>
        <button onClick={() => findMatch("friend")} className="card card-tap" style={{ padding: 16, display: "flex", gap: 14, alignItems: "center", textAlign: "left" }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--surface-2)", border: "1px solid var(--border)", display: "grid", placeItems: "center", color: "var(--text)" }}><IconShare size={20} /></div>
          <div className="grow"><div className="h2">Пригласить друга</div><div className="small mt4">Отправь ссылку знакомому.</div></div>
          <IconChevR size={20} style={{ color: "var(--text-3)" }} />
        </button>
      </div>
      <div className="card card-pad mt24">
        <div className="eyebrow mb16">Недавние дуэли</div>
        <div className="col g14" style={{ gap: 14 }}>
          {[["Yui T.","W",412,388],["Dario S.","L",290,355]].map(([n,r,a,b]) =>
            <div key={n} className="row between">
              <div className="row g10" style={{ gap: 10 }}><Avatar initials={n.slice(0,2).toUpperCase()} size={30} /><span className="small" style={{ color: "var(--text-2)" }}>{n}</span></div>
              <div className="row g10" style={{ gap: 10 }}><span className="mono small">{a}–{b}</span><span className="small" style={{ color: r==="W"?"var(--easy)":"var(--hard)", fontWeight: 600 }}>{r==="W"?"Победа":"Поражение"}</span></div>
            </div>)}
        </div>
      </div>
    </div></div>
  </>;

  if (phase === "searching") return <>
    <DuelHead back={back} />
    <div className="screen fade col center" style={{ padding: "70px 18px", gap: 22 }}>
      <div style={{ position: "relative", width: 110, height: 110 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid var(--accent-line)", animation: "ping 1.8s var(--ease) infinite" }} />
        <div style={{ position: "absolute", inset: 16, borderRadius: "50%", border: "1px solid var(--accent-line)", animation: "ping 1.8s 0.4s var(--ease) infinite" }} />
        <div style={{ position: "absolute", inset: 33, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "grid", placeItems: "center", color: "var(--accent-text)" }}><IconUsers size={24} /></div>
      </div>
      <div className="tac"><div className="h2">{mode === "random" ? "Ищем соперника…" : "Ждём друга…"}</div><div className="small mt4 mono">{mode === "random" ? "подбор · ранг Золото" : "ссылка скопирована"}</div></div>
      <button className="btn btn-ghost sm" onClick={() => setPhase("lobby")}>Отмена</button>
    </div>
  </>;

  if (phase === "coinflip") return <>
    <DuelHead back={back} />
    <div className="screen fade col center" style={{ padding: "40px 18px", gap: 26 }}>
      <div className="row center" style={{ gap: 22 }}>
        <div className="col center g8" style={{ gap: 8 }}><Avatar initials={me.initials} size={52} color={me.color} ring /><span className="small">Ты</span></div>
        <span className="mono small" style={{ color: "var(--text-3)" }}>VS</span>
        <div className="col center g8" style={{ gap: 8 }}><Avatar initials={opp.initials} size={52} color={opp.color} /><span className="small">{opp.name.split(" ")[0]}</span></div>
      </div>
      <div className={"coin" + (flipping ? " flipping" : "") + (first ? " landed-" + first : "")}>
        <div className="coin-face coin-you"><IconUser size={28} /><span>ТЫ</span></div>
        <div className="coin-face coin-opp"><IconUsers size={28} /><span>{opp.name.split(" ")[0].toUpperCase()}</span></div>
      </div>
      {!first
        ? <div className="tac"><div className="eyebrow mb12">{flipping ? "Подбрасываем…" : "Кто ходит первым?"}</div>{!flipping && <button className="btn btn-primary lg" onClick={flip} style={{ minWidth: 200 }}><IconDice size={18} />Подбросить монету</button>}</div>
        : <div className="tac pop"><div className="h1">{first === "me" ? "Ты ходишь первым" : `Первым ходит ${opp.name.split(" ")[0]}`}</div><div className="small mt4">Запускаем дуэль…</div></div>}
    </div>
  </>;

  if (phase === "done") {
    const won = score.me >= score.opp;
    return <>
      <DuelHead back={back} title="Итог" />
      <div className="screen fade min-fill"><div className="pad col">
        <div className="tac mt8">
          <div className="pop" style={{ width: 72, height: 72, margin: "0 auto", borderRadius: 18, display: "grid", placeItems: "center", background: won ? "var(--accent)" : "var(--surface-2)", border: won ? "none" : "1px solid var(--border)", color: won ? "var(--on-accent)" : "var(--text-3)" }}>{won ? <IconTrophy size={36} /> : <IconGhost size={36} />}</div>
          <div className="eyebrow mt16">{won ? "Победа" : "Поражение"}</div>
          <h1 className="display mt8">{won ? "Ты выиграл дуэль" : `Победил ${opp.name.split(" ")[0]}`}</h1>
        </div>
        <div className="card card-pad row mt20" style={{ alignItems: "center" }}>
          <div className="grow col center tac" style={{ gap: 8, alignItems: "center" }}><Avatar initials={me.initials} size={38} color={me.color} /><Stat label="Ты" value={score.me} color="var(--accent-text)" /></div>
          <span className="mono" style={{ color: "var(--text-3)" }}>—</span>
          <div className="grow col center tac" style={{ gap: 8, alignItems: "center" }}><Avatar initials={opp.initials} size={38} color={opp.color} /><Stat label={opp.name.split(" ")[0]} value={score.opp} color="var(--text-3)" /></div>
        </div>
        <div className="card card-pad row between mt12"><span className="small" style={{ color: "var(--text)" }}>{won ? "Выигрыш матча" : "Утешительный бонус"}</span><Pts v={won ? 220 : 60} sign size={17} color={won ? "var(--accent-text)" : "var(--text-2)"} /></div>
        <div className="row g10 mt24" style={{ gap: 10 }}>
          <button className="btn btn-ghost lg grow" onClick={() => { setPhase("lobby"); setStep(0); setStage("issue"); setMsgs([]); setScore({me:0,opp:0}); setFirst(null); }}><IconRefresh size={18} />Реванш</button>
          <button className="btn btn-primary lg grow" onClick={back}>Готово</button>
        </div>
      </div></div>
    </>;
  }

  return <>
    <div className="flowhead" style={{ paddingBottom: 8 }}>
      <button className="icon-btn" onClick={back}><IconArrowL size={18} /></button>
      <div className="grow row center" style={{ gap: 14, justifyContent: "center" }}>
        <div className="row g8" style={{ gap: 8 }}><Avatar initials={me.initials} size={28} color={me.color} /><span className="mono" style={{ fontSize: 17, fontWeight: 700 }}>{score.me}</span></div>
        <span className="small" style={{ color: "var(--text-4)" }}>:</span>
        <div className="row g8" style={{ gap: 8 }}><span className="mono" style={{ fontSize: 17, fontWeight: 700, color: "var(--text-3)" }}>{score.opp}</span><Avatar initials={opp.initials} size={28} color={opp.color} /></div>
      </div>
      <div style={{ width: 38 }} />
    </div>
    <div className="pad" style={{ paddingTop: 0, paddingBottom: 12 }}>
      <div className="row between mb8"><span className="eyebrow">Раунд {Math.floor(step/2)+1} из 3</span><span className="small mono">осталось {6 - msgs.filter(m=>m.type==='score').length}</span></div>
      <Segs total={6} done={msgs.filter(m=>m.type==='score').length} active={step} />
    </div>
    <div className="screen" ref={threadRef}>
      <div className="pad chat" style={{ paddingTop: 4 }}>
        {msgs.map((m) => <DuelMsg key={m.id} m={m} me={me} opp={opp} />)}
        {myTurnIssue && <div className="bubble sys">Твой ход — задай челлендж</div>}
        {myTurnRespond && <div className="bubble sys">Выполни челлендж соперника и отправь доказательство</div>}
      </div>
    </div>
    {myTurnIssue && <div className="input-zone">
      <div className="row g8 mb8" style={{ gap: 8, overflowX: "auto", paddingBottom: 2 }}>
        {DUEL_CHALLENGES_POOL.slice(0,4).map((s) => <button key={s} className="chip" style={{ height: 28, whiteSpace: "nowrap" }} onClick={() => setDraft(s)}>{s}</button>)}
      </div>
      <div className="row g8" style={{ gap: 8 }}>
        <input className="field grow" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Задай челлендж…" onKeyDown={(e)=> e.key==='Enter' && sendChallenge()} />
        <button className="btn btn-primary" disabled={!draft.trim()} onClick={sendChallenge} style={{ width: 46, padding: 0, height: 46 }}><IconChevR size={20} /></button>
      </div>
    </div>}
    {myTurnRespond && <div className="input-zone">
      <ProofUpload allow={["photo","link","text"]} value={proof} onChange={setProof} compact />
      {filled && <button className="btn btn-primary block mt12" onClick={sendProof}><IconCheck size={18} />Отправить</button>}
    </div>}
  </>;
}

function DuelHead({ back, title = "Дуэль" }) {
  return <div className="flowhead">
    <button className="icon-btn" onClick={back}><IconArrowL size={18} /></button>
    <div className="grow"><div className="fh-title row g8" style={{ gap: 8 }}>{title} <span className="tag" style={{ height: 19 }}>1 на 1</span></div></div>
  </div>;
}

function DuelMsg({ m, me, opp }) {
  if (m.type === "sys") return <div className="bubble sys">{m.text}</div>;
  if (m.type === "typing") return <div className="row g8" style={{ gap: 8 }}><Avatar initials={opp.initials} size={26} color={opp.color} /><div className="bubble them"><Typing /></div></div>;
  const mine = m.who === "me"; const who = mine ? me : opp;
  if (m.type === "challenge") return <div className="row g8" style={{ gap: 8, flexDirection: mine ? "row-reverse" : "row", alignItems: "flex-start" }}>
    <Avatar initials={who.initials} size={26} color={who.color} />
    <div className="card card-pad" style={{ maxWidth: "80%", padding: 12, borderColor: mine ? "var(--accent-line)" : "var(--border)", background: mine ? "var(--accent-soft)" : "var(--surface)" }}>
      <div className="eyebrow mb8" style={{ color: mine ? "var(--accent-text)" : "var(--text-3)" }}>{mine ? "Ты задал" : who.name.split(" ")[0] + " задал"}</div>
      <div className="h3" style={{ fontWeight: 600 }}>{m.text}</div>
    </div>
  </div>;
  if (m.type === "proof") {
    const ic = { photo: <IconImage size={15}/>, link: <IconLink size={15}/>, text: <IconChat size={15}/>, camera: <IconCamera size={15}/> }[m.kind] || <IconCheck size={15}/>;
    return <div className="row g8" style={{ gap: 8, flexDirection: mine ? "row-reverse" : "row", alignItems: "flex-start" }}>
      <Avatar initials={who.initials} size={26} color={who.color} />
      <div style={{ maxWidth: "80%" }}>
        {mine && m.proof
          ? <ProofPreview proof={m.proof} style={{ marginBottom: 6 }} />
          : <>
              {m.kind === "photo" && <Placeholder label="фото доказательства" h={110} style={{ width: 168, marginBottom: 6 }} />}
              {m.kind === "link" && <div className="card card-pad row g8" style={{ gap: 8, padding: 10, marginBottom: 6 }}><IconLink size={15} style={{ color: "var(--accent-text)" }} /><span className="mono small">strava.com/run/8842</span></div>}
            </>}
        <div className={"bubble " + (mine ? "me" : "them")} style={{ maxWidth: "100%", display: "inline-flex", gap: 6, alignItems: "center" }}>{ic} {m.note}</div>
      </div>
    </div>;
  }
  if (m.type === "score") return <div className="bubble sys" style={{ color: mine ? "var(--accent-text)" : "var(--text-2)" }}>{mine ? "Ты" : who.name.split(" ")[0]} получил +{m.pts} очк.</div>;
  return null;
}

Object.assign(window, { DuelScreen });
