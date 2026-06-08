import { Suspense } from "react";
import { getSession } from "../../lib/supabase/get-session";
import { NavbarClient } from "./NavbarClient";

async function NavbarWithSession() {
  const session = await getSession();
  return <NavbarClient initialUser={session?.user ?? null} />;
}

export function Navbar() {
  return (
    <Suspense fallback={<NavbarClient initialUser={null} />}>
      <NavbarWithSession />
    </Suspense>
  );
}
