import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

type dropItemsSchema = Array<{ name: string; url: string }>;

function ProfileDropDown({
  children,
  dropItems,
}: {
  children: React.ReactNode;
  dropItems: dropItemsSchema;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropItems.map((item, index) => (
          <ProfileDropDownItem key={index} url={item.url}>
            {item.name}
          </ProfileDropDownItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProfileDropDownItem({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) {
  const router = useRouter();
  return (
    <DropdownMenuItem onClick={() => router.push(url)}>
      {children}
    </DropdownMenuItem>
  );
}
export default ProfileDropDown;
