import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NotificationButton() {
  return (
    <Button variant="outline" className="rounded-full shrink-0" size="icon">
      <Bell className="h-4 w-4" />
    </Button>
  );
}
