#!/usr/bin/env bash

## must be in order of dependencies
PATH_LIST=(
    "backend/pubsub-service"
    "backend/collab-service"
    "backend/matching-service"
    "backend/room-service"
    "backend/user-service"
)
ROOT_PATH=$(pwd)

build() {
    for service in "${PATH_LIST[@]}"; do
        cd $service
        ./run.sh b
        cd $ROOT_PATH
    done
}

run() {
    for service in "${PATH_LIST[@]}"; do
        cd $service
        ./run.sh r &
        cd $ROOT_PATH
    done
}

stop() {
    for service in "${PATH_LIST[@]}"; do
        to_kill=$(pgrep -f ${service})
        for task_id in $to_kill; do
            kill -9 $task_id
        done
    done
    if [ $# -eq 0 ]; then
        exit
    fi
}

sleep_inf() {
    trap stop INT
    while :; do
        sleep 2073600; ## 24 days
    done
}

main() {
    if [ $# -eq 0 ]; then
        set -x
        stop 0
        build
        run
        sleep_inf
        exit 

    elif [ $1 == "b" ]; then
        set -x
        build
        exit 

    elif [ $1 == "r" ]; then
        set -x
        run
        sleep_inf
        exit 

    elif [ $1 == "k" ]; then
        set -x
        stop
        exit 
    fi
}

main $@
