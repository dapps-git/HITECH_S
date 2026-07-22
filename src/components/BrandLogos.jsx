import styles from './BrandLogos.module.css';

const brands = [
  { name: 'Mercedes-Benz', abbr: 'MB' },
  { name: 'BMW', abbr: 'BMW' },
  { name: 'Audi', abbr: 'AUDI' },
  { name: 'Cadillac', abbr: 'CAD' },
  { name: 'Ford', abbr: 'FORD' },
  { name: 'Chevrolet', abbr: 'CHEV' },
  { name: 'Toyota', abbr: 'TOY' },
  { name: 'Honda', abbr: 'HON' },
];

export default function BrandLogos() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`section-title ${styles.title}`}>Compatible Brands</h2>
        <div className={styles.track}>
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className={styles.logo}>
              <div className={styles.logoCircle}>
                <span className={styles.abbr}>{brand.abbr}</span>
              </div>
              <span className={styles.name}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
