import { RegistrationForm } from "../../../components/Forms";
import { SignupHeader } from "../../../components/Header";

export default async function RegistrationPage() {
  return (
    <main className="overflow-y-auto min-h-screen flex flex-col justify-center items-center">
      <SignupHeader />
      <RegistrationForm />
    </main>
  );
}
