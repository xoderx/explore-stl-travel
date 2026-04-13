import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity, ListingEntity, EventEntity, UserCardEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // LISTINGS
  app.get('/api/listings', async (c) => {
    await ListingEntity.ensureSeed(c.env);
    const page = await ListingEntity.list(c.env);
    return ok(c, page.items);
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
  // TEST ENDPOINT
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'Explore STL Travel OS' }}));
}