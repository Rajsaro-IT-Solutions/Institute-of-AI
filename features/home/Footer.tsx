import Link from "next/link";
import Container from "@/components/layout/Container";
import { BRAND } from "@/constants/brand";
import { FOOTER_LINKS } from "@/constants/navigation";
import { SOCIAL_LINKS } from "@/constants/social";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <p className="text-sm uppercase tracking-[0.32em] text-blue-700">{BRAND.shortName}</p>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900">{BRAND.name}</h3>
            <p className="mt-4 text-base leading-8 text-slate-600">{BRAND.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:text-blue-700"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                {section}
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {links.map((link) => (
                  <Link
                    key={`${section}-${link.label}-${link.href}`}
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
