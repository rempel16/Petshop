import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className="section">
      <div className="container">
        <h2>Contact</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <span className="label">Phone</span>
            <a className="value" href="tel:+493091588492">
              +49 30 915-88492
            </a>
          </div>
          <div className={styles.card}>
            <span className={styles.label}>Socials</span>
            <div className={styles.socials}>
              <a
                href="https://www.instagram.com/pet.shop.online_/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <img
                  src="/src/assets/icons/ic-instagram.svg"
                  alt="Instagram"
                  width="32"
                  height="32"
                />
              </a>
              <a
                href="https://wa.me/4915123456789"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <img
                  src="/src/assets/icons/ic-whatsapp.svg"
                  alt="WhatsApp"
                  width="32"
                  height="32"
                />
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <span className={styles.label}>Address</span>
            <span className={styles.value}>
              Wallstraße 9-13, 10179 Berlin,
              <br />
              Deutschland
            </span>
          </div>

          <div className={styles.card}>
            <span className={styles.label}>Working Hours</span>
            <span className={styles.value}>24 hours a day</span>
          </div>
        </div>

        {/* MAP */}
        <div className={styles.mapWrapper}>
          <iframe
            title="petshop map"
            src="https://www.google.com/maps?q=Wallstraße+9-13,+10179+Berlin,+Germany&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
