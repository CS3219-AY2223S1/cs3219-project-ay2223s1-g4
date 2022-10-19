#!/usr/bin/env bash

ROOT_PATH=$(pwd)

build() {
    cd "frontend"
    npm ci
    cd $ROOT_PATH
}

start() {
    cd "frontend"
    npm start
    cd $ROOT_PATH
}

main() {
    if [ $# -eq 0 ]; then
        echo "Invalid usage"
        echo "Usage: $./run-frontend.sh <op>"
        echo "op: s - start"
        echo "    r - rebuild and start"
        exit

    elif [ $1 == "s" ]; then
        set -x
        start
        exit 

    elif [ $1 == "r" ]; then
        set -x
        build
        start
        exit 
    fi
}

main $@
