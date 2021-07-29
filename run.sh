#!/usr/bin/env bash


# shopt -ETo pipefail
shopt -s globstar

# (
# 	( cd frontend && IS_NGROK= yarn run serve ) &
# 	( cd backend && go run . server ) &
# 	ngrok http --bind-tls true localhost:8080 &
# )

# build
(
	cd frontend
	yarn build
)

cp -r frontend/dist/. backend/public/

# COMMAND
# ngrok http 0.0.0.0:3000 --host-header='rewrite' --bind-tls true
