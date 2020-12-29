FROM golang

WORKDIR /src/app/

RUN go get github.com/canthefason/go-watcher
RUN go install github.com/canthefason/go-watcher/cmd/watcher

RUN go get ./...

CMD ["bash", "/src/app/entrypoint.sh"]