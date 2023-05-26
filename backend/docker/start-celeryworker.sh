#!/bin/sh

set -o errexit
set -o nounset

cd src
celery -A ddh worker -l INFO