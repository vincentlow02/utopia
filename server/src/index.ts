import { createServer } from 'node:http'
import { handleGenerateUtopiaImage } from './routes/generateUtopiaImage.js'

const port = Number(process.env.PORT ?? 8787)

const server = createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')

  if (request.url === '/api/generate-utopia-image') {
    void handleGenerateUtopiaImage(request, response)
    return
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }

  response.writeHead(404, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ error: 'Not found.' }))
})

server.listen(port, () => {
  console.log(`Utopia mock server listening on http://localhost:${port}`)
})
