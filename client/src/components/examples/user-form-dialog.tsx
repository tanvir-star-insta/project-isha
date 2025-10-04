import { useState } from "react";
import { UserFormDialog } from "../user-form-dialog";
import { Button } from "@/components/ui/button";

const mockManagers = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "David Smith" },
];

export default function UserFormDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Create User</Button>
      <UserFormDialog
        open={open}
        onOpenChange={setOpen}
        managers={mockManagers}
        onSubmit={(data) => console.log("User created:", data)}
      />
    </div>
  );
}
