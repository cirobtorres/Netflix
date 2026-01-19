import { SignupHeader } from "../../components/Header";
import { SignupForm, CreatePasswordForm } from "../../components/Forms";
import { cookies } from "next/headers";
import { getUser } from "../../services/user";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const cookie = await cookies();
  const token = cookie.get("token");

  if (!token) {
    return (
      <main className="overflow-y-auto min-h-screen flex flex-col justify-center items-center">
        <SignupHeader />
        <SignupForm />
      </main>
    );
  }

  const userResponse = await getUser(token.value);

  if (!userResponse.ok) {
    // 403
    // Invalid token
    redirect("/api/logout");
  }

  const userData = userResponse.data;

  /*
   * userResponse:
   *   {
   *     ok: boolean,
   *     statusCode: number,
   *     statusMessage: string,
   *     data: {
   *       id: string,
   *       email: string,
   *       email_confirmation: boolean,
   *       createdAt: string,
   *       updatedAt: string
   *     }
   *   }
   */

  if (userData.has_password) {
    return (
      <main className="overflow-y-auto min-h-screen flex flex-col justify-center items-center">
        <SignupHeader />
        <SignupForm />
      </main>
    );
  }

  return (
    <main className="overflow-y-auto min-h-screen flex flex-col justify-center items-center">
      <SignupHeader />
      <CreatePasswordForm token={token} user={userData} />
    </main>
  );
}
