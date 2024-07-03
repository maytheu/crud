import { z } from "zod";

const LoginDTO = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict();

const NameDTO = z
  .object({
    name: z.string(),
  })
  .strict();

const RegisterDTO = LoginDTO.merge(NameDTO);

type IUser = z.infer<typeof RegisterDTO>;
type ILogin = z.infer<typeof LoginDTO>;

export { LoginDTO, RegisterDTO, ILogin, IUser };
