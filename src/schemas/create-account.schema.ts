import z from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "E-mail é obrigatório").email(),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type CreateAccountSchema = Required<z.infer<typeof createAccountSchema>>;
