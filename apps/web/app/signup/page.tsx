import { SignupHeader } from "../../components/Header";
import { Form1, Form2, Form3, Form4 } from "../../components/Forms";

export default function SignupPage() {
  return (
    <main className="overflow-y-auto min-h-screen flex flex-col justify-center items-center">
      <SignupHeader />
      <Form1 />
    </main>
  );
}
