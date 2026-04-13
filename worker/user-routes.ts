import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity, ListingEntity, EventEntity, UserCardEntity, ReviewEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import { MOCK_ROI_DATA } from "@shared/mock-data";
import type { ReviewInput, CheckInInput } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // LISTINGS
  app.get('/api/listings', async (c) => {
    await ListingEntity.ensureSeed(c.env);
    const page = await ListingEntity.list(c.env);
    // Sort sponsored to the top
    const sorted = [...page.items].sort((a, b) => (b.isSponsored ? 1 : 0) - (a.isSponsored ? 1 : 0));
    return ok(c, sorted);
  });
  app.get('/api/listings/:id', async (c) => {
    const id = c.req.param('id');
    const entity = new ListingEntity(c.env, id);
    if (!await entity.exists()) return notFound(c, 'Listing not found');
    return ok(c, await entity.getState());
  });
  app.post('/api/listings/:id/reviews', async (c) => {
    const id = c.req.param('id');
    const input = await c.req.json<ReviewInput>();
    if (!input.comment || !input.rating) return bad(c, 'Invalid review data');
    const review = await ReviewEntity.create(c.env, {
      id: crypto.randomUUID(),
      listingId: id,
      userName: input.userName || 'Anonymous',
      rating: input.rating,
      comment: input.comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    return ok(c, review);
  });
  app.get('/api/listings/:id/reviews', async (c) => {
    const id = c.req.param('id');
    await ReviewEntity.ensureSeed(c.env);
    const page = await ReviewEntity.list(c.env);
    const filtered = page.items.filter(r => r.listingId === id);
    return ok(c, filtered);
  });
  // EVENTS
  app.get('/api/events', async (c) => {
    await EventEntity.ensureSeed(c.env);
    const page = await EventEntity.list(c.env);
    return ok(c, page.items);
  });
  // USER CARD
  app.get('/api/card/:userId', async (c) => {
    await UserCardEntity.ensureSeed(c.env);
    const userId = c.req.param('userId');
    const entity = new UserCardEntity(c.env, userId);
    if (!await entity.exists()) return notFound(c, 'Card not found');
    return ok(c, await entity.getState());
  });
  app.post('/api/card/check-in', async (c) => {
    const { userId, listingId, listingName } = await c.req.json<CheckInInput>();
    if (!userId || !listingId) return bad(c, 'Missing check-in data');
    const entity = new UserCardEntity(c.env, userId);
    if (!await entity.exists()) return notFound(c, 'Card not found');
    try {
      const tx = await entity.checkIn(listingId, listingName);
      return ok(c, tx);
    } catch (e: any) {
      return bad(c, e.message);
    }
  });
  app.post('/api/card/redeem', async (c) => {
    const { userId, amount, description } = await c.req.json();
    const entity = new UserCardEntity(c.env, userId);
    try {
      const tx = await entity.redeemPoints(amount, description);
      return ok(c, tx);
    } catch (e: any) {
      return bad(c, e.message);
    }
  });
  // ANALYTICS
  app.get('/api/analytics/:district', async (c) => {
    const district = c.req.param('district');
    const impact = MOCK_ROI_DATA.find(d => d.district === district) || MOCK_ROI_DATA[0];
    const listings = await ListingEntity.list(c.env);
    const districtListingsCount = listings.items.filter(l => l.district === district).length;
    return ok(c, {
      ...impact,
      businessesSupported: districtListingsCount || impact.businessesSupported,
      districtHealth: Math.min(100, (districtListingsCount * 12))
    });
  });
}