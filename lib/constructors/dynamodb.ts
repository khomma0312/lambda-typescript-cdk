import { AttributeType, Billing, TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export interface DynamoDBProps {
  readonly tableName: string;
  readonly granteeLambda: NodejsFunction;
}

export class DynamoDB extends Construct {
  constructor(scope: Construct, id: string, props: DynamoDBProps) {
    super(scope, id);

    const table = new TableV2(this, `${id}Table`, {
      billing: Billing.onDemand(),
      tableName: props.tableName,
      partitionKey: {
        name: "Id",
        type: AttributeType.STRING,
      },
    });
    table.grantReadWriteData(props.granteeLambda);
  }
}
