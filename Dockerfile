# ===========================
# Stage 1: Dependencies
# ===========================
FROM node:20.18.1-alpine AS deps
WORKDIR /app

# Instalar dependencias de seguridad (dumb-init para manejo correcto de señales)
RUN apk add --no-cache libc6-compat dumb-init

# Copiar manifiestos
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# ===========================
# Stage 2: Builder
# ===========================
FROM node:20.18.1-alpine AS builder
WORKDIR /app

# Variables de build (NEXT_PUBLIC_* se embeben en el bundle)
ARG NEXT_PUBLIC_N8N_WEBHOOK_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_RECAPTCHA_SECRET_KEY
ARG NEXT_PUBLIC_RECAPTCHA_MIN_SCORE
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_SITE_URL

ENV NEXT_PUBLIC_N8N_WEBHOOK_URL=${NEXT_PUBLIC_N8N_WEBHOOK_URL}
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
ENV NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=${NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}
ENV NEXT_PUBLIC_RECAPTCHA_MIN_SCORE=${NEXT_PUBLIC_RECAPTCHA_MIN_SCORE}
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
ENV NEXT_PUBLIC_GTM_ID=${NEXT_PUBLIC_GTM_ID}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

# Instalar TODAS las dependencias (dev incluidas para build)
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copiar código fuente
COPY . .

# Build de la aplicación
RUN npm run build && \
    rm -rf .next/cache

# ===========================
# Stage 3: Runner (Producción)
# ===========================
FROM node:20.18.1-alpine AS runner
WORKDIR /app

# Variables de runtime
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=1536"

# Instalar dumb-init para manejo correcto de señales (evita procesos zombie)
RUN apk add --no-cache dumb-init

# 🔒 SECURITY: Crear usuario no-privilegiado (UID/GID 1001)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar dependencias de producción desde stage deps
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copiar archivos estáticos desde builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copiar build standalone desde builder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Crear directorio de uploads con permisos correctos
RUN mkdir -p /app/uploads && \
    chown nextjs:nodejs /app/uploads

# 🔒 SECURITY: Cambiar a usuario no-root
USER nextjs

# Exponer puerto
EXPOSE 6115

# 🔒 SECURITY: Usar dumb-init para evitar problemas con señales de PID 1
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "server.js"]
