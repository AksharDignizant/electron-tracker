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

export default function ModalOverlay({
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
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-3">
      <Card className="w-full max-w-md shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <label className="text-xs font-medium">Reason</label>
            <Input className="text-sm mt-1" placeholder="Enter reason" />
          </div>

          <div>
            <label className="text-xs font-medium">Additional Notes</label>
            <Textarea
              className="min-h-[80px] text-sm mt-1"
              placeholder="Type notes..."
            />
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button onClick={onClose} variant="outline" className="w-1/2 text-sm">
            Cancel
          </Button>
          <Button onClick={onSubmit} className="w-1/2 text-sm">
            {actionLabel}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
