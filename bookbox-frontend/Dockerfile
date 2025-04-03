ARG NODE_VERSION=23.10.0

# ----------- Building stage
FROM node:${NODE_VERSION}-alpine as builder
# Additional dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Copy package and package-lock
COPY package*.json ./
# Install all libraries to build the project 
RUN npm ci
COPY . .
# Build the project
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build 

# ----------- Runtime stage
FROM node:${NODE_VERSION}-alpine
WORKDIR /app
# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Runtime stage does not install any dependencies so app will be runinning as user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Copy built files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Change user
USER nextjs
# Expose the port that the application listens on.
EXPOSE 3001
# Run the application.
ENV HOSTNAME=0.0.0.0
ENV PORT=3001
CMD ["node", "server.js"]
