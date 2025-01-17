import AuthBtns from "@/components/auth-btns";
import Logo from "@/components/logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav>
        <div className="p-4 flex justify-between items-center">
          <Logo />
          <AuthBtns />
        </div>
      </nav>
      <main>
        <section className="py-8 px-2 min-h-screen grid place-items-center">
          {children}
        </section>
      </main>
    </>
  );
}
