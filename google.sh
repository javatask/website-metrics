#!/bin/bash
rm -rf perf
mkdir -p perf

while read p; do
  echo "$p"
  domain=$(echo "$p" | awk -F[/:] '{print $4}')
  echo "$domain"

  lighthouse --output json --output-path "./perf/$domain.json" $p
done <$1
