export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.endsWith(".html")) {
      if (url.pathname === "/index.html") {
        url.pathname = "/";
      } else {
        url.pathname = url.pathname.replace(/\.html$/, "");
      }
      return Response.redirect(url.toString(), 301);
    }

    const originUrl = new URL(request.url);
    originUrl.hostname = "prls-co.pages.dev";
    originUrl.protocol = "https:";

    return fetch(new Request(originUrl.toString(), request));
  }
};
