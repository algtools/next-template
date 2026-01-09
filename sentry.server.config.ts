// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Determine environment from NEXT_PUBLIC_ENVIRONMENT (set in Cloudflare Worker config)
// Set NEXT_PUBLIC_ENVIRONMENT=development for dev branch, NEXT_PUBLIC_ENVIRONMENT=production for main branch
const environment =
	process.env.NEXT_PUBLIC_ENVIRONMENT || process.env.NODE_ENV || "development";
const isDevelopment = environment === "development";

Sentry.init({
	dsn: "https://4a1f0b08fb8302648bd158aa247bd44f@o4510105954680832.ingest.us.sentry.io/4510675820544000",

	// Tag events with the environment (dev or production)
	environment,

	// Define how likely traces are sampled. Higher in dev for debugging, lower in production.
	tracesSampleRate: isDevelopment ? 1.0 : 0.2,

	// Enable logs to be sent to Sentry
	enableLogs: true,

	// Enable sending user PII (Personally Identifiable Information)
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
	sendDefaultPii: true,
});
