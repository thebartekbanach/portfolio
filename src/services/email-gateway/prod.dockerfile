FROM golang:alpine

WORKDIR /src/email-gateway/

COPY ./go.mod .
COPY ./go.sum .

RUN go mod download

COPY . .
RUN go build -o main .

CMD ["/src/email-gateway/main"]
