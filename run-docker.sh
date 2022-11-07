#!/usr/bin/env bash

start() {
    docker-compose up -d --force-recreate --renew-anon-volumes
}

status() {
    docker-compose logs -f -t
}

destroy() {
    docker-compose down --rmi local
    docker image prune -a -f
}

stop() {
    docker-compose down
}

usage() {
    echo "Usage: ./run-docker.sh <arg>"
    echo "  default: runs docker compose with existing images"
    echo "  arg options:"
    echo "    ?/help   help"
    echo "    status   checks on docker compose logs" 
    echo "    stop     stops running docker compose"
    echo "    reset    clears all previous images and reruns new docker compose instance"
    echo "    destroy  destroys all docker compose images"
}

main() {
    if [ $# -eq 0 ]; then
        set -x
        stop
        start
        exit 
    elif [ $1 == "?" ]; then
        usage
        exit 
    elif [ $1 == "help" ]; then
        usage
        exit 
    elif [ $1 == "status" ]; then
        status
        exit 
    elif [ $1 == "stop" ]; then
        set -x
        stop
        exit 
    elif [ $1 == "reset" ]; then
        set -x
        destroy
        start
        exit 
    elif [ $1 == "destroy" ]; then
        set -x
        destroy
        exit 
    fi
}

main $@
