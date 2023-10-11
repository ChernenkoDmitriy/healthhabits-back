npm i --legacy-peer-deps

# Local IP mac#

ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}'

# Generate #

npx nest generate <schematic> <name> [options] 

npx nest g resource <name> [options] 

htop