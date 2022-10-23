#!/usr/bin/env bash

build() {
    poetry run python3 app/soupScrape.py
}

run() {
    poetry run python3 main.py
}

verify() {
    set -e
    echo "No tests specified"
    ## TODO ADD TEST AND SCRIPT
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
