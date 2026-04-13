import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity, ListingEntity, EventEntity, UserCardEntity, ReviewEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import { MOCK_ROI_DATA } from "@shared/mock-data";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // LISTINGS
  app.get('/api/listings', async (c) => {
    await ListingEntity.ensureSeed(c.env);
    const page = await ListingEntity.list(c.env);
    return ok(c, page.items);
  });
  app.get('/api/listings/:id', async (c) => {
    const id = c.req.param('id');
    const entity = new ListingEntity(c.env, id);
    if (!await entity.exists()) return notFound(c, 'Listing not found');
    return ok(c, await entity.getState());
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
  app.get('/api/events/:id', async (c) => {
    const id = c.req.param('id');
    const entity = new EventEntity(c.env, id);
    if (!await entity.exists()) return notFound(c, 'Event not found');
    return ok(c, await entity.getState());
  });
  // USER CARD
  app.get('/api/card/:userId', async (c) => {
    await UserCardEntity.ensureSeed(c.env);
    const userId = c.req.param('userId');
    const entity = new UserCardEntity(c.env, userId);
    if (!await entity.exists()) return notFound(c, 'Card not found');
    return ok(c, await entity.getState());
  });
  app.post('/api/card/redeem', async (c) => {
    const { userId, amount, description } = await c.req.json();
    if (!userId || !amount) return bad(c, 'Missing required fields');
    const entity = new UserCardEntity(c.env, userId);
    if (!await entity.exists()) return notFound(c, 'Card not found');
    try {
      const tx = await entity.redeemPoints(amount, description || 'Reward Redemption');
      return ok(c, tx);
    } catch (e: any) {
      return bad(c, e.message);
    }
  });
  // ANALYTICS
  app.get('/api/analytics/:district', async (c) => {
    const district = c.req.param('district');
    const impact = MOCK_ROI_DATA.find(d => d.district === district) || MOCK_ROI_DATA[0];
    // Aggregate some "real" data from the entities
    const listings = await ListingEntity.list(c.env);
    const events = await EventEntity.list(c.env);
    const districtListingsCount = listings.items.filter(l => l.district === district).length;
    const districtEventsCount = events.items.filter(e => e.district === district).length;
    return ok(c, {
      ...impact,
      businessesSupported: districtListingsCount || impact.businessesSupported,
      activeEvents: districtEventsCount
    });
  });
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'Explore STL Travel OS' }}));
}