/* CanYou? — mock data */

const ME = { name: "Вы", handle: "@you", initials: "ВЫ", points: 4820, rank: "Золото II", color: "linear-gradient(145deg,#9D70FF,#7C4DEF)" };

// AI challenge tasks per difficulty
const AI_TASKS = {
  "Лёгкий": [
    { title: "Сфотографируй что-нибудь синее", desc: "Найди любой синий предмет рядом и сделай снимок.", time: 60, kind: "photo" },
    { title: "История из 6 слов", desc: "Цельная история ровно из шести слов.", time: 90, kind: "text" },
    { title: "Поза супергероя", desc: "Фото в доказательство. Бонус за плащ.", time: 60, kind: "photo" },
  ],
  "Средний": [
    { title: "Башня из 3 предметов", desc: "Сложи три разных предмета. Сфотографируй результат.", time: 75, kind: "photo" },
    { title: "5 столиц за 30 сек", desc: "Введи пять столиц мира. Без повторов.", time: 45, kind: "text" },
    { title: "Повтори обложку альбома", desc: "Используй то, что под рукой. Фото в доказательство.", time: 90, kind: "photo" },
  ],
  "Сложный": [
    { title: "Планка 60 секунд", desc: "Сними или сфотографируй финиш. Не опускайся раньше.", time: 80, kind: "photo" },
    { title: "Четверостишие с рифмой", desc: "Напиши 4 строки. Рифма обязательна.", time: 60, kind: "text" },
    { title: "Повтори точную позу", desc: "Совпади с эталоном. Фото в доказательство.", time: 70, kind: "photo" },
  ],
};

const DIFF_META = {
  "Лёгкий":  { mult: "1.0×", base: 60,  color: "easy" },
  "Средний": { mult: "1.6×", base: 110, color: "med" },
  "Сложный": { mult: "2.4×", base: 180, color: "hard" },
};

// Catalog challenges
const CATALOG = [
  { id: "c1", title: "Пробежать 10 км без остановки", author: "marcus_r", initials: "MR", diff: "Сложный", attempts: 1284, pts: 320, cat: "Фитнес", img: "фото тропы", desc: "Один непрерывный забег. Скрин GPS или экспорт с часов. Перерывы на ходьбу не засчитываются." },
  { id: "c2", title: "Блюдо из 3 случайных ингредиентов", author: "lena.k", initials: "LK", diff: "Средний", attempts: 642, pts: 150, cat: "Еда", img: "блюдо на тарелке", desc: "Крути колесо ингредиентов и приготовь съедобное. Фото готового блюда." },
  { id: "c3", title: "Выучить фокус с картами за день", author: "deck_dan", initials: "DD", diff: "Средний", attempts: 389, pts: 140, cat: "Навыки", img: "веер карт", desc: "Запиши 20-секундное видео с одним чистым трюком. Без склеек." },
  { id: "c4", title: "Поговорить с незнакомцем и сделать фото", author: "social_sam", initials: "SS", diff: "Сложный", attempts: 215, pts: 280, cat: "Общение", img: "уличное фото", desc: "Настоящий новый контакт. Сначала согласие. Селфи вместе как доказательство." },
  { id: "c5", title: "Набросать утренний кофе", author: " studio.jo", initials: "JO", diff: "Лёгкий", attempts: 2103, pts: 70, cat: "Искусство", img: "чернильный набросок", desc: "Ручка, карандаш — что угодно. Максимум 10 минут. Сфотографируй лист." },
  { id: "c6", title: "Холодный душ 5 дней подряд", author: "iceman", initials: "IC", diff: "Сложный", attempts: 941, pts: 300, cat: "Дисциплина", img: "—", desc: "Отметь пять утренних дней подряд. Одно фото-чекин в день." },
  { id: "c7", title: "Выучить стихотворение и прочитать", author: "verse", initials: "VE", diff: "Средний", attempts: 458, pts: 160, cat: "Навыки", img: "—", desc: "Минимум 16 строк. Запиши себя без шпаргалки." },
  { id: "c8", title: "Без телефона 3 часа", author: "offline", initials: "OF", diff: "Лёгкий", attempts: 3320, pts: 80, cat: "Дисциплина", img: "—", desc: "Скрин экранного времени с паузой 3 часа. Остальное — на честном слове." },
];

