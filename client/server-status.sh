#!/bin/bash

headers="Content-Type: application/json"

url="https://status-server-service.herokuapp.com?expired=N"
body="{\"server_code\": \"C1\"}"

wait=300

while true
do
    curl --location --request POST "$url" --header "$headers" --data-raw "$body"

    sleep $wait
done
