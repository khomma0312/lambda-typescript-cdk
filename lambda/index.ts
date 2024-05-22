import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

type EventToSave = {
  Id: string;
  Title: string;
  Description: string;
};

const clientConfig = {
  region: "ap-northeast-1",
};

export const handler = async (event: EventToSave) => {
  if (event === undefined) return;

  await putItemsToDynamoDB(event);
};

const putItemsToDynamoDB = async (event: EventToSave) => {
  const client = new DynamoDBClient(clientConfig);

  const input = {
    TableName: "LambdaTypescriptCdkTable",
    Item: marshall(event, { removeUndefinedValues: true }),
  };

  const command = new PutItemCommand(input);
  await client.send(command);
};
