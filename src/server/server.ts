import express from "express";
import next from "next";
import nextI18nMiddleware from "next-i18next/middleware";
import i18nextInstance from "~/utils/i18next";

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

async function main() {
	await app.prepare();
	const server = express();

	await i18nextInstance.initPromise;
	server.use(nextI18nMiddleware(i18nextInstance));

	server.get("*", (req, res) => handle(req, res));

	await server.listen(port);
	console.log(`> Ready on http://localhost:${port}`);
}

main();
