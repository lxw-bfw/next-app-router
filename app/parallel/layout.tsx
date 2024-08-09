import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({
  children,
  team,
  analytics,
}: Readonly<{
  children: ReactNode;
  team: ReactNode;
  analytics: ReactNode;
}>) {
  return (
    <div className="p-6">
      <div className="p-10 mb-6 bg-sky-600 text-white rounded-xl">
        Parallel Routes Examples
      </div>
      <nav className="flex items-center justify-center gap-10 text-blue-600 mb-6">
        <Link href="/parallel">Parallel Home</Link>
        <Link href="/parallel/page-views">Parallel Page Views</Link>
        <Link href="/parallel/visitors">Parallel Visitors</Link>
      </nav>
      <div className="flex gap-6">
        {team}
        {analytics}
      </div>
      {children}
    </div>
  );
}
