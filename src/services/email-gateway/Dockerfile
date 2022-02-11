FROM golang AS dev

WORKDIR /src/email-gateway/

RUN go get github.com/canthefason/go-watcher/cmd/watcher

CMD ["bash", "/src/email-gateway/entrypoint.sh"]

FROM golang:alpine AS prod

WORKDIR /src/email-gateway/

COPY ./go.mod .
COPY ./go.sum .

RUN go mod download

COPY . .
RUN go build -o main .

CMD ["/src/email-gateway/main"]
