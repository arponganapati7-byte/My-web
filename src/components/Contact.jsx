import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSending(true);
    setResponse(null);

    const form = event.currentTarget;

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const result = await fetch(
        "https://my-portfolio-backend-n7y9.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await result.json();

      if (result.ok && responseData.success) {
        setResponse({
          type: "success",
          message:
            "Success! Your message has been sent directly to Gmail.",
        });

        form.reset();
      } else {
        setResponse({
          type: "error",
          message:
            responseData.message ||
            "Failed to send message.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);

      setResponse({
        type: "error",
        message:
          "Unable to connect to the server. Please try again later.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="
        py-16
        md:py-24
        pt-28
        md:pt-32
        relative
      "
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <h2
          className="
            text-4xl
            md:text-5xl
            font-black
            mb-4
            text-brand-secondary
          "
        >
          Contact Me
        </h2>

        <p className="text-slate-400">
          Have a question or project in mind?
          Drop a message below!
        </p>
      </div>

      {/* Main */}
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-12
          gap-8
          glass-card
          rounded-2xl
          p-6
          sm:p-8
          border
          border-brand-primary/40
          bg-brand-primary/10
          shadow-[0_0_30px_rgba(99,102,241,0.2)]
        "
      >
        {/* Form */}
        <div
          className="
            lg:col-span-7
            glass-panel
            rounded-[2.5rem]
            p-8
            md:p-10
            border-t
            border-white/10
          "
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="form-name"
                className="
                  block
                  text-sm
                  font-semibold
                  text-slate-300
                  mb-2
                "
              >
                Name
              </label>

              <input
                type="text"
                id="form-name"
                name="name"
                required
                placeholder="Your Name"
                className="
                  w-full
                  bg-slate-900/80
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                  placeholder-slate-500
                  focus:border-emerald-400
                  focus:outline-none
                  focus:ring-1
                  focus:ring-emerald-400
                  transition-all
                "
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="form-email"
                className="
                  block
                  text-sm
                  font-semibold
                  text-slate-300
                  mb-2
                "
              >
                Email
              </label>

              <input
                type="email"
                id="form-email"
                name="email"
                required
                placeholder="your.email@example.com"
                className="
                  w-full
                  bg-slate-900/80
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                  placeholder-slate-500
                  focus:border-emerald-400
                  focus:outline-none
                  focus:ring-1
                  focus:ring-emerald-400
                  transition-all
                "
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="form-message"
                className="
                  block
                  text-sm
                  font-semibold
                  text-slate-300
                  mb-2
                "
              >
                Message
              </label>

              <textarea
                id="form-message"
                name="message"
                rows="4"
                required
                placeholder="Write your message here..."
                className="
                  w-full
                  bg-slate-900/80
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                  placeholder-slate-500
                  focus:border-emerald-400
                  focus:outline-none
                  focus:ring-1
                  focus:ring-emerald-400
                  transition-all
                  resize-none
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSending}
              className="
                w-full
                py-4
                px-8
                rounded-full
                bg-gradient-to-r
                from-brand-primary
                to-brand-secondary
                text-white
                font-bold
                text-lg
                flex
                items-center
                justify-center
                gap-3
                hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]
                hover:scale-[1.01]
                active:scale-[0.99]
                transition-all
                cursor-pointer
                disabled:opacity-75
                disabled:cursor-not-allowed
              "
            >
              <span>
                {isSending
                  ? "Sending..."
                  : "Send Message"}
              </span>

              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Response */}
            {response && (
              <div
                className={`
                  text-center
                  text-sm
                  font-mono
                  mt-4
                  p-3
                  rounded-xl
                  border

                  ${
                    response.type === "success"
                      ? `
                        bg-emerald-500/10
                        border-emerald-500/30
                        text-emerald-400
                      `
                      : `
                        bg-rose-500/10
                        border-rose-500/30
                        text-rose-400
                      `
                  }
                `}
              >
                {response.message}
              </div>
            )}
          </form>
        </div>

        {/* Contact Cards */}
        <div
          className="
            lg:col-span-5
            flex
            flex-col
            gap-4
          "
        >
          <ContactCard
            href="mailto:arpon.ganapati7@gmail.com"
            icon={<Mail />}
            title="Email"
            text="arpon.ganapati7@gmail.com"
          />

          <ContactCard
            href="tel:+8801626827360"
            icon={<Phone />}
            title="Personal Phone Number"
            text="+880 1626-827360"
          />

          <ContactCard
            href="https://facebook.com/arpon.veki09"
            icon={
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            }
            title="Facebook"
            text="Follow Arpon on Facebook"
            external
          />

          <ContactCard
            href="https://instagram.com/arpon_rizz_99"
            icon={
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  ry="5"
                />

                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />

                <line
                  x1="17.5"
                  y1="6.5"
                  x2="17.51"
                  y2="6.5"
                />
              </svg>
            }
            title="Instagram"
            text="Follow Arpon on Instagram"
            external
          />

          <ContactCard
            href="#location"
            icon={<MapPin />}
            title="Location"
            text="Dhaka, Bangladesh"
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  href,
  icon,
  title,
  text,
  external = false,
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      className="
        group
        glass-panel
        rounded-3xl
        p-4
        sm:p-5
        border
        border-white/10
        hover:border-brand-secondary/50
        hover:bg-slate-900/80
        transition-all
        flex
        items-center
        justify-between
        gap-3
        min-w-0
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          sm:gap-4
          min-w-0
        "
      >
        <div
          className="
            w-10
            h-10
            sm:w-12
            sm:h-12
            rounded-2xl
            bg-slate-900
            border
            border-white/10
            flex
            items-center
            justify-center
            shrink-0
            text-brand-secondary
            group-hover:border-brand-secondary/30
            transition-colors
          "
        >
          {icon}
        </div>

        <div className="min-w-0">
          <span
            className="
              block
              text-xs
              font-semibold
              text-slate-400
              uppercase
              tracking-wider
            "
          >
            {title}
          </span>

          <span
            className="
              text-xs
              sm:text-sm
              font-bold
              text-white
              group-hover:text-brand-secondary
              transition-colors
              block
              truncate
            "
          >
            {text}
          </span>
        </div>
      </div>

      <div
        className="
          w-9
          h-9
          sm:w-10
          sm:h-10
          rounded-full
          bg-slate-900
          border
          border-white/10
          flex
          items-center
          justify-center
          shrink-0
          group-hover:bg-brand-secondary
          group-hover:text-slate-950
          transition-all
        "
      >
        <ArrowUpRight
          className="
            w-4
            h-4
            sm:w-5
            sm:h-5
            text-slate-300
            group-hover:text-slate-950
          "
        />
      </div>
    </a>
  );
}

export default Contact;