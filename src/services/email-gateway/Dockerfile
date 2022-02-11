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

# Self-contained version of image for non-relative compose volume paths environments
FROM golang:alpine as prod-managed

# Build email-gateway
WORKDIR /src/email-gateway

COPY ./email-gateway/go.mod .
COPY ./email-gateway/go.sum .

RUN go mod download

COPY ./email-gateway .
RUN go build -o main .

# Copy portfolio-client into /src/portfolio-client
WORKDIR /src
COPY ./portfolio-client ./portfolio-client

# Change workdir into /src/email-gateway and start the application
WORKDIR /src/email-gateway
CMD ["/src/email-gateway/main"]