// API route for health check
export async function GET() {
  return Response.json({ status: 'ok', message: 'API is running' });
}
