"use client";

import { useEffect, useState } from "react";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Variant /1 primary CTA — uses View Transitions API to morph into the
 * destination page's hero block. Falls back to standard navigation.
 */
export function CinematicCta({ href, className, children }: Props) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => unknown;
    };
    if (typeof doc.startViewTransition !== "function") return;
    e.preventDefault();
    doc.startViewTransition(() => {
      window.location.href = (e.currentTarget as HTMLAnchorElement).href;
    });
  };

  return (
    <a
      href={href}
      onClick={onClick}
      style={{ viewTransitionName: "register-cta-v1" }}
      className={className}
    >
      {children}
    </a>
  );
}
