#!/usr/bin/env bash

PATH_LIST=(
    "backend/pubsub-service"
    "backend/collab-service"
    "backend/matching-service"
    "backend/room-service"
    "backend/question-service"
    "backend/user-service"
)
ROOT_PATH=$(pwd)

build() {
    for service in "${PATH_LIST[@]}"; do
        cd $service
        $(which npm) ci
        cd $ROOT_PATH
    done
}

run() {
    for service in "${PATH_LIST[@]}"; do
        cd $service
        $(which npm) run dev &
        cd $ROOT_PATH
    done
}

stop() {
    to_kill=$(pgrep -f nodemon)
    for service in $to_kill; do
        kill -9 $service
    done

    to_kill=$(pgrep -f node)
    for service in $to_kill; do
        kill -9 $service
    done
}

main() {
    if [ $# -eq 0 ]; then
        echo "Invalid usage"
        echo "Usage: $./run-backend.sh <op>"
        echo "op: d - delete/kill"
        echo "    s - start"
        echo "    r - rebuild and start"
        exit

    elif [ $1 == "d" ]; then
        set -x
        stop
        exit 

    elif [ $1 == "s" ]; then
        set -x
        stop
        run
        trap stop INT
        sleep infinity
        exit 

    elif [ $1 == "r" ]; then
        set -x
        stop
        build
        start
        trap stop INT
        sleep infinity
        exit 
    fi
}

main $@
