/**
 * @author     A. KHOUK
 * @date       06.04.2026
 * @version    1.0
 * @copyright  Copyright (c) 2026, A. KHOUK.
 * @license    This program is free software: you can redistribute it and/or modify
 *             it under the terms of the GNU General Public License as published by
 *             the Free Software Foundation, either version 3 of the License, or
 *             (at your option) any later version.
 */

// Supabase Edge Function: metalprice-monthly
// Fetches gold (XAU) and silver (XAG) latest prices from MetalPriceAPI.
// Store the API key in Supabase Secrets as: METALPRICEAPI_KEY


import { createClient } from "npm:@supabase/supabase-js@2";

const DEFAULT_BASE = "USD";
const DEFAULT_CURRENCIES = "EUR,XAU,XAG";
const TROY_OZ_IN_GRAMS = 31.1035;

Deno.serve(async (req: Request) => {
  try {
    if (req.method !== "GET") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const base = url.searchParams.get("base") ?? DEFAULT_BASE;
    const currencies = url.searchParams.get("currencies") ?? DEFAULT_CURRENCIES;

    const apiKey = Deno.env.get("METALPRICEAPI_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "Missing secret METALPRICEAPI_KEY",
          hint: "Set it via: supabase secrets set METALPRICEAPI_KEY=...",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // --- MetalPriceAPI abrufen ---
    const requestUrl = `https://api.metalpriceapi.com/v1/latest?api_key=${encodeURIComponent(apiKey)}&base=${encodeURIComponent(base)}&currencies=${encodeURIComponent(currencies)}`;

    const metalRes = await fetch(requestUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const payload = await metalRes.json().catch(() => null);

    if (!metalRes.ok) {
      return new Response(
        JSON.stringify({ error: "MetalPriceAPI request failed", status: metalRes.status, details: payload }),
        { status: metalRes.status, headers: { "Content-Type": "application/json" } },
      );
    }

    // --- Raten extrahieren ---
    const usdeur = payload?.rates?.USDEUR;
    const usdxag = payload?.rates?.USDXAG;
    const usdxau = payload?.rates?.USDXAU;

    if (usdeur == null || usdxag == null || usdxau == null) {
      return new Response(
        JSON.stringify({ error: "Missing required rates in payload", payload }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // --- Gramm-Preise in EUR berechnen ---
    const goldGramEur = usdxau / TROY_OZ_IN_GRAMS / usdeur;
    const silverGramEur = usdxag / TROY_OZ_IN_GRAMS / usdeur;

    // --- Upsert in Supabase ---
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const priceDate = new Date().toISOString().slice(0, 10);

    const { error: upsertError } = await supabase
      .from("metalprice_monthly")
      .upsert(
        {
          price_date: priceDate,
          gold_gram_eur: Math.round(goldGramEur * 100) / 100,
          silver_gram_eur: Math.round(silverGramEur * 100) / 100,
          usdeur,
          raw_payload: payload,
        },
        { onConflict: "price_date" },
      );

    if (upsertError) {
      return new Response(
        JSON.stringify({ error: "Failed to upsert", details: upsertError.message }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        fetched_at: new Date().toISOString(),
        price_date: priceDate,
        gold_gram_eur: Math.round(goldGramEur * 100) / 100,
        silver_gram_eur: Math.round(silverGramEur * 100) / 100,
        usdeur,
        saved: true,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
