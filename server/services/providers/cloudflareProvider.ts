import "dotenv/config";

export class CloudflareProvider {
  async generate(prompt: string, aspect_ratio: string = "16:9"): Promise<Buffer> {
    try {
      // Default size
      let width = 1024;
      let height = 1024;

      // Convert aspect ratio into dimensions
      switch (aspect_ratio) {
        case "16:9":
          width = 1024;
          height = 576;
          break;
        case "1:1":
          width = 1024;
          height = 1024;
          break;
        case "9:16":
          width = 576;
          height = 1024;
          break;
        default:
          width = 1024;
          height = 1024;
      }

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            width,
            height,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Cloudflare AI Error: ${errorText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);

    } catch (error: any) {
      console.error("Cloudflare Provider Error:", error.message);
      throw error;
    }
  }
}