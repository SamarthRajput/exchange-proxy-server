const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const app = express();
const port = 3005;

app.use(cors());

// Replace this with the target server Url can be backpack or binance
const targetUrl = 'https://api.backpack.exchange';

// Handling the CORS 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Expose-Header', 'Content-length, Content-Range');
    next();
});

app.use('/', createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        // Optionally, we can modify the request here
    },
    onProxyRes: (proxyRes, req, res) => {
        // Optionally, we can modify the response here
    }
}));

app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
})