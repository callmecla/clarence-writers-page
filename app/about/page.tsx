import ContactForm from "@/components/ContactForm";

export default function AboutPage() {
  return (
    <main style={{ paddingTop: "160px" }}>
      <section style={{ padding: "0 6vw 100px", maxWidth: "1040px", margin: "0 auto" }}>
        <div style={{ marginBottom: "50px" }}>
          <p
            style={{
              fontSize: "13px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--moss)",
              marginBottom: "18px",
            }}
          >
            a little about the one writing
          </p>
          <h1
            className="display"
            style={{ fontSize: "clamp(34px, 5vw, 54px)", fontWeight: 500, lineHeight: 1.1 }}
          >
            hello, I&apos;m <em style={{ color: "var(--gold)" }}>Rencey</em>.
          </h1>
        </div>

        {/* portrait placeholder — swap for a real photo or illustration */}
        <div
          style={{
            width: "180px",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            marginBottom: "42px",
            background: "linear-gradient(160deg, var(--moss) 0%, var(--gold) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            className="display"
            style={{ color: "var(--paper)", fontStyle: "italic", fontSize: "13px", opacity: 0.85 }}
          >
            your photo
          </span>
        </div>

        <div style={{ fontSize: "16.5px", lineHeight: 1.9, color: "var(--ink)", fontWeight: 300, maxWidth: "700px" }}>
          <p style={{ marginBottom: "20px" }}>
            I write in the hours most people spend asleep — that quiet stretch where a page feels
            more honest than daylight allows. This site is where those hours end up: novels I&apos;m
            still finding my way through, poems that started as a single line I couldn&apos;t shake,
            diary entries I&apos;ve decided are worth keeping, and photographs of whatever light
            stopped me in place long enough to notice it.
          </p>
          <p>
            I don&apos;t know yet what kind of writer I&apos;m becoming — only that I&apos;d rather
            find out slowly, in public, than wait until it&apos;s finished to show anyone. Thank you
            for reading along.
          </p>
        </div>

        {/* small marginalia-style facts */}
        <div
          style={{
            marginTop: "60px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "28px",
            borderTop: "1px solid var(--line)",
            paddingTop: "36px",
          }}
        >
          <Fact label="currently writing" value="a novel about an orchard that grows memories" />
          <Fact label="currently reading" value="whatever's on the nightstand this month" />
          <Fact label="a word I return to" value="'quiet' — for obvious reasons" />
          <Fact label="find me elsewhere" value="Wattpad, linked throughout" />
        </div>

        {/* favorite line from own writing */}
        <div
          style={{
            marginTop: "60px",
            padding: "34px",
            background: "var(--paper)",
            border: "1px solid var(--paper-edge)",
            borderRadius: "6px",
          }}
        >
          <p
            className="display"
            style={{
              fontStyle: "italic",
              fontSize: "20px",
              lineHeight: 1.6,
              color: "var(--ink)",
            }}
          >
            &ldquo;Every night at 3 a.m., a small-town radio host takes calls from listeners who
            haven&apos;t been born yet.&rdquo;
          </p>
          <p style={{ marginTop: "14px", fontSize: "13px", color: "var(--moss)" }}>
            — a line I keep coming back to, from Blue Hour Radio
          </p>
        </div>
      </section>

      <section
        style={{
          padding: "0 6vw 130px",
          maxWidth: "1040px",
          margin: "0 auto",
          borderTop: "1px solid var(--line)",
          paddingTop: "60px",
        }}
      >
        <h2 className="display" style={{ fontSize: "clamp(26px, 3.5vw, 36px)", marginBottom: "10px" }}>
          say hello
        </h2>
        <p style={{ color: "var(--ink-soft)", fontSize: "14.5px", marginBottom: "34px" }}>
          For thoughts on something you've read, a question, or just to say hi.
        </p>
        <ContactForm />
      </section>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--moss)",
          marginBottom: "8px",
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: 1.5 }}>{value}</p>
    </div>
  );
}
