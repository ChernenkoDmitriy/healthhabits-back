npm i --legacy-peer-deps

# Run PM2 #

pm2 start dist/main.js --name healthhabits-back

# Local IP mac#

ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}'

# Generate #

npx nest generate <schematic> <name> [options] 

npx nest g resource <name> [options] 

htop

## Remove BD container ##

sudo docker rm $(sudo docker ps -a -q)

sudo docker run --name postgresql -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=NltDev2022 -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres:alpine