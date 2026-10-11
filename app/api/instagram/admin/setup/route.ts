import { instagramSetupService } from '../../../../../lib/instagram-setup';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function handle(request: Request) {
  try {
    return await instagramSetupService().handle(request);
  } catch {
    return Response.json(
      {
        error:
          'De instellingen zijn tijdelijk niet beschikbaar. Probeer het later opnieuw.',
        code: 'unavailable',
      },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
export const GET = handle;
export const PUT = handle;
