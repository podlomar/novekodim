FROM smebberson/alpine-base:latest

RUN echo "http://dl-4.alpinelinux.org/alpine/v3.3/main" >> /etc/apk/repositories && \
    apk add --update nginx=1.14.2-r5 && \
    rm -rf /var/cache/apk/* && \
    chown -R nginx:www-data /var/lib/nginx && \
    apk add --update nodejs npm

ADD root /

EXPOSE 80 443

CMD ["node", "/app/server.js"]
