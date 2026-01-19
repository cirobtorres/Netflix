import { cookies } from "next/headers";
import { CreditCardForm } from "../../../../components/Forms";

export default async function CreditCardPaymentPage() {
  const plan = (await cookies()).get("plan") as
    | { name: string; value: string }
    | undefined;
  return (
    <main className="overflow-y-auto min-h-screen flex flex-col justify-center items-center">
      <CreditCardForm plan={plan} />
    </main>
  );
}
