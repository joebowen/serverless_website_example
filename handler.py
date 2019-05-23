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
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": message['Item']['message']['S']
    }

    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True,
        },
        "body": json.dumps(body)
    }

    return response

    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """
