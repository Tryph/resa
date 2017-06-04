#!/usr/bin/env bash


SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT=${SCRIPT_PATH}/..


# Building Javascript processer image
#docker build --rm -t js_process -f Dockerfile_js_process ${PROJECT_ROOT}
docker build --rm -t js_process -f ${PROJECT_ROOT}/ci/js_process/Dockerfile ${PROJECT_ROOT}

# Installing Javascript dependencies
docker run --rm --name js_process -v ${PROJECT_ROOT}/front:/front js_process npm install

# Processing front sources
docker run --rm --name js_process -v ${PROJECT_ROOT}/front:/front js_process gulp prod

# Building Python processer image
docker build --rm -t py_process -f py_process/Dockerfile ${PROJECT_ROOT}

# Performing Python process
docker run --rm -d --name py_process -v ${PROJECT_ROOT}:/project py_process python back/manage.py collectstatic
