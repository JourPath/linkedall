import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function JoinListNew() {
  return (
    <div className="flex items-center space-x-2 rounded-md m-4 ">
      <Input type="text" placeholder="List Code" />
      <Button type="submit">Join List</Button>
    </div>
  );
}
