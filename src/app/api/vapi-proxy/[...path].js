export default async function handler(req, res) {
  const path = req.query.path.join('/');
  console.log(path)
  const url = `https://api.vapi.ai/${path}`;
  
  const response = await fetch(url, {
    method: req.method,
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
  });

  const data = await response.json();
  res.status(response.status).json(data);
}