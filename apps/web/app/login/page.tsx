import { cookies } from "next/headers";
import { getUser } from "../../services/user";
import { LoginForm } from "../../components/Forms";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const { error } = await searchParams;

  const token = (await cookies()).get("token");

  if (token) {
    const user = await getUser(token.value);

    if (user.ok) {
      const email = user.data.email;

      return <LoginForm initialData={{ email }} />;
    }

    if (user.statusCode === 403) {
      return <LoginForm error={{ invalidToken: true }} />;
    }
  }

  return <LoginForm error={{ invalidToken: error === "invalid_token" }} />;
}
