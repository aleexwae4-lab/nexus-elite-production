import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { Octokit } from "octokit";

dotenv.config();

// Initialize Supabase Client (Lazy)
let supabaseClient: any = null;
function getSupabase() {
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;
    if (url && key && !url.includes("YOUR_PROJECT")) {
      supabaseClient = createClient(url, key);
    }
  }
  return supabaseClient;
}

// Initialize Stripe (Lazy)
let stripeClient: Stripe | null = null;
function getStripe() {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (key && !key.includes("YOUR_STRIPE_KEY")) {
      stripeClient = new Stripe(key, { apiVersion: "2025-02-24.acacia" });
    }
  }
  return stripeClient;
}

// Initialize OpenAI (Lazy)
let openaiClient: OpenAI | null = null;
function getOpenAI() {
  if (!openaiClient && process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes("YOUR_OPENAI_KEY")) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

// Initialize Gemini (Lazy)
let geminiClient: GoogleGenAI | null = null;
function getGemini() {
  if (!geminiClient && process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes("YOUR_GEMINI_KEY")) {
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Stripe webhook needs raw body
  app.post("/api/webhooks/stripe", express.raw({ type: 'application/json' }), async (req, res) => {
    const stripe = getStripe();
    if (!stripe) return res.status(500).send("Stripe not configured");
    
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
      let event;
      if (endpointSecret && sig && !endpointSecret.includes("YOUR_STRIPE_WEBHOOK_SECRET")) {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } else {
        event = JSON.parse(req.body.toString());
      }

      // Handle the event
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          const userId = session.metadata?.user_id;
          const supabase = getSupabase();
          if (userId && supabase) {
            // Add credits to user
            await supabase.rpc('increment_credits', { user_id: userId, amount: 10 });
            console.log(`[Stripe Webhook] Added 10 credits to user ${userId}`);
          }
          break;
        default:
          console.log(`[Stripe Webhook] Unhandled event type ${event.type}`);
      }
      res.json({ received: true });
    } catch (err: any) {
      console.error(`[Stripe Webhook Error] ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });

  app.use(express.json());

  // 0. GOD MODE: System Status Dashboard
  app.get("/api/system/status", (req, res) => {
    res.json({
      status: "ONLINE",
      mode: "GOD_MODE",
      engines: {
        openai: !!process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes("YOUR_OPENAI_KEY"),
        gemini: !!process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes("YOUR_GEMINI_KEY"),
        supabase: !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY && !process.env.SUPABASE_URL.includes("YOUR_PROJECT")),
        stripe: !!(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET && !process.env.STRIPE_SECRET_KEY.includes("YOUR_STRIPE_KEY"))
      },
      timestamp: new Date().toISOString()
    });
  });

// 1. FORGE ENGINE: Autonomous Project Creation & Deployment
app.post("/api/forge/create-project", async (req, res) => {
  try {
    const { user_id, project_name, files } = req.body;
    const supabase = getSupabase();
    
    if (supabase) {
      // Validate user credits
      const { data: user } = await supabase.from("users").select("credits").eq("id", user_id).single();
      if (!user || user.credits <= 0) {
        return res.status(403).json({ error: "Insufficient credits in Forge Engine" });
      }
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const vercelToken = process.env.VERCEL_TOKEN;
    const githubUsername = process.env.GITHUB_USERNAME;

    if (!githubToken || !vercelToken || !githubUsername || 
        githubToken.includes("YOUR_") || vercelToken.includes("YOUR_") || githubUsername.includes("YOUR_")) {
      return res.status(500).json({ 
        error: "Forge Engine credentials not configured", 
        details: "Server is missing valid GITHUB_TOKEN, VERCEL_TOKEN, or GITHUB_USERNAME environment variables." 
      });
    }

    const octokit = new Octokit({ auth: githubToken });

    // 1. Create GitHub Repo
    const repoRes = await octokit.rest.repos.createForAuthenticatedUser({
      name: project_name,
      private: false,
      auto_init: true,
      description: "Generated by Nexus AI Forge Engine"
    });
    const repoData = repoRes.data;

    // 2. Push Files to GitHub
    if (files && Array.isArray(files)) {
      for (const file of files) {
        await octokit.rest.repos.createOrUpdateFileContents({
          owner: githubUsername,
          repo: project_name,
          path: file.path,
          message: "Initial commit by Nexus AI",
          content: Buffer.from(file.content).toString("base64")
        });
      }
    } else if (typeof files === 'string') {
      // Single file (App.js)
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: githubUsername,
        repo: project_name,
        path: "src/App.js",
        message: "Initial commit by Nexus AI",
        content: Buffer.from(files).toString("base64")
      });
      
      // Add a basic package.json if not provided
      const pkgJson = JSON.stringify({
        name: project_name,
        version: "0.1.0",
        private: true,
        dependencies: {
          "react": "^18.2.0",
          "react-dom": "^18.2.0",
          "lucide-react": "latest",
          "motion": "latest"
        },
        scripts: {
          "start": "react-scripts start",
          "build": "react-scripts build"
        }
      }, null, 2);

      await octokit.rest.repos.createOrUpdateFileContents({
        owner: githubUsername,
        repo: project_name,
        path: "package.json",
        message: "Add package.json",
        content: Buffer.from(pkgJson).toString("base64")
      });
    }

    // 3. Create Vercel Project
    const vercelRes = await fetch("https://api.vercel.com/v9/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: project_name,
        gitRepository: { type: "github", repo: `${githubUsername}/${project_name}` }
      })
    });
    const vercelData = await vercelRes.json();

    // 4. Trigger Deployment
    const deployRes = await fetch("https://api.vercel.com/v13/deployments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: project_name,
        gitSource: { type: "github", repoId: vercelData.link?.repoId || vercelData.id, ref: "main" }
      })
    });
    const deployData = await deployRes.json();

    if (supabase) {
      // Deduct credit and save project
      await supabase.rpc('decrement_credits', { user_id: user_id, amount: 1 });
      await supabase.from("projects").insert({
        user_id,
        name: project_name,
        repo: repoData.html_url,
        url: `https://${deployData.url || project_name + '.vercel.app'}`
      });
    }

    return res.json({ 
      success: true, 
      url: `https://${deployData.url || project_name + '.vercel.app'}`, 
      repo: repoData.html_url 
    });
  } catch (err: any) {
    console.error("[Forge Engine Error]", err);
    res.status(500).json({ error: "Internal Forge Error", details: err.message });
  }
});

  // 2. DUAL AI ENGINE: OpenAI + Gemini
  app.post("/api/ai/generate", async (req, res) => {
    try {
      const { prompt, messages, provider = "gemini", systemPrompt = "You are an elite AI SaaS Architect." } = req.body;
      if (!prompt && !messages) return res.status(400).json({ error: "Prompt or messages are required" });

      let outputText = "";

      if (provider === "openai") {
        const openai = getOpenAI();
        if (!openai) throw new Error("OpenAI API key not configured");
        
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: messages || [{ role: "system", content: systemPrompt }, { role: "user", content: prompt }],
        });
        outputText = completion.choices[0]?.message?.content || "";
      } else {
        const gemini = getGemini();
        if (!gemini) throw new Error("Gemini API key not configured");
        
        let contents: any = prompt;
        if (messages) {
          contents = messages.filter((m: any) => m.role !== 'system').map((m: any) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }));
        }
        
        const response = await gemini.models.generateContent({
          model: "gemini-3.1-pro-preview",
          contents: contents,
          config: { systemInstruction: systemPrompt }
        });
        outputText = response.text || "";
      }

      res.json({ success: true, provider, output: outputText });
    } catch (err: any) {
      console.error(`[AI Engine Error - ${req.body.provider || 'gemini'}]`, err);
      res.status(500).json({ error: "AI Generation Failed", details: err.message });
    }
  });

  // 3. GITHUB WEBHOOK: Listen for pushes
  app.post("/api/webhooks/github", async (req, res) => {
    const event = req.headers['x-github-event'];
    if (event === 'push') {
      const { repository, pusher } = req.body;
      console.log(`[GitHub Webhook] Push received on ${repository?.full_name} by ${pusher?.name}`);
    }
    res.json({ received: true });
  });

  // 4. VERCEL WEBHOOK: Deployment Status
  app.post("/api/webhooks/vercel", async (req, res) => {
    const { type, payload } = req.body;
    console.log(`[Vercel Webhook] Event: ${type} for project ${payload?.project?.name}`);
    
    if (type === 'deployment.succeeded') {
      const supabase = getSupabase();
      if (supabase) {
        await supabase.from('projects')
          .update({ status: 'deployed', last_deploy: new Date().toISOString() })
          .eq('name', payload.project.name);
      }
    }
    res.json({ received: true });
  });

  // 5. SUPABASE WEBHOOK: Database triggers
  app.post("/api/webhooks/supabase", async (req, res) => {
    const { type, record } = req.body;
    console.log(`[Supabase Webhook] ${type} event on table`);
    if (type === 'INSERT' && record?.email) {
      console.log(`[Supabase Webhook] Triggering welcome sequence for ${record.email}`);
    }
    res.json({ received: true });
  });

  // Legacy API routes
  app.post("/api/railway/deploy", async (req, res) => {
    const { serviceId } = req.body;
    try {
      const response = await fetch(`https://backboard.railway.app/graphql`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RAILWAY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `mutation { serviceDeploy(serviceId: "${serviceId}") { id } }`,
        }),
      });
      const data = await response.json();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ error: "Failed to deploy to Railway" });
    }
  });

  app.post("/api/stripe/checkout", async (req, res) => {
    const { amount, currency } = req.body;
    try {
      const stripe = getStripe();
      if (!stripe) throw new Error("Stripe not configured");
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency,
              product_data: { name: "Service" },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.APP_URL}/success`,
        cancel_url: `${process.env.APP_URL}/cancel`,
      });
      res.json({ success: true, sessionId: session.id, url: session.url });
    } catch (error) {
      res.status(500).json({ error: "Failed to create Stripe checkout" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
