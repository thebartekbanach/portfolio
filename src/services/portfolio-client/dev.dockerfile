FROM node:12.18.1

# docker-compose shares src/portfolio-client directory under /src/portfolio-client
WORKDIR /src/portfolio-client

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]