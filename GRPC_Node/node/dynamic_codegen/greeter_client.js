/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/../../protos/helloworld.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
const Sentry = require('@sentry/node');
const { IncomingWebhook } = require('@slack/webhook');
const projectName = 'GRPC_NODE';
Sentry.init({
  dsn: 'https://8575741e6740481e9284ee0f20ceb3f9@o4505486496628736.ingest.sentry.io/4505486705557504',
 
});

process.on('unhandledRejection', error => {
  Sentry.captureException(error);
  throw error;
});

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }
  var client = new hello_proto.Greeter(target,
                                       grpc.credentials.createInsecure());
  var user;
  if (argv._.length > 0) {
    user = argv._[0]; 
  } else {
    user = 'Shlok';
  }

  Sentry.withScope(scope => {
    // Add additional context or tags if needed
    scope.setTag('key', 'value');
    scope.setUser({ id: 'user-id', email: 'user@example.com' });
  
    try {
      
      // Your code here
      // var client = new hello_proto.Greeter(target, grpc.credentials.createInsecure());
      // console.log("hiii");
      client.sayHello({name: user}, function(err, response) {
        console.log('Greeting:', response.message);
      });
      client.sayHelloAgain({name: 'Shlok'}, function(err, response) {
        console.log('Greeting:', response.message);
      });
      throw new Error('Intentional first crash');
      // ...
    } catch (error) {
      scope.setExtra('Project Name', projectName);

      const slackMessage = {
        text: 'Custom message from Sentry to Slack',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `Project Name:* ${projectName}`
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Error Details:* ${error.message}`
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*File Name:* ${__filename}`
            }
          }
          // Add more sections or customize the message structure as needed
        ]
      };

      // const webhook = new IncomingWebhook('auditor-uzb7506.slack.com');
      const webhook = new IncomingWebhook('https://hooks.slack.com/services/auditor-uzb7506.slack.com');

      // webhook.send(slackMessage);
      webhook.send(slackMessage)
      .then(() => console.log('Slack message sent successfully'))
      .catch(error => console.error('Error sending Slack message:', error));

      Sentry.captureException(error);
    }
  });

  // Customize the Slack message format
// const slackMessage = `*Project Name:* ${projectName}\n*Error Details:* Intentional crash`;


// Send the slackMessage to Slack using your preferred Slack integration method
// For example, using the `@slack/webhook` package:



}

main();
