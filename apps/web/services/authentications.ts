// "use server";

export const signUp = async (
  prevFormData: { state: string | null },
  formData: FormData
) => {
  const email = formData.get("sign-up-email-input");

  return { state: null };
};
