#!/usr/bin/env bash

BACKEND_SERVICES=(
    "backend/pubsub-service"
    "backend/collab-service"
    "backend/matching-service"
    "backend/room-service"
    "backend/user-service"
    "backend/question-service"
)
ROOT_PATH=$(pwd)

test_frontend() {
    cd 'frontend'
    $(which npm) ci
    $(which npm) run "test"
    cd $ROOT_PATH
}

main() {
    set -e
    set -x
    for service in "${BACKEND_SERVICES[@]}"; do
        cd $service
        ./run.sh t
        cd $ROOT_PATH
    done
    test_frontend
}

main
