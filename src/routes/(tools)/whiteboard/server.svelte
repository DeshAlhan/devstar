
<script context="module">
  export async function post(req, res) {
    try {
      // Handle POST request to the server here (if needed)
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Server received drawing data' }));
    } catch (err) {
      console.error('Error processing POST request:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Server error' }));
    }
  }
</script>
