import { Construct } from "constructs";
import { Code, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { NODE_LAMBDA_LAYER_DIR, bundleNpm } from "../process/setup";
import { removeBundleDir } from "../process/cleanup";
import { Duration } from "aws-cdk-lib";

export interface LambdaProps {
  readonly functionName: string;
  readonly logRetentionDays: RetentionDays;
}

export class Lambda extends Construct {
  readonly fn: NodejsFunction;

  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id);

    bundleNpm();

    const modulesLayer = new LayerVersion(this, `${id}ModulesLayer`, {
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      code: Code.fromAsset(NODE_LAMBDA_LAYER_DIR),
      description: "node_modules layer",
    });

    this.fn = new NodejsFunction(this, `${id}NodejsFunction`, {
      functionName: props.functionName,
      entry: "lambda/index.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_18_X,
      memorySize: 1024,
      timeout: Duration.seconds(15),
      layers: [modulesLayer],
      bundling: {
        // layerに含まれるライブラリはbundleから省く
        externalModules: ["*"],
      },
      logRetention: props.logRetentionDays,
    });

    removeBundleDir();
  }
}
