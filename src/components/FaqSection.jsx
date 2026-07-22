'use client';
import { useState } from 'react';
import styles from './FaqSection.module.css';
import { FaChevronDown, FaExclamationTriangle, FaCheckCircle, FaTools, FaTruck, FaClock, FaTag, FaFlask, FaWind, FaFire, FaTachometerAlt } from 'react-icons/fa';

const faqs = [
  {
    id: 1,
    question: "1. Why should a DPF be cleaned?",
    summary: "Prevent engine power loss, turbocharger damage & high fuel consumption caused by soot accumulation.",
    answer: (
      <div className={styles.faqBody}>
        <p className={styles.introP}>
          When soot and ash accumulate inside the DPF and cause blockage, the following critical issues occur:
        </p>
        <div className={styles.warningGrid}>
          <div className={styles.warningCard}><FaExclamationTriangle className={styles.warnIcon} /> Engine performance may decrease.</div>
          <div className={styles.warningCard}><FaExclamationTriangle className={styles.warnIcon} /> Fuel consumption may increase.</div>
          <div className={styles.warningCard}><FaExclamationTriangle className={styles.warnIcon} /> Risk of turbocharger damage may increase.</div>
          <div className={styles.warningCard}><FaExclamationTriangle className={styles.warnIcon} /> EGR Valve, Differential Pressure Sensor & EGT Sensor affected.</div>
          <div className={styles.warningCard}><FaExclamationTriangle className={styles.warnIcon} /> Engine may overheat under heavy load.</div>
          <div className={styles.warningCard}><FaExclamationTriangle className={styles.warnIcon} /> DPF Warning Light or Check Engine Light illuminates.</div>
          <div className={styles.warningCard}><FaExclamationTriangle className={styles.warnIcon} /> Emission control efficiency decreases (increased pollution).</div>
          <div className={styles.warningCard}><FaExclamationTriangle className={styles.warnIcon} /> In severe cases, expensive DPF replacement becomes necessary.</div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    question: "2. When should DPF | DOC | SCR | ASC be cleaned?",
    summary: "Check for DPF light, loss of pulling power, excessive black smoke & high exhaust temp.",
    answer: (
      <div className={styles.faqBody}>
        <p className={styles.introP}>
          The emission system should be inspected immediately if you notice any of the following symptoms:
        </p>
        <div className={styles.symptomList}>
          <div className={styles.symptomItem}><FaCheckCircle className={styles.checkIcon} /> <strong>DPF Warning Light is ON</strong></div>
          <div className={styles.symptomItem}><FaCheckCircle className={styles.checkIcon} /> <strong>Reduced vehicle performance</strong></div>
          <div className={styles.symptomItem}><FaCheckCircle className={styles.checkIcon} /> <strong>Loss of pulling power under acceleration</strong></div>
          <div className={styles.symptomItem}><FaCheckCircle className={styles.checkIcon} /> <strong>Excessive black smoke from exhaust</strong></div>
          <div className={styles.symptomItem}><FaCheckCircle className={styles.checkIcon} /> <strong>Abnormally high exhaust gas temperature</strong></div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    question: "3. What should be done first if these symptoms appear?",
    summary: "Inspect at authorized service center and attempt forced regeneration first.",
    answer: (
      <div className={styles.faqBody}>
        <div className={styles.stepBox}>
          <span className={styles.stepTag}>STEP 1: SERVICE CENTER INSPECTION</span>
          <p>Have the vehicle inspected at an authorized service center. Perform a <strong>Forced Regeneration</strong>.</p>
          <p className={styles.subNote}>• If blockage is caused only by light soot accumulation, the issue may be resolved through regeneration.</p>
        </div>
        <div className={styles.alertBox}>
          <strong>❌ IF WARNING LIGHT REMAINS ON OR BACK PRESSURE IS STILL HIGH:</strong> Professional scientific cleaning is required.
        </div>
      </div>
    ),
  },
  {
    id: 4,
    question: "4. What should the vehicle owner do before professional cleaning?",
    summary: "Record OBD diagnostic scanner values: Soot Value, Clogging %, and Fault Codes.",
    answer: (
      <div className={styles.faqBody}>
        <p className={styles.introP}>
          At an authorized service center, use an OBD diagnostic scanner to record baseline values:
        </p>
        <div className={styles.recordsList}>
          <span>✅ Soot Value (grams)</span>
          <span>✅ Clogging Percentage (%)</span>
          <span>✅ Active Diagnostic Fault Codes (DTC)</span>
        </div>
        <p className={styles.subNote} style={{ marginTop: '12px' }}>
          These records verify the effectiveness of the cleaning by comparing values before and after service.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    question: "5. What is Professional DPF Cleaning? (Our 4-Stage Process)",
    summary: "Scientific & safe process involving Chemical Soaking, Hydro-Pneumatic Cleaning, Thermal Regeneration & Pressure Test.",
    answer: (
      <div className={styles.faqBody}>
        <p className={styles.introP}>
          Professional DPF Cleaning is a scientific and safe process that removes soot, ash, oil residue, and contaminants inside the DPF honeycomb channels. It is not just a simple water wash or heat treatment.
        </p>

        <h4 className={styles.subHeading}>OUR 4-STAGE PROFESSIONAL CLEANING PROCESS:</h4>
        <div className={styles.processGrid}>
          <div className={styles.processCard}>
            <div className={styles.stageNumber}><FaFlask /> Stage 1</div>
            <h5>Chemical Soaking</h5>
            <p>The DPF is immersed in a specially formulated cleaning solution to soften accumulated soot, ash, and oil residues.</p>
          </div>

          <div className={styles.processCard}>
            <div className={styles.stageNumber}><FaWind /> Stage 2</div>
            <h5>Hydro-Pneumatic Cleaning</h5>
            <p>Using water and compressed air, contaminants are safely flushed from honeycomb channels in both flow directions.</p>
          </div>

          <div className={styles.processCard}>
            <div className={styles.stageNumber}><FaFire /> Stage 3</div>
            <h5>Thermal Regeneration</h5>
            <p>Carbon deposits are burned off under controlled temperature cycles without causing structural damage to the DPF.</p>
          </div>

          <div className={styles.processCard}>
            <div className={styles.stageNumber}><FaTachometerAlt /> Stage 4</div>
            <h5>Final Pressure Test</h5>
            <p>Back pressure and airflow are tested to ensure the DPF has been restored to factory spec and ready for installation.</p>
          </div>
        </div>

        <h4 className={styles.subHeading} style={{ marginTop: '24px' }}>KEY BENEFITS OF PROFESSIONAL CLEANING:</h4>
        <ul className={styles.benefitsList}>
          <li><FaCheckCircle className={styles.checkIcon} /> Restores proper exhaust airflow & engine breathing</li>
          <li><FaCheckCircle className={styles.checkIcon} /> Reduces harmful back pressure on turbocharger</li>
          <li><FaCheckCircle className={styles.checkIcon} /> Restores engine horsepower & acceleration performance</li>
          <li><FaCheckCircle className={styles.checkIcon} /> Improves mileage & overall fuel efficiency</li>
          <li><FaCheckCircle className={styles.checkIcon} /> Extends the operational service life of the DPF unit</li>
          <li><FaCheckCircle className={styles.checkIcon} /> Reduces likelihood of future blockages</li>
        </ul>
      </div>
    ),
  },
  {
    id: 6,
    question: "6. What happens if only heat treatment or pressure washing is performed?",
    summary: "Ash cannot be completely removed, leading to rapid re-blocking & warning lights.",
    answer: (
      <div className={styles.faqBody}>
        <div className={styles.alertBox}>
          <strong>⚠️ ASH CANNOT BE COMPLETELY REMOVED BY SIMPLE WATER WASH OR HEAT ONLY.</strong>
        </div>
        <p className={styles.introP} style={{ marginTop: '12px' }}>As a result of improper washing:</p>
        <ul className={styles.simpleList}>
          <li>• The DPF will become blocked again within a short period.</li>
          <li>• Engine power & performance will rapidly decrease.</li>
          <li>• Check engine / DPF warning light will reappear on dashboard.</li>
          <li>• Increases risk of permanent ceramic filter substrate damage.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 7,
    question: "7. Why does the warning light remain ON even after DPF cleaning?",
    summary: "Diagnostic fault code reset, ash counter reset, sensor checks, or forced regen required.",
    answer: (
      <div className={styles.faqBody}>
        <p className={styles.introP}>
          If the dashboard warning light stays illuminated post-cleaning, check these technical resolution steps:
        </p>
        <div className={styles.troubleList}>
          <div className={styles.troubleItem}>
            <span className={styles.causeTitle}>✔️ Diagnostic Trouble Code (DTC) stored in ECU</span>
            <span className={styles.solutionText}>➡️ Scan and clear stored fault codes using an OBD diagnostic scanner.</span>
          </div>

          <div className={styles.troubleItem}>
            <span className={styles.causeTitle}>✔️ DPF Ash Counter or Soot Load not reset</span>
            <span className={styles.solutionText}>➡️ Perform DPF Reset, Ash Counter Reset, or Learned Values Reset in ECU.</span>
          </div>

          <div className={styles.troubleItem}>
            <span className={styles.causeTitle}>✔️ Forced Regeneration still required</span>
            <span className={styles.solutionText}>➡️ Trigger a Forced Regeneration drive cycle using a diagnostic tool.</span>
          </div>

          <div className={styles.troubleItem}>
            <span className={styles.causeTitle}>✔️ Differential Pressure Sensor or Hoses fault</span>
            <span className={styles.solutionText}>➡️ Inspect pressure sensor & hoses; clean or replace if clogged/damaged.</span>
          </div>

          <div className={styles.troubleItem}>
            <span className={styles.causeTitle}>✔️ Faulty Exhaust Gas Temperature (EGT) Sensor</span>
            <span className={styles.solutionText}>➡️ Check live sensor temperature readings and perform sensor diagnostics.</span>
          </div>

          <div className={styles.troubleItem}>
            <span className={styles.causeTitle}>✔️ DPF not cleaned completely</span>
            <span className={styles.solutionText}>➡️ Perform a Differential Pressure Test or Flow Test to verify airflow.</span>
          </div>

          <div className={styles.troubleItem}>
            <span className={styles.causeTitle}>✔️ Other engine-related faults (Injector, Turbo, EGR, Intake)</span>
            <span className={styles.solutionText}>➡️ Repair underlying engine/fuel hardware faults first.</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    question: "8. How long does professional cleaning take?",
    summary: "Typically 1–2 working days for thorough chemical soaking, baking & pressure testing.",
    answer: (
      <div className={styles.faqBody}>
        <div className={styles.infoBadge}>
          <FaClock className={styles.badgeIcon} />
          <div>
            <strong>Turnaround Time: 1–2 Working Days</strong>
            <p>Includes chemical soaking, dual hydro-pneumatic flushing, thermal baking, and final back-pressure airflow certification testing.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    question: "9. How much does DPF cleaning cost?",
    summary: "DPF cleaning starts from ₹6,000 depending on vehicle model & DPF size.",
    answer: (
      <div className={styles.faqBody}>
        <div className={styles.priceBadge}>
          <FaTag className={styles.badgeIcon} />
          <div>
            <span className={styles.priceHead}>DPF Cleaning Starts From</span>
            <span className={styles.priceValue}>₹6,000</span>
            <p>(Final cost depends on vehicle model, DPF filter unit dimensions, and overall soot/ash clogging condition.)</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    question: "10. Should the DPF unit be removed before cleaning?",
    summary: "Yes. DPF must be removed from vehicle. Send to us via courier/parcel from anywhere in India.",
    answer: (
      <div className={styles.faqBody}>
        <div className={styles.parcelBox}>
          <FaTruck className={styles.truckIcon} />
          <div>
            <h4>YES. DPF UNIT MUST BE REMOVED FROM THE VEHICLE.</h4>
            <p>📦 You can send your removed DPF filter unit to our workshop via <strong>courier or parcel service from anywhere in Kerala or across India</strong>.</p>
            <p className={styles.subNote} style={{ marginTop: '8px' }}>
              After cleaning, the unit is pressure tested, certified, and safely dispatched back ready for direct installation and use.
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>PROFESSIONAL KNOWLEDGE BASE</span>
          <h2 className="section-title">FREQUENTLY ASKED QUESTIONS (FAQ)</h2>
          <p className={styles.subtitle}>
            Everything you need to know about DPF | DOC | SCR | ASC cleaning, pre-cleaning scanner diagnostics, 4-stage scientific cleaning, troubleshooting warning lights, and nationwide parcel service.
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`${styles.faqCard} ${isOpen ? styles.cardOpen : ''}`}>
                <button className={styles.questionBtn} onClick={() => toggleFaq(item.id)}>
                  <div className={styles.qLeft}>
                    <span className={styles.qTitle}>{item.question}</span>
                    {!isOpen && <span className={styles.qSummary}>{item.summary}</span>}
                  </div>
                  <span className={`${styles.arrowIcon} ${isOpen ? styles.arrowUp : ''}`}>
                    <FaChevronDown />
                  </span>
                </button>

                {isOpen && <div className={styles.answerWrapper}>{item.answer}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
