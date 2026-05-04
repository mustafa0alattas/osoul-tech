export type NavKey = "about" | "how" | "shariah" | "faq" | "contact";

export type NavItem = {
  key: NavKey;
  href: string;
};

// The Logo is the home affordance; an explicit "Home" / "الرئيسية" link
// would be redundant, so it's omitted here. Other "home" translation keys
// (page metadata, footer copy) still use messages.Nav.home where present.
export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { key: "about", href: "/about" },
  { key: "how", href: "/how-it-works" },
  { key: "shariah", href: "/shariah" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];
