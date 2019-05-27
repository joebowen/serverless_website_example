#!/usr/bin/env bash

STAGE='prod'
REGION='us-west-2'

pip install -r requirements.txt

AWS_DEFAULT_REGION=${REGION} serverless deploy -v --stage ${STAGE}

SERVICE_ENDPOINT=$( cat client/stack_output.json | jq '.ServiceEndpoint' )

echo "REACT_APP_SERVICE_ENDPOINT=${SERVICE_ENDPOINT}" > client/.env

( cd client && npm run build )

AWS_DEFAULT_REGION=${REGION} serverless client deploy --no-confirm --stage ${STAGE}

AWS_DEFAULT_REGION=${REGION} aws dynamodb update-item --table-name Messages-${STAGE} --key '{"message_id":{"S":"0"}}' --update-expression 'SET #m = :m' --expression-attribute-names '{"#m":"message"}' --expression-attribute-values '{":m":{"S":"Random number -> '${RANDOM}'"}}'
