import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  
  // Redirect pearls.community to prls.co
  if (url.hostname.includes("pearls.community")) {
    url.hostname = "www.prls.co";
    return Response.redirect(url.toString(), 301);
  }
  
  return next();
});
