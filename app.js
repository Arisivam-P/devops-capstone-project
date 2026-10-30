const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'healthy' }));
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head>
                    <title>DevOps Capstone Project</title>
                </head>
                <body>
                    <h1>Hello from Arisivam's DevOps Capstone Project!</h1>
                    <h2>Successfully deployed using Jenkins, Docker and AWS EC2.</h2>
                    <p>Monitoring: Prometheus and Grafana</p>
                </body>
            </html>
        `);
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Application running on port ${PORT}`);
});
