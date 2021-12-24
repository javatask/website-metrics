#!/bin/bash

rm -rf sec
mkdir -p sec

while read p; do
  echo "$p"
  domain=$(echo "$p" | awk -F[/:] '{print $4}')
  echo "$domain"

  httpobs-local-scan $domain >"./sec/$domain.json"
done <$1
