FROM golang

WORKDIR /src/email-gateway/

RUN go get github.com/canthefason/go-watcher
RUN go install github.com/canthefason/go-watcher/cmd/watcher

RUN go get ./...

CMD ["bash", "/src/email-gateway/entrypoint.sh"]