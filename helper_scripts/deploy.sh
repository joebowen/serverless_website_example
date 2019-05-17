#!/usr/bin/env bash

pip install -r requirements.txt

serverless deploy -v

SERVICE_ENDPOINT=$( cat client/stack_output.json | jq '.ServiceEndpoint' )

echo "REACT_APP_SERVICE_ENDPOINT=${SERVICE_ENDPOINT}" > client/.env

( cd client && npm run build )

serverless client deploy --no-confirm
