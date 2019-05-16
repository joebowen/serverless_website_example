#!/usr/bin/env bash

serverless deploy -v

( cd client && npm run build )

serverless client deploy --no-confirm
