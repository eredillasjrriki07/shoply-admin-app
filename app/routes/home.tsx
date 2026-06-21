import { useAuth } from "~/hooks/useAuth";
import type { Route } from "./+types/home";
import { Navigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <div className="grid h-screen place-items-center">Loading…</div>;

  return <Navigate to={user ? '/admin' : '/auth/login'} />;
}
