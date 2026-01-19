import { cookies } from "next/headers";
import { PixForm } from "../../../../components/Forms";
import { getUser } from "../../../../services/user";
import { redirect } from "next/navigation";

export default async function PixPaymentPage() {
  const cookie = await cookies();
  const token = cookie.get("token");
  const plan = cookie.get("plan") as
    | { name: string; value: string }
    | undefined;

  const userResponse = token?.value ? await getUser(token.value) : null;

  if (!userResponse.ok) {
    // 403
    // Invalid token
    redirect("/api/logout");
  }

  const userData = userResponse.data;
  return (
    <main className="overflow-y-auto min-h-screen flex flex-col justify-center items-center">
      <PixForm plan={plan} user={userData} />
    </main>
  );
}
