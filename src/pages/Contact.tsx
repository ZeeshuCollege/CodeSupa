import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { PageIntro } from "../components/PageIntro";

export default function Contact() {
  return (
    <div className="page contact-page">
      <PageIntro
        eyebrow="Contact / Start here"
        title={<>Tell us what you're <em>building.</em></>}
        description="Give us the context, the constraint and the outcome you want. We'll take it from there."
      />
      <section className="contact-grid">
        <div className="contact-block">
          <p className="eyebrow">Email</p>
          <a className="contact-link" href="mailto:hello@codesupa.com">hello@codesupa.com <ArrowUpRight size={24}/></a>
        </div>
        <div className="contact-block">
          <p className="eyebrow">Phone</p>
          <a className="contact-link" href="tel:+910000000000">+91 00000 00000 <Phone size={22}/></a>
        </div>
        <div className="contact-block">
          <p className="eyebrow">Project brief</p>
          <form className="brief-form" onSubmit={(event) => event.preventDefault()}>
            <label>Name<input required placeholder="Your name" /></label>
            <label>Work email<input required type="email" placeholder="you@company.com" /></label>
            <label>What are we solving?<textarea required rows={5} placeholder="Tell us about the project, goal and timeline." /></label>
            <button type="submit" className="submit-button">Send brief <ArrowUpRight size={21}/></button>
          </form>
        </div>
      </section>
      <section className="contact-tail">
        <Mail size={18} strokeWidth={1.7}/>
        <span>Based in India. Working globally.</span>
      </section>
    </div>
  );
}