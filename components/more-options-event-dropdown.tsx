import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, EllipsisVerticalIcon, Files, Settings } from "lucide-react";

export default function MoreOptionEventDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className=" w-52 p-3 z-10">
        <DropdownMenuItem className="flex space-x-3">
          <Settings size={20} />
          <p>Settings</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex space-x-3">
          <Files size={20} />
          <p>Duplicate</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex space-x-3">
          <Archive size={20} />
          <p>Archive</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
