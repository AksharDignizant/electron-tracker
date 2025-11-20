"use client";

import ActivityItem from "@/app/tray/component/activity-item";
import ModalOverlay from "@/app/tray/component/modal-overlay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ModalType = "late" | "early" | "manual" | null;

export default function BreakDayzTray() {
  const [modal, setModal] = useState<ModalType>(null);
  const [isClockedIn, setIsClockedIn] = useState(false);

  const handleClock = () => {
    setModal(isClockedIn ? "early" : "late");
  };

  const submitModal = () => {
    setIsClockedIn((prev) => !prev);
    setModal(null);
  };

  return (
    <>
      <Card className="overflow-hidden p-0 min-h-screen gap-0">
        <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="BreakDayz Logo"
              className="object-contain"
              width={18}
              height={18}
            />
            <div>
              <h1 className="text-sm font-bold text-slate-900">BreakDayz.</h1>
            </div>
          </div>
        </div>

        <CardContent className="space-y-4 py-4">
          <div
            className={"relative w-full rounded-2xl border overflow-hidden"}
            style={{
              height: 95,
              background: `url('/tray-bg.jpg') no-repeat center center`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0"
              style={{
                width: "49%",
                backgroundImage: `url('/clock-overlay.png')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
                backgroundSize: "contain",
              }}
            />

            <div className="relative flex items-center gap-3 p-4 h-full">
              <Avatar className="size-12">
                <AvatarImage src="/avatar-placeholder.svg" alt="user avatar" />
                <AvatarFallback className="text-lg w-[50px] h-[50px]">
                  PM
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <h1 className="text-lg font-semibold leading-tight text-neutral-1000 truncate">
                  Paul Mora
                </h1>
                <p className="mt-1 text-sm text-neutral-900 truncate">
                  Sr. UI/UX Designer
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around p-3 bg-white border border-gray-200 rounded-xl">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-success-1000 mb-1">
                Current Time
              </span>
              <span className="text-sm font-medium text-neutral-1000">
                08:32:44
              </span>
            </div>

            <div className="w-px h-9 bg-gray-200" />

            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-primary-1000 mb-1">
                Break Time
              </span>
              <span className="text-sm font-medium text-neutral-1000">
                01:15:50
              </span>
            </div>
          </div>

          <Button
            onClick={handleClock}
            className="w-full font-semibold bg-success-1000 hover:bg-success-700 border-success-1000 text-white hover:border-success-700"
          >
            {isClockedIn ? "Clock Out" : "Clock In"}
            <Clock className="size-5 mr-2" />
          </Button>

          <div className="border-t border-dashed border-neutral-200 pt-4 space-y-3">
            <p className="text-xs font-medium text-neutral-800">
              Today Activity
            </p>

            <ActivityItem
              label="Clock In - Clock Out"
              time="09:05 AM - 01:05 PM"
              total="04:00:00"
              color="blue"
            />

            <ActivityItem
              label="Break In - Break Out"
              time="01:05 PM - 02:04 PM"
              total="00:59:50"
              color="yellow"
            />

            <ActivityItem
              label="Clock In - Clock Out"
              time="02:04 PM -"
              total="—"
              color="blue"
            />
          </div>
        </CardContent>
      </Card>

      {modal && (
        <ModalOverlay
          title={
            modal === "late"
              ? "Reason for Late Arrival"
              : modal === "early"
                ? "Early Clock-Out Reason"
                : "Add Attendance & Leave"
          }
          description={
            modal === "late"
              ? "Share a note for the supervisor before clocking in."
              : modal === "early"
                ? "Your hours are less than expected. Please record a reason."
                : "Record manual entry if biometric data is missing."
          }
          actionLabel={
            modal === "manual" ? "Save" : isClockedIn ? "Clock Out" : "Clock In"
          }
          onClose={() => setModal(null)}
          onSubmit={submitModal}
        />
      )}
    </>
  );
}
