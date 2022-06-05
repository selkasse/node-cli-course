import enquirer from "enquirer";
import { to } from "await-to-js";
import handleError from "cli-handle-error";
import shouldCancel from "cli-should-cancel";

const { Input } = enquirer;

export default async ({ name, message, hint, initial }) => {
  const [err, response] = await to(
    new Input({
      name,
      message,
      hint,
      initial,
      validate(value, state) {
        //* Since the 'command' field is optional, do not require a value
        //* Note that at the time of this writing (06-04-2022),
        //? A duplicate entry will be created in the output package.json
        //? This is because `npm dedupe`
        if (state && state.name === `command`) return true;

        return !value ? `Please add a value` : true;
      },
    })
      .on(`cancel`, () => shouldCancel())
      .run()
  );

  handleError(`INPUT`, err);

  return response;
};
