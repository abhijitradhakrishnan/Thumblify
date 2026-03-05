/**
 * AI Service Layer
 * ----------------
 * Acts as an abstraction between the controller
 * and the underlying AI provider (Cloudflare, Gemini, etc).
 *
 * The controller should never directly call any provider.
 * Providers can be swapped without modifying controller logic.
 */
import { CloudflareProvider } from "./providers/cloudflareProvider.js";

const provider =
  process.env.AI_PROVIDER === "cloudflare"
    ? new CloudflareProvider()
    : new CloudflareProvider(); // fallback

export const generateImageWithAi = async (
  prompt: string,
  aspect_ratio: string = "16:9"
): Promise<Buffer> => {
  return provider.generate(prompt, aspect_ratio);
};
