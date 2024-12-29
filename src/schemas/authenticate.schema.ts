import z from "zod";

export const authenticateSchema = z.object({
  email: z.string().min(1, "E-mail é obrigatório").email(),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type AuthenticateSchema = z.infer<typeof authenticateSchema>;
