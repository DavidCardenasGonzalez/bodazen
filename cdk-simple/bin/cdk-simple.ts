#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkSimpleStack } from '../lib/core/cdk-simple-stack';

const app = new cdk.App();
new CdkSimpleStack(app, 'CdkSimpleStack');
