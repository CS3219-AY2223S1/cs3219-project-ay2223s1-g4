#!/usr/bin/env bash

build() {
    $(which npm) ci
}

run() {
    $(which npm) run dev
}

verify() {
    set -e
    $(which npm) run "test"
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

    elif [ $1 == "t" ]; then
        set -x
        verify
        exit 
    fi
}

main $@
