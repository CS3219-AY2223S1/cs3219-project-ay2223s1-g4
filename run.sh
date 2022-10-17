#!/usr/bin/env bash

start() {
    docker-compose up
}

stop() {
    docker-compose down
}

main() {
    if [ $# -eq 0 ]; then
        set -x
        stop
        start
        exit 
    elif [ $1 == "d" ]; then
        set -x
        stop
        exit 
    fi
}

main $@
