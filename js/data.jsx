/* CanYou? — mock data */

const ME = { name: "You", handle: "@you", initials: "YO", points: 4820, rank: "Gold II", color: "linear-gradient(145deg,#9D70FF,#7C4DEF)" };

// AI challenge tasks per difficulty
const AI_TASKS = {
  Easy: [
    { title: "Snap something blue", desc: "Find any blue object near you and photograph it.", time: 60, kind: "photo" },
    { title: "Write a 6-word story", desc: "A complete story in exactly six words.", time: 90, kind: "text" },
    { title: "Strike a superhero pose", desc: "Photo proof. Bonus points for a cape.", time: 60, kind: "photo" },
  ],
  Medium: [
    { title: "Build a 3-item tower", desc: "Stack three different objects. Photograph the result.", time: 75, kind: "photo" },
    { title: "Name 5 capitals in 30s", desc: "Type five world capitals. No repeats.", time: 45, kind: "text" },
    { title: "Re-create an album cover", desc: "Use whatever's around you. Photo proof.", time: 90, kind: "photo" },
  ],
  Hard: [
    { title: "Solo plank — 60 seconds", desc: "Film or photograph the finish. Don't drop early.", time: 80, kind: "photo" },
    { title: "Freestyle 4 rhyming lines", desc: "Type a 4-line verse. Must actually rhyme.", time: 60, kind: "text" },
    { title: "Mirror this exact pose", desc: "Match the reference within tolerance. Photo proof.", time: 70, kind: "photo" },
  ],
};

const DIFF_META = {
  Easy:   { mult: "1.0×", base: 60,  color: "easy" },
  Medium: { mult: "1.6×", base: 110, color: "med" },
  Hard:   { mult: "2.4×", base: 180, color: "hard" },
};

// Catalog challenges
const CATALOG = [
  { id: "c1", title: "Run 10km without stopping", author: "marcus_r", initials: "MR", diff: "Hard", attempts: 1284, pts: 320, cat: "Fitness", img: "trail photo", desc: "One continuous run. GPS screenshot or smartwatch export as proof. No walking breaks count." },
  { id: "c2", title: "Cook a meal from 3 random ingredients", author: "lena.k", initials: "LK", diff: "Medium", attempts: 642, pts: 150, cat: "Food", img: "plated dish", desc: "Spin the ingredient wheel, then plate something edible. Photo of the final dish." },
  { id: "c3", title: "Learn a card trick in a day", author: "deck_dan", initials: "DD", diff: "Medium", attempts: 389, pts: 140, cat: "Skill", img: "card fan", desc: "Record a 20-second clip performing one clean trick. No cuts." },
  { id: "c4", title: "Talk to a stranger & get a photo", author: "social_sam", initials: "SS", diff: "Hard", attempts: 215, pts: 280, cat: "Social", img: "street photo", desc: "A genuine new connection. Consent first. Selfie together as proof." },
  { id: "c5", title: "Sketch your morning coffee", author: " studio.jo", initials: "JO", diff: "Easy", attempts: 2103, pts: 70, cat: "Art", img: "ink sketch", desc: "Pen, pencil, anything. 10 minutes max. Photograph the page." },
  { id: "c6", title: "Cold shower, 5 days straight", author: "iceman", initials: "IC", diff: "Hard", attempts: 941, pts: 300, cat: "Discipline", img: "—", desc: "Log five consecutive mornings. One check-in photo per day." },
  { id: "c7", title: "Memorize a poem & recite it", author: "verse", initials: "VE", diff: "Medium", attempts: 458, pts: 160, cat: "Skill", img: "—", desc: "16 lines minimum. Record yourself reciting without notes." },
  { id: "c8", title: "Zero phone for 3 hours", author: "offline", initials: "OF", diff: "Easy", attempts: 3320, pts: 80, cat: "Discipline", img: "—", desc: "Screen-time screenshot proving a 3-hour gap. Honor system on the rest." },
];

const CATS = ["All", "Fitness", "Skill", "Food", "Social", "Art", "Discipline"];

// Leaderboard
const LEADERS = [
  { rank: 1, name: "Mara Vinter", handle: "@maravin", initials: "MV", pts: 38420, tier: "Diamond", delta: 0,  color: "linear-gradient(145deg,#6EE7F0,#3B82F6)" },
  { rank: 2, name: "Kojo Mensah", handle: "@kojo", initials: "KM", pts: 35110, tier: "Diamond", delta: 1,  color: "linear-gradient(145deg,#FCA5A5,#F4694B)" },
  { rank: 3, name: "Yui Tanaka", handle: "@yuit", initials: "YT", pts: 33980, tier: "Platinum", delta: -1, color: "linear-gradient(145deg,#FBBF24,#E8A33D)" },
  { rank: 4, name: "Dario Sol", handle: "@dsol", initials: "DS", pts: 29740, tier: "Platinum", delta: 2, color: "linear-gradient(145deg,#A3E635,#34D399)" },
  { rank: 5, name: "Priya N.", handle: "@priyan", initials: "PN", pts: 24510, tier: "Platinum", delta: 0, color: "linear-gradient(145deg,#C084FC,#8B5CF6)" },
  { rank: 6, name: "Tomás Ruiz", handle: "@tomr", initials: "TR", pts: 19980, tier: "Gold", delta: -2, color: "linear-gradient(145deg,#F0ABFC,#C026D3)" },
  { rank: 7, name: "Ava Okonkwo", handle: "@avao", initials: "AO", pts: 16200, tier: "Gold", delta: 3, color: "linear-gradient(145deg,#67E8F9,#06B6D4)" },
  // me — rank 12
  { rank: 12, name: "You", handle: "@you", initials: "YO", pts: 4820, tier: "Gold", delta: 4, me: true, color: "linear-gradient(145deg,#9D70FF,#7C4DEF)" },
  { rank: 13, name: "Felix Bauer", handle: "@fbauer", initials: "FB", pts: 4610, tier: "Gold", delta: -1, color: "linear-gradient(145deg,#FDBA74,#F97316)" },
  { rank: 14, name: "Noor A.", handle: "@noora", initials: "NA", pts: 4380, tier: "Silver", delta: 0, color: "linear-gradient(145deg,#94A3B8,#64748B)" },
];

const TIERS = [
  { name: "Bronze",   min: 0,     color: "#C2865B" },
  { name: "Silver",   min: 2000,  color: "#B8C0CC" },
  { name: "Gold",     min: 4000,  color: "#F1C45A" },
  { name: "Platinum", min: 8000,  color: "#7FE0E8" },
  { name: "Diamond",  min: 16000, color: "#A78BFA" },
];

// Duel opponent
const OPPONENT = { name: "Kojo Mensah", handle: "@kojo", initials: "KM", rank: "Diamond", color: "linear-gradient(145deg,#FCA5A5,#F4694B)" };

const DUEL_CHALLENGES_POOL = [
  "Do 20 pushups — film it",
  "Find the oldest object in your room",
  "Sing 10 seconds of any song",
  "Draw me in 30 seconds",
  "Show your most-used emoji's last use",
  "Balance something on your head, 5s",
];

Object.assign(window, {
  ME, AI_TASKS, DIFF_META, CATALOG, CATS, LEADERS, TIERS, OPPONENT, DUEL_CHALLENGES_POOL,
});
