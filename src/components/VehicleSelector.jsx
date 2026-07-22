'use client';
import { useState } from 'react';
import styles from './VehicleSelector.module.css';
import { FaCar, FaSearch, FaCheckCircle } from 'react-icons/fa';

export default function VehicleSelector() {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [engine, setEngine] = useState('');
  const [searched, setSearched] = useState(false);

  const years = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2015-2017'];
  const makes = ['BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen'];
  const models = {
    'BMW': ['3 Series (G20)', '5 Series (G30)', 'X5 (G05)', 'M4 (G82)', '7 Series'],
    'Mercedes-Benz': ['C-Class (W205)', 'E-Class (W213)', 'S-Class (W223)', 'GLE Coupe', 'AMG GT'],
    'Audi': ['A4 (B9)', 'A6 (C8)', 'Q7 (4M)', 'RS6 Avant', 'R8 V10'],
    'Toyota': ['Camry', 'Corolla', 'RAV4', 'GR Supra', 'Land Cruiser'],
    'Honda': ['Civic Type R', 'Accord', 'CR-V', 'Pilot'],
    'Ford': ['Mustang GT', 'F-150', 'Explorer', 'Focus RS'],
    'Chevrolet': ['Corvette C8', 'Silverado', 'Camaro SS'],
    'Volkswagen': ['Golf GTI', 'Passat', 'Tiguan'],
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (year && make && model) {
      setSearched(true);
      setTimeout(() => setSearched(false), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaCar className={styles.icon} />
        <div>
          <h3 className={styles.title}>Find Parts for Your Vehicle</h3>
          <p className={styles.subtitle}>Guaranteed fitment for over 50,000 models</p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSearch}>
        <div className={styles.selectGroup}>
          <select value={year} onChange={(e) => setYear(e.target.value)} className={styles.select} required>
            <option value="">1. Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            value={make}
            onChange={(e) => {
              setMake(e.target.value);
              setModel('');
            }}
            className={styles.select}
            required
          >
            <option value="">2. Select Make</option>
            {makes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={styles.select}
            disabled={!make}
            required
          >
            <option value="">3. Select Model</option>
            {make && models[make]?.map((mod) => (
              <option key={mod} value={mod}>{mod}</option>
            ))}
          </select>

          <select
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            className={styles.select}
            disabled={!model}
          >
            <option value="">4. Select Engine (Optional)</option>
            <option value="2.0L Turbo I4">2.0L Turbo I4</option>
            <option value="3.0L Twin-Turbo V6">3.0L Twin-Turbo V6</option>
            <option value="4.0L V8 Biturbo">4.0L V8 Biturbo</option>
            <option value="Electric / Hybrid">Electric / Hybrid</option>
          </select>
        </div>

        <button type="submit" className={`${styles.searchBtn} ${searched ? styles.success : ''}`}>
          {searched ? (
            <>
              <FaCheckCircle /> 1,420 Parts Found!
            </>
          ) : (
            <>
              <FaSearch /> Find Matching Parts
            </>
          )}
        </button>
      </form>
    </div>
  );
}
