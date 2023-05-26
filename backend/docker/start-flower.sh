#!/bin/sh

set -o errexit
set -o nounset

worker_ready() {
    cd src
    celery -A ddh inspect ping
}

until worker_ready; do
  >&2 echo 'Celery workers not available'
  sleep 1
done
>&2 echo 'Celery workers is available'


celery -A ddh  \
    --broker="${CELERY_BROKER}" \
    flower