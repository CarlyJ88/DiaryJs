FROM node:14
WORKDIR /app
COPY ./Backend/node_modules ./node_modules
COPY ./Backend/dist .
COPY ./Frontend/dist ./public
RUN ls -lrt
EXPOSE $PORT
CMD node index.js