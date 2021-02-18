FROM golang:alpine AS base

WORKDIR /src/email-gateway/

FROM base AS dev

RUN go get github.com/canthefason/go-watcher
RUN go install github.com/canthefason/go-watcher/cmd/watcher

CMD ["bash", "/src/email-gateway/entrypoint.sh"]

FROM base AS prod

COPY ./go.mod .
COPY ./go.sum .

RUN go mod download

COPY . .
RUN go build -o main .

CMD ["/src/email-gateway/main"]
