import { StatusMessage } from "utils/enums/StatusMessage";

export function returnMessage({
  ok = true,
  statusCode = 200,
  statusMessage = StatusMessage.OK,
  data,
}: {
  ok?: boolean;
  statusCode?: number;
  statusMessage?: StatusMessage;
  data: any;
}) {
  return {
    ok,
    statusCode,
    statusMessage,
    data,
  };
}
