#!/usr/bin/env bash

start() {
    docker-compose up --force-recreate --renew-anon-volumes
}

stop() {
    docker-compose down
    docker image prune -a -f
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
