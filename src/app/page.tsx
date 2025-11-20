import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50/40 to-white px-4 py-16 text-zinc-800">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <section className="rounded-3xl border border-emerald-100 bg-white/80 p-10 shadow-xl shadow-emerald-100/60">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-500">
            BreakDayz Tracker
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-zinc-900">
            Desktop time tracking with tray-first ergonomics.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600">
            Use the dedicated tray interface for quick clock-in/out workflows,
            and manage settings from the main window. The UI uses shadcn +
            Tailwind to stay consistent in both contexts.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-3 text-white shadow-lg shadow-emerald-300/60 transition hover:bg-emerald-600"
              href="/tray"
            >
              Preview tray dashboard
            </Link>
            <a
              className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-3 text-zinc-700 hover:bg-zinc-50"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noreferrer"
            >
              Next.js docs
            </a>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white/90 shadow-lg">
            <CardHeader>
              <CardTitle>Tray-first gestures</CardTitle>
              <CardDescription>
                Clicking the tray icon opens the compact tracker UI. It hides
                automatically on blur, keeping the desktop tidy.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600">
              <ul className="list-disc space-y-2 pl-4">
                <li>Clock in/out with contextual prompts.</li>
                <li>View activity summaries and break usage.</li>
                <li>Fast actions for attendance notes or authentication.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/90 shadow-lg">
            <CardHeader>
              <CardTitle>Main application</CardTitle>
              <CardDescription>
                The standard window hosts richer settings, reports, and any
                future Next.js pages you add.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600">
              <ul className="list-disc space-y-2 pl-4">
                <li>Launch via the tray menu’s “Open App” option.</li>
                <li>Built with the same component system for consistency.</li>
                <li>Supports live reload in development.</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
