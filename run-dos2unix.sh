#!/usr/bin/env bash

## FOR WINDOWS ONLY
## to deal with CRLF ending issue on WSL
## sudo apt install dos2unix

main() {
    scripts=$(find . -name "run*.sh" -not -path "*/node_modules/*")
    for script in "${scripts[@]}"; do
        dos2unix $script
    done
}

main
