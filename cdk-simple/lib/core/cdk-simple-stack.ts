import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { WebApp } from './webapp';
import { AssetStorage } from './storage';
import { AppDatabase } from './database';
import { AppServices } from './services';
import { ApplicationAPI } from './api';
import { ApplicationEvents } from './events';
// import { ApplicationAuth } from './auth';
// import { ApplicationMonitoring } from './monitoring';
import { DocumentProcessing } from './processing';

export class CdkSimpleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const storage = new AssetStorage(this, 'Storage');
    
    const database = new AppDatabase(this, 'Database');

    const services = new AppServices(this, 'Services', {
      documentsTable: database.documentsTable,
      uploadBucket: storage.uploadBucket,
      assetBucket: storage.assetBucket,
      // userPool: auth.userPool,
    });

    const processing = new DocumentProcessing(this, 'Processing', {
      uploadBucket: storage.uploadBucket,
      assetBucket: storage.assetBucket,
      documentsTable: database.documentsTable,
    });

    new ApplicationEvents(this, 'Events', {
      uploadBucket: storage.uploadBucket,
      processingStateMachine: processing.processingStateMachine,
      notificationsService: services.notificationsService,
    });

    const api = new ApplicationAPI(this, 'API', {
      commentsService: services.commentsService,
      documentsService: services.documentsService,
      // usersService: services.usersService,
      // userPool: auth.userPool,
      // userPoolClient: auth.userPoolClient,
    });
    
    const webapp = new WebApp(this, 'WebApp', {
      hostingBucket: storage.hostingBucket,
      baseDirectory: '../',
      relativeWebAppPath: 'webapp',
      httpApi: api.httpApi,
      // userPool: auth.userPool,
      // userPoolClient: auth.userPoolClient,
    });
    // webapp.node.addDependency(auth);

  }
}
