// (protected)/layout.tsx
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="h-full bg-slate-100">
      <main className="pt-40 pb-20 bg-slate-100">{children}</main>
    </div>
  );
}
