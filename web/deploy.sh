#!/bin/bash

rm -r dist
npm run build:prod

SSHSOCKET=/tmp/deploy.sock
HOST=admin@podlomar.org

ssh -o ControlPath=$SSHSOCKET -M -f -N  $HOST || exit 1
ssh -o ControlPath=$SSHSOCKET $HOST "docker stop novekodim"
scp -o ControlPath=$SSHSOCKET -r dist/* $HOST:/www/nove.kodim.cz/app
ssh -t -o ControlPath=$SSHSOCKET $HOST "docker start novekodim"

ssh -S $SSHSOCKET -O exit $HOST