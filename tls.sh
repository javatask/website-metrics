#!/bin/bash

rm -rf tls
mkdir -p tls

while read p; do
  echo "$p"
  domain=$(echo "$p" | awk -F[/:] '{print $4}')
  echo "$domain"

  ./bin/testssl.sh/testssl.sh -oJ ./tls/ $domain
done <$1
