#!/usr/bin/env bash

STAGE='prod'

pip install -r requirements.txt

serverless deploy -v --stage ${STAGE}

SERVICE_ENDPOINT=$( cat client/stack_output.json | jq '.ServiceEndpoint' )

echo "REACT_APP_SERVICE_ENDPOINT=${SERVICE_ENDPOINT}" > client/.env

( cd client && npm run build )

serverless client deploy --no-confirm --stage ${STAGE}

aws dynamodb update-item --table-name Messages-${STAGE} --key '{"message_id":{"S":"0"}}' --update-expression 'SET message = :message' --expression-attribute-values '{"message":{"S":"Test Dynamodb Message"}'