const CATS = ["Все", "Фитнес", "Навыки", "Еда", "Общение", "Искусство", "Дисциплина"];

// Leaderboard
const LEADERS = [
  { rank: 1, name: "Mara Vinter", handle: "@maravin", initials: "MV", pts: 38420, tier: "Алмаз", delta: 0,  color: "linear-gradient(145deg,#6EE7F0,#3B82F6)" },
  { rank: 2, name: "Kojo Mensah", handle: "@kojo", initials: "KM", pts: 35110, tier: "Алмаз", delta: 1,  color: "linear-gradient(145deg,#FCA5A5,#F4694B)" },
  { rank: 3, name: "Yui Tanaka", handle: "@yuit", initials: "YT", pts: 33980, tier: "Платина", delta: -1, color: "linear-gradient(145deg,#FBBF24,#E8A33D)" },
  { rank: 4, name: "Dario Sol", handle: "@dsol", initials: "DS", pts: 29740, tier: "Платина", delta: 2, color: "linear-gradient(145deg,#A3E635,#34D399)" },
  { rank: 5, name: "Priya N.", handle: "@priyan", initials: "PN", pts: 24510, tier: "Платина", delta: 0, color: "linear-gradient(145deg,#C084FC,#8B5CF6)" },
  { rank: 6, name: "Tomás Ruiz", handle: "@tomr", initials: "TR", pts: 19980, tier: "Золото", delta: -2, color: "linear-gradient(145deg,#F0ABFC,#C026D3)" },
  { rank: 7, name: "Ava Okonkwo", handle: "@avao", initials: "AO", pts: 16200, tier: "Золото", delta: 3, color: "linear-gradient(145deg,#67E8F9,#06B6D4)" },
  { rank: 12, name: "Вы", handle: "@you", initials: "ВЫ", pts: 4820, tier: "Золото", delta: 4, me: true, color: "linear-gradient(145deg,#9D70FF,#7C4DEF)" },
  { rank: 13, name: "Felix Bauer", handle: "@fbauer", initials: "FB", pts: 4610, tier: "Золото", delta: -1, color: "linear-gradient(145deg,#FDBA74,#F97316)" },
  { rank: 14, name: "Noor A.", handle: "@noora", initials: "NA", pts: 4380, tier: "Серебро", delta: 0, color: "linear-gradient(145deg,#94A3B8,#64748B)" },
];

const TIERS = [
  { name: "Бронза",   min: 0,     color: "#C2865B" },
  { name: "Серебро",  min: 2000,  color: "#B8C0CC" },
  { name: "Золото",   min: 4000,  color: "#F1C45A" },
  { name: "Платина",  min: 8000,  color: "#7FE0E8" },
  { name: "Алмаз",    min: 16000, color: "#A78BFA" },
];

const OPPONENT = { name: "Kojo Mensah", handle: "@kojo", initials: "KM", rank: "Алмаз", color: "linear-gradient(145deg,#FCA5A5,#F4694B)" };

const DUEL_CHALLENGES_POOL = [
  "20 отжиманий — сними на видео",
  "Самый старый предмет в комнате",
  "Спой 10 секунд любой песни",
  "Нарисуй меня за 30 секунд",
  "Покажи последнее использование любимого эмодзи",
  "Удержи предмет на голове 5 сек",
];

Object.assign(window, {
  ME, AI_TASKS, DIFF_META, CATALOG, CATS, LEADERS, TIERS, OPPONENT, DUEL_CHALLENGES_POOL,
});
