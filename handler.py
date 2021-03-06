# Required for the serverless-python-requirements plugin
try:
    import unzip_requirements
except ImportError:
    pass

import json
import os
import boto3

from botocore.config import Config as botoConfig


def hello(event, context):
    # This should handle rate limit issues with exponential back-off
    # https://github.com/boto/boto3/issues/770
    boto_config = botoConfig(
        retries=dict(
            max_attempts=50
        )
    )

    dynamodb_client = boto3.client('dynamodb', config=boto_config)

    message = dynamodb_client.get_item(
        TableName=os.environ['MESSAGES_TABLE'],
        Key={
            'message_id': {'S': '0'}
        }
    )

    body = {
        'messages': [
            'Your lambda function executed successfully!',
            'Here is the first element of the Messages DynamoDB table',
            message['Item']['message']['S']
        ]
    }

    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        'body': json.dumps(body)
    }

    return response
