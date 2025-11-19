"use client";

import { useState } from "react";
import {
  Clock,
  LogOut,
  X,
  AlertTriangle,
  ShieldAlert,
  RefreshCw,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ModalType = "late" | "early" | "manual" | null;

export default function BreakDayzTray() {
  const [modal, setModal] = useState<ModalType>(null);
  const [isClockedIn, setIsClockedIn] = useState(false);

  const handleClockAction = () => {
    if (!isClockedIn) {
      setModal("late");
    } else {
      setModal("early");
    }
  };

  const handleModalSubmit = () => {
    if (modal === "late") {
      setIsClockedIn(true);
    } else if (modal === "early") {
      setIsClockedIn(false);
    }
    setModal(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="mx-auto w-full max-w-md">
          {/* Main Card */}
          <Card className="overflow-hidden border-slate-200 shadow-lg">
            {/* Header */}
            <CardHeader className="border-b border-slate-200 bg-white pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-sm">
                    <span className="text-lg font-bold">B</span>
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold text-slate-900">
                      BreakDayz.
                    </h1>
                    <p className="text-xs text-slate-500">Tracker Tray</p>
                  </div>
                </div>
                <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                  <X className="size-4" />
                </button>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="space-y-4 bg-gradient-to-b from-white to-slate-50 p-4">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-gradient-to-br from-rose-200 to-rose-300 shadow-sm" />
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Paul Mora
                  </h2>
                  <p className="text-xs text-slate-500">Sr. UI/UX Designer</p>
                </div>
              </div>

              {/* Time Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100/50 p-3 shadow-sm">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-cyan-700">
                    Current Time
                  </p>
                  <p className="text-lg font-bold text-slate-900">08:32:44</p>
                </div>
                <div className="space-y-1 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100/50 p-3 shadow-sm">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-orange-700">
                    Break Time
                  </p>
                  <p className="text-lg font-bold text-slate-900">01:15:50</p>
                </div>
              </div>

              {/* Clock In/Out Button */}
              <Button
                onClick={handleClockAction}
                className="h-11 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 font-semibold text-white shadow-md hover:from-emerald-600 hover:to-emerald-700"
              >
                <Clock className="mr-2 size-4" />
                {isClockedIn ? "Clock Out" : "Clock In"}
              </Button>

              {/* Today Activity */}
              <div className="space-y-3 rounded-lg bg-white p-3 shadow-sm">
                <h3 className="text-xs font-semibold text-slate-700">
                  Today Activity
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between border-b border-dashed border-slate-200 pb-2 text-xs">
                    <div>
                      <p className="font-medium text-slate-900">
                        Clock In • Clock Out
                      </p>
                      <p className="text-slate-500">09:05 AM - 01:05 PM</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400">Total Time</p>
                      <p className="font-semibold text-slate-900">04h00:00</p>
                    </div>
                  </div>

                  <div className="flex justify-between border-b border-dashed border-slate-200 pb-2 text-xs">
                    <div>
                      <p className="font-medium text-slate-900">
                        Break In • Break Out
                      </p>
                      <p className="text-slate-500">01:05 PM - 02:04 PM</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400">Total Time</p>
                      <p className="font-semibold text-slate-900">00:59:50</p>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <div>
                      <p className="font-medium text-slate-900">
                        Clock In • Clock Out
                      </p>
                      <p className="text-slate-500">02:04 PM -</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400">Total Time</p>
                      <p className="font-semibold text-slate-400">—</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Cards */}
          <div className="mt-4 space-y-3">
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-red-600">
                  <AlertTriangle className="size-4" />
                  Shift Not Available
                </CardTitle>
                <CardDescription className="text-xs">
                  Unable to proceed with clock-in
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex gap-2 border-t border-red-100 bg-white pt-3">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <RefreshCw className="mr-1 size-3" />
                  Retry
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  Close
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-blue-600">
                  <ShieldAlert className="size-4" />
                  Authentication Required
                </CardTitle>
                <CardDescription className="text-xs">
                  You need to be logged in to access the tray tracker.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex gap-2 border-t border-blue-100 bg-white pt-3">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <RefreshCw className="mr-1 size-3" />
                  Retry
                </Button>
                <Button size="sm" className="flex-1 text-xs">
                  <LogIn className="mr-1 size-3" />
                  Open Login
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal === "late" && (
        <ModalOverlay
          title="Reason for Late Arrival"
          description="Share a note for the supervisor before clocking in."
          actionLabel="Clock In"
          onClose={() => setModal(null)}
          onSubmit={handleModalSubmit}
        />
      )}

      {modal === "early" && (
        <ModalOverlay
          title="Early Clock-Out Reason"
          description="Your working hours is less than 04:00:00. Please record the reason."
          actionLabel="Clock Out"
          onClose={() => setModal(null)}
          onSubmit={handleModalSubmit}
        />
      )}

      {modal === "manual" && (
        <ModalOverlay
          title="Add Attendance & Leave"
          description="Record the entry if the biometric data is missing in the system."
          actionLabel="Save"
          onClose={() => setModal(null)}
          onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
}

function ModalOverlay({
  title,
  description,
  actionLabel,
  onClose,
  onSubmit,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">Reason</label>
            <Input placeholder="Testing" className="text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">
              Additional Notes
            </label>
            <Textarea
              placeholder="Type your notes here..."
              className="min-h-[80px] text-sm"
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 text-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-sm hover:from-orange-600 hover:to-orange-700"
          >
            {actionLabel}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
