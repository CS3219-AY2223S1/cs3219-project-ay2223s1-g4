#!/usr/bin/env bash

ROOT_PATH=$(pwd)

build() {
    cd frontend
    npm ci
    cd $ROOT_PATH
}

run() {
    cd frontend
    npm start
    cd $ROOT_PATH
}

main() {
    if [ $# -eq 0 ]; then
        set -x
        build
        run
        exit 

    elif [ $1 == "b" ]; then
        set -x
        build
        exit 

    elif [ $1 == "r" ]; then
        set -x
        run
        exit 
    fi
}

main $@
