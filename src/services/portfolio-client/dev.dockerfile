FROM node:12.18.1

# docker-compose shares src/client directory under /usr/src/app
WORKDIR /src/app

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]