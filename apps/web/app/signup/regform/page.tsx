import {
  CreateEmailPasswordForm,
  RegistrationForm,
} from "../../../components/Forms";
import { SignupHeader } from "../../../components/Header";

export default async function RegformPage() {
  return (
    <main className="overflow-y-auto min-h-screen flex flex-col justify-center items-center">
      <SignupHeader />
      <CreateEmailPasswordForm />
      {/* <RegistrationForm /> */}
    </main>
  );
}
