import { z } from "zod";

const NewTaskDTO = z
  .object({
    name: z.string(),
  })
  .strict();

const StatusEnum = z
  .enum(["Created", "Pending", "In Progress", "Completed"])
  .optional();

const UpdateTaskDTO = z.object({
  name: z.string().optional(),
  status: StatusEnum.optional(),
});

const user = z.object({ user: z.string(), deleted: z.boolean() });

const ITask = UpdateTaskDTO.merge(user);

type ITask = z.infer<typeof ITask>;

export { ITask, NewTaskDTO, StatusEnum, UpdateTaskDTO };
