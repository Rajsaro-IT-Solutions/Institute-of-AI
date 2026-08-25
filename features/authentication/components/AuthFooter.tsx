import Link from "next/link";

export default function AuthFooter({
  prompt,
  linkHref,
  linkLabel,
}: Readonly<{
  prompt: string;
  linkHref: string;
  linkLabel: string;
}>) {
  return (
    <div className="mt-8 text-center text-sm text-slate-500">
      {prompt}{" "}
      <Link href={linkHref} className="font-semibold text-blue-600 hover:text-blue-700">
        {linkLabel}
      </Link>
    </div>
  );
}