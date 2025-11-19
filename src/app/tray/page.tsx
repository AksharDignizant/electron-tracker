import BreakDayzTray from "@/components/tray/tray-dashboard";

export default function TrayPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-zinc-900 scrollbar-hide">
      <div className="rounded-[28px] border border-white/60 bg-white p-4 shadow-[0_20px_60px_rgba(16,185,129,0.08)]">
        <BreakDayzTray />
      </div>
    </div>
  );
}
