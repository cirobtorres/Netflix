import { StatusMessage } from "utils/enums/StatusMessage";

export function returnMessage({
  ok = true,
  statusCode,
  statusMessage,
  message,
}: {
  ok?: boolean;
  statusCode: number;
  statusMessage: StatusMessage;
  message: any;
}) {
  return {
    ok,
    statusCode,
    statusMessage,
    message,
  };
}
