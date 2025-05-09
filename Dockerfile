FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
COPY ./dist/frontend-projeto-temperatura/browser /usr/share/nginx/html

