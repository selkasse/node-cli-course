import enquirer from "enquirer";
import { to } from "await-to-js";
import handleError from "cli-handle-error";

const { Input } = enquirer;

export default async ({ message, hint, initial }) => {
  const [err, response] = await to(
    new Input({
      message,
      hint,
      initial,
    }).run()
  );

  handleError(`INPUT`, err);

  return response;
};
