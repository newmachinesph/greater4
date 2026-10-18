import type { Metadata } from "next";
import Court from "@/components/Court";
import Photo from "@/components/Photo";
import Badge from "@/components/Badge";
import { Stagger, Item, RiseLine, Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "Stockists",
  "Where to find Greater4 paddles and court wear across Metro Manila, Cebu, and Davao, plus the club and coach programme.",
  "/stockists",
);

const STOCKISTS = [
  { region: "Metro Manila", places: ["Helios Pickleball, Pasig", "SM Megamall Active Hub, Mandaluyong", "The Podium Courts, Ortigas", "BGC Sports Centre, Taguig"] },
  { region: "Visayas", places: ["SM Seaside Active Hub, Cebu", "Cebu Pickleball Club, Mandaue", "Bohol Racquet Centre, Tagbilaran"] },
  { region: "Mindanao", places: ["SM Lanang Active Hub, Davao", "Cagayan de Oro Pickleball, CDO"] },
];

export default function StockistsPage() {
  return (
    <>
      <section className="shell pt-[clamp(2rem,5vw,4rem)]">
        <Stagger className="grid12 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Item>
              <Badge>Nine locations · three regions</Badge>
            </Item>
            <h1 className="display mt-7" style={{ fontSize: "var(--t-display)" }}>
              <RiseLine>Hold one</RiseLine>
              <RiseLine>before you buy</RiseLine>
            </h1>
          </div>
          <Item className="col-span-12 lg:col-span-4">
            <p className="lead" style={{ maxWidth: "36ch" }}>
              A paddle is a hand tool. No specification sheet, ours included,
              tells you how it feels at the end of your arm.
            </p>
          </Item>
        </Stagger>
      </section>

      {/* Locations + map photo */}
      <section className="shell mt-[var(--section-tight)]">
        <div className="grid12 gap-6 items-start">
          <Reveal className="col-span-12 lg:col-span-7">
            <div className="surface round-xl overflow-hidden p-[clamp(1.25rem,3vw,2.5rem)]">
              {STOCKISTS.map((group, gi) => (
                <div
                  key={group.region}
                  className="grid12 gap-y-5 py-8"
                  style={gi > 0 ? { borderTop: "1px solid var(--rule)" } : undefined}
                >
                  <h2 className="col-span-12 md:col-span-4 data" style={{ color: "var(--mute)" }}>
                    {group.region}
                  </h2>
                  <ul className="col-span-12 md:col-span-8 flex flex-col gap-4">
                    {group.places.map((place) => (
                      <li
                        key={place}
                        className="text-[1.05rem] tracking-[-0.01em] flex items-baseline gap-3"
                      >
                        <span className="badge-dot mt-2 opacity-40" aria-hidden="true" />
                        {place}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="data pt-6" style={{ color: "var(--mute)" }}>
                Placeholder locations · replace with the real dealer list before launch
              </p>
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-5" delay={0.08}>
            <Photo
              seed="stockist-map"
              alt="Aerial view of an outdoor court complex"
              ratio="4 / 5"
              rounded="var(--r-xl)"
              label="Nationwide"
              w={1200}
              h={1500}
            />
          </Reveal>
        </div>
      </section>

      {/* Club programme + contact */}
      <section id="clubs" className="shell pt-[var(--section)] scroll-mt-28">
        <div className="surface-wash grain relative round-2xl overflow-hidden p-[clamp(1.5rem,4vw,4rem)]">
          <div className="grid12 gap-y-12">
            <div className="col-span-12 lg:col-span-6">
              <Badge>Clubs and coaches</Badge>
              <h2 className="display mt-7" style={{ fontSize: "var(--t-head)" }}>
                277 clubs.
                <br />
                We want all of them.
              </h2>
              <p className="lead mt-8" style={{ maxWidth: "42ch" }}>
                Wholesale pricing, co-branded court wear, demo paddle sets for
                open play, and equipment packages for new courts. If you run a
                club, a court, or a coaching programme anywhere in the
                Philippines, we would rather talk to you than to an algorithm.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <form className="space-y-7" action="#">
                {[
                  { id: "name", label: "Name", type: "text", ph: "Juan dela Cruz" },
                  { id: "club", label: "Club or court", type: "text", ph: "Pasig Pickleball Club" },
                  { id: "email", label: "Email", type: "email", ph: "you@court.ph" },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="data block mb-3" style={{ color: "var(--mute)" }}>
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      required
                      placeholder={f.ph}
                      className="w-full outline-none placeholder:opacity-50 text-[1.05rem] px-5 py-3.5"
                      style={{
                        background: "var(--paper)",
                        border: "1px solid var(--rule-strong)",
                        borderRadius: "var(--r-pill)",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="msg" className="data block mb-3" style={{ color: "var(--mute)" }}>
                    What do you need
                  </label>
                  <textarea
                    id="msg"
                    name="msg"
                    rows={3}
                    className="w-full outline-none resize-none text-[1.05rem] px-5 py-3.5"
                    style={{
                      background: "var(--paper)",
                      border: "1px solid var(--rule-strong)",
                      borderRadius: "var(--r)",
                    }}
                  />
                </div>

                {/* ponytail: no backend — point action at your form handler. */}
                <button type="submit" className="btn btn-solid data w-full">
                  Send enquiry
                  <span className="arw" aria-hidden="true">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pt-[var(--section)]">
        <div className="opacity-25">
          <Court uid="stockists" className="w-full h-auto max-h-[30vh]" dimensions={false} />
        </div>
      </section>
    </>
  );
}
