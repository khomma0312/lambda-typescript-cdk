import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Lambda } from "./constructors/lambda";
import { DynamoDB } from "./constructors/dynamodb";

export class LambdaTypescriptCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new Lambda(this, "LambdaTypescriptCdk", {
      functionName: "LambdaTypescriptCdk",
      logRetentionDays: RetentionDays.ONE_MONTH,
    });

    new DynamoDB(this, "DynamoDB", {
      tableName: "LambdaTypescriptCdkTable",
      granteeLambda: lambda.fn,
    });
  }
}
