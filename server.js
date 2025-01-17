const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080; // You can change the port if needed

// Enable CORS for all routes
app.use(cors());

// Route to proxy requests
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: 'Please provide a URL as a query parameter' });
    }

    try {
        const response = await fetch(targetUrl);
        const contentType = response.headers.get('content-type');
        const data = await response.buffer();

        // Forward the response headers and content
        res.set('Content-Type', contentType);
        res.status(response.status).send(data);
    } catch (error) {
        console.error(`Error fetching ${targetUrl}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch the target URL' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`CORS Proxy running at http://localhost:${port}`);
});
