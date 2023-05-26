#!/bin/sh

set -o errexit
set -o nounset

rm -f './celerybeat.pid'
cd src
celery -A ddh  beat -l INFO