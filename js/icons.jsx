/* CanYou? — icon set. Simple stroke line icons, currentColor, 24px default. */
const Icon = ({ d, size = 22, sw = 1.75, fill = "none", children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {d ? <path d={d} /> : children}
  </svg>
);

const IconHome = (p) => <Icon {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/><path d="M9.5 21v-6h5v6"/></Icon>;
const IconBot = (p) => <Icon {...p}><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V4.5"/><circle cx="12" cy="3.4" r="1.2"/><path d="M9.5 13v1.5M14.5 13v1.5"/><path d="M2.5 12v3M21.5 12v3"/></Icon>;
const IconSwords = (p) => <Icon {...p}><path d="M14.5 14.5 21 21M21 21h-3.2M21 21v-3.2"/><path d="M3 3h3l11 11"/><path d="M3 3v3l11 11"/><path d="M9.5 14.5 3 21M3 21h3.2M3 21v-3.2"/><path d="M21 3h-3l-11 11"/><path d="M21 3v3l-11 11"/></Icon>;
const IconLayers = (p) => <Icon {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></Icon>;
const IconTrophy = (p) => <Icon {...p}><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3"/><path d="M12 14v3M9 21h6M9.5 21l.5-4h4l.5 4"/></Icon>;
const IconUser = (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"/></Icon>;
const IconCamera = (p) => <Icon {...p}><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"/><circle cx="12" cy="12.5" r="3.2"/></Icon>;
const IconImage = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 18 5-5 4 4 3-2.5L20 17"/></Icon>;
const IconLink = (p) => <Icon {...p}><path d="M10 14a4 4 0 0 0 5.66 0l3-3A4 4 0 1 0 13 5.34l-1.5 1.5"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3A4 4 0 1 0 11 18.66l1.5-1.5"/></Icon>;
const IconChat = (p) => <Icon {...p}><path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/></Icon>;
const IconClock = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></Icon>;
const IconCheck = (p) => <Icon {...p}><path d="m5 12.5 4.5 4.5L19 7"/></Icon>;
const IconCheckCircle = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="m8 12 2.8 2.8L16 9.4"/></Icon>;
const IconChevR = (p) => <Icon {...p}><path d="m9 5 7 7-7 7"/></Icon>;
const IconChevL = (p) => <Icon {...p}><path d="m15 5-7 7 7 7"/></Icon>;
const IconArrowL = (p) => <Icon {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></Icon>;
const IconPlus = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>;
const IconFlame = (p) => <Icon {...p}><path d="M12 3c1 3-1.5 4.5-1.5 7A2.5 2.5 0 0 0 13 12.5c.5-1.2.4-2 .4-2 1.6 1.2 2.6 3 2.6 5a4 4 0 1 1-8 0c0-3.5 3-5.5 4-12.5Z"/></Icon>;
const IconBolt = (p) => <Icon {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></Icon>;
const IconStar = (p) => <Icon {...p}><path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.9 6.7 19.4l1.2-6L3.4 9.3l6-.7L12 3Z"/></Icon>;
const IconTarget = (p) => <Icon {...p}><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/></Icon>;
const IconUsers = (p) => <Icon {...p}><circle cx="9" cy="8" r="3.4"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5"/><path d="M16 5.2A3.4 3.4 0 0 1 16 12M21 20c0-2.6-1.6-4.3-4-4.8"/></Icon>;
const IconDice = (p) => <Icon {...p}><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.1" fill="currentColor" stroke="none"/></Icon>;
const IconShare = (p) => <Icon {...p}><circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><path d="m8.1 11 6.8-3.8M8.1 13l6.8 3.8"/></Icon>;
const IconSettings = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V20a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H4a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3 1.6 1.6 0 0 0 1-1.5V4a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1H20a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/></Icon>;
const IconBattery = (p) => <Icon {...p}><rect x="2" y="7" width="18" height="10" rx="2.5"/><path d="M22 10v4"/><rect x="4" y="9" width="13" height="6" rx="1" fill="currentColor" stroke="none"/></Icon>;
const IconWifi = (p) => <Icon {...p} sw={1.6}><path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8 15.4a5 5 0 0 1 8 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/></Icon>;
const IconSignal = (p) => <Icon {...p} sw={0}><rect x="2" y="14" width="3" height="6" rx="1" fill="currentColor"/><rect x="7" y="11" width="3" height="9" rx="1" fill="currentColor"/><rect x="12" y="8" width="3" height="12" rx="1" fill="currentColor"/><rect x="17" y="5" width="3" height="15" rx="1" fill="currentColor"/></Icon>;
const IconClose = (p) => <Icon {...p}><path d="M6 6 18 18M18 6 6 18"/></Icon>;
const IconRefresh = (p) => <Icon {...p}><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 4v4h-4"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 20v-4h4"/></Icon>;
const IconLock = (p) => <Icon {...p}><rect x="5" y="10" width="14" height="10" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></Icon>;
const IconCrown = (p) => <Icon {...p}><path d="M3 7l4 4 5-7 5 7 4-4-2 12H5L3 7Z"/></Icon>;
const IconArrowUp = (p) => <Icon {...p}><path d="M12 19V5M6 11l6-6 6 6"/></Icon>;
const IconMedal = (p) => <Icon {...p}><circle cx="12" cy="14" r="6"/><path d="M9 3l3 5 3-5"/><path d="M12 11.5 13 13.5 15 13.8 13.5 15.3 13.9 17.5 12 16.5 10.1 17.5 10.5 15.3 9 13.8 11 13.5 12 11.5Z"/></Icon>;
const IconGhost = (p) => <Icon {...p}><path d="M5 20V10a7 7 0 0 1 14 0v10l-2.3-1.6L14.4 20 12 18.3 9.6 20l-2.3-1.6L5 20Z"/><circle cx="9.5" cy="10" r="0.9" fill="currentColor" stroke="none"/><circle cx="14.5" cy="10" r="0.9" fill="currentColor" stroke="none"/></Icon>;
const IconSparkle = (p) => <Icon {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M12 8c.7 2.4 1.6 3.3 4 4-2.4.7-3.3 1.6-4 4-.7-2.4-1.6-3.3-4-4 2.4-.7 3.3-1.6 4-4Z" fill="currentColor" stroke="none"/></Icon>;

const IconSun = (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/></Icon>;
const IconMoon = (p) => <Icon {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></Icon>;
const IconMonitor = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M9 21h6M12 17v4"/></Icon>;
const IconPhone = (p) => <Icon {...p}><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></Icon>;

Object.assign(window, {
  Icon, IconHome, IconBot, IconSwords, IconLayers, IconTrophy, IconUser, IconCamera,
  IconImage, IconLink, IconChat, IconClock, IconCheck, IconCheckCircle, IconChevR,
  IconChevL, IconArrowL, IconPlus, IconFlame, IconBolt, IconStar, IconTarget, IconUsers,
  IconDice, IconShare, IconSettings, IconBattery, IconWifi, IconSignal, IconClose,
  IconRefresh, IconLock, IconCrown, IconArrowUp, IconMedal, IconGhost, IconSparkle,
  IconSun, IconMoon, IconMonitor, IconPhone,
});
