import posthog from "posthog-js";

/* ── Expert Flow event tracking ── */

/** CTA gomb kattintás (konzultáció foglalás) */
export function trackCTAClick(location: string) {
  posthog.capture("cta_click", {
    location,
    cta_type: "consultation_booking",
    cta_url: "https://cal.com/attila-nagy-8uefco/30min",
  });
}

/** Kapcsolat form kitöltés */
export function trackContactForm(method: "mailto" | "direct") {
  posthog.capture("contact_form_submit", { method });
}

/** Navigáció — oldal váltás (auto tracked by provider, but useful for specific sections) */
export function trackSectionView(section: string, page: string) {
  posthog.capture("section_view", { section, page });
}

/** Árazás csomag megtekintés */
export function trackPricingView(packageName: string) {
  posthog.capture("pricing_view", { package: packageName });
}

/** Email feliratkozás */
export function trackSubscribe(source: string) {
  posthog.capture("subscribe", { source });
}

/** Referencia kártya kattintás */
export function trackReferenceClick(name: string) {
  posthog.capture("reference_click", { reference_name: name });
}

/** Külső link kattintás */
export function trackExternalLink(url: string, label: string) {
  posthog.capture("external_link_click", { url, label });
}

/** FAQ kérdés megnyitása */
export function trackFAQOpen(question: string, page: string) {
  posthog.capture("faq_open", { question, page });
}

/** Tab váltás */
export function trackTabSwitch(tab: string, section: string) {
  posthog.capture("tab_switch", { tab, section });
}

/** Scroll depth milestone */
export function trackScrollDepth(depth: number, page: string) {
  posthog.capture("scroll_depth", { depth_percent: depth, page });
}

/** Felhasználó azonosítás (pl. form kitöltés után) */
export function identifyUser(email: string, name?: string) {
  posthog.identify(email, {
    email,
    ...(name && { name }),
    source: "expertflow-website",
  });
}

/* ── Quiz 2.0 Funnel Analytics ── */

/** Quiz oldal megtekintés */
export function trackQuizView() {
  posthog.capture("quiz_page_viewed", { version: "2.0" });
}

/** Quiz beküldés */
export function trackQuizSubmit(data: {
  has_budget: boolean;
  has_time: boolean;
  profession: string;
  how_found: string;
}) {
  posthog.capture("quiz_submitted", { version: "2.0", ...data });
}

/** Quiz sikeres beküldés → Cal.com redirect */
export function trackQuizCompleted() {
  posthog.capture("quiz_completed", { version: "2.0" });
}

/** Voice agent interakció */
export function trackVoiceAgent(action: "started" | "ended", page: string) {
  posthog.capture(`voice_agent_${action}`, { page });
}
