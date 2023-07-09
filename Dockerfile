FROM node:18-alpine AS deps
RUN apk add -U tzdata
RUN apk add --no-cache libc6-compat
ENV TZ=America/Caracas
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
RUN apk add -U tzdata
ENV TZ=America/Caracas
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
RUN apk add -U tzdata
ARG PORT
ENV PORT=$PORT
ENV NODE_ENV production
ENV TZ=America/Caracas
WORKDIR /app
COPY --from=builder /app/src/variables.env ./src/variables.env
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE $PORT

CMD ["npm", "start"]
