#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaTypescriptCdkStack } from '../lib/lambda-typescript-cdk-stack';

const app = new cdk.App();
new LambdaTypescriptCdkStack(app, 'LambdaTypescriptCdkStack');
