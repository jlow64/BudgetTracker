import { Navbar } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar>
        Koto Shibata
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>KS</AvatarFallback>
        </Avatar>
      </Navbar>
      <main>{children}</main>
    </>
  );
}
