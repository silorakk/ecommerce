import { useSession } from "next-auth/react";
import Link from "next/link";
export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <div>Home page</div>
      {JSON.stringify(session)}
      <div className="flex space-x-4 mt-4">
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </main>
  );
}
