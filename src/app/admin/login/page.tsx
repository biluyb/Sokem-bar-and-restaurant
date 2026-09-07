import { redirect } from "next/navigation";

/**
 * Legacy /admin/login route — permanently redirects to /sign-in.
 * The middleware also handles this, but this server component provides
 * a fallback in case the middleware matcher misses edge cases.
 */
export default function AdminLoginRedirectPage() {
  redirect("/sign-in");
}
