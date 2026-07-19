import type { Metadata } from "next";
import Court from "@/components/Court";
import Parallax from "@/components/Parallax";
import { Stagger, Item, RiseLine } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Stockists",
  description:
    "Where to find Greater4 paddles and court wear across Metro Manila, Cebu, and Davao, plus the club and coach programme.",
};

const STOCKISTS = [
  { region: "Metro Manila", places: ["Helios Pickleball, Pasig", "SM Megamall Active Hub, Mandaluyong", "The Podium Courts, Ortigas", "BGC Sports Centre, Taguig"] },
  { region: "Visayas", places: ["SM Seaside Active Hub, Cebu", "Cebu Pickleball Club, Mandaue", "Bohol Racquet Centre, Tagbilaran"] },
  { region: "Mindanao", places: ["SM Lanang Active Hub, Davao", "Cagayan de Oro Pickleball, CDO"] },
];

export default function StockistsPage() {
  return (
    <>
      <section className="shell pt-[clamp(2.5rem,6vw,5rem)]">
        <Stagger className="grid12 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="display" style={{ fontSize: "var(--t-display)" }}>
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

      <section className="shell mt-[var(--section-tight)]">
        {STOCKISTS.map((group) => (
          <div key={group.region}>
            <div
              className="grid12 gap-y-6 py-10 border-t"
              style={{ borderColor: "var(--rule)" }}
            >
              <h2 className="col-span-12 md:col-span-3 data" style={{ color: "var(--mute)" }}>
                {group.region}
              </h2>
              <ul className="col-span-12 md:col-span-9 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {group.places.map((place) => (
                  <li key={place} className="text-[1.05rem] tracking-[-0.01em]">
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div>
          <p className="data pt-8" style={{ color: "var(--mute)" }}>
            Placeholder locations. Replace with the real dealer list before launch.
          </p>
        </div>
      </section>

      {/* Club programme + contact */}
      <section id="clubs" className="shell pt-[var(--section)] scroll-mt-24">
        <div>
          <div className="border-t pt-10" style={{ borderColor: "var(--ink)" }}>
            <div className="grid12 gap-y-12">
              <div className="col-span-12 lg:col-span-6">
                <p className="data mb-6" style={{ color: "var(--mute)" }}>
                  Clubs and coaches
                </p>
                <h2 className="display" style={{ fontSize: "var(--t-head)" }}>
                  277 clubs.
                  <br />
                  We want all of them.
                </h2>
                <p className="lead mt-8" style={{ maxWidth: "42ch" }}>
                  Wholesale pricing, co-branded court wear, demo paddle sets for
                  open play, and equipment packages for new courts. If you run a
                  club, a court, or a coaching programme anywhere in the
                  Philippines, we would rather talk to you than to an
                  algorithm.
                </p>
              </div>

              <div className="col-span-12 lg:col-span-5 lg:col-start-8">
                <form className="space-y-8" action="#">
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
                        className="w-full bg-transparent border-b pb-3 outline-none placeholder:opacity-50 text-[1.05rem] focus:border-black transition-colors"
                        style={{ borderColor: "var(--rule)" }}
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
                      className="w-full bg-transparent border-b pb-3 outline-none resize-none text-[1.05rem] focus:border-black transition-colors"
                      style={{ borderColor: "var(--rule)" }}
                    />
                  </div>

                  {/* ponytail: no backend — point action at your form handler. */}
                  <button type="submit" className="btn btn-solid data w-full justify-center">
                    Send enquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pt-[var(--section)]">
        <div>
          <div className="border-t pt-12 opacity-25" style={{ borderColor: "var(--rule)" }}>
            <Parallax speed={0.07}>
              <Court uid="stockists" className="w-full h-auto max-h-[30vh]" dimensions={false} />
            </Parallax>
          </div>
        </div>
      </section>
    </>
  );
}
