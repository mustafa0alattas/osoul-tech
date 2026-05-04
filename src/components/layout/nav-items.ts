export type NavKey = "home" | "about" | "how" | "shariah" | "faq" | "contact";

export type NavItem = {
  key: NavKey;
  href: string;
};

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "how", href: "/how-it-works" },
  { key: "shariah", href: "/shariah" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];
