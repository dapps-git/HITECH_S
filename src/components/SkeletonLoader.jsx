import styles from './SkeletonLoader.module.css';

export function ProductSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={`prod-skel-${i}`} className={styles.productSkeletonCard}>
          <div className={`${styles.productSkeletonImage} ${styles.skeletonBase}`} />
          <div className={styles.productSkeletonContent}>
            <div className={`${styles.productSkeletonTitle} ${styles.skeletonBase}`} />
            <div className={`${styles.productSkeletonText1} ${styles.skeletonBase}`} />
            <div className={`${styles.productSkeletonText2} ${styles.skeletonBase}`} />
          </div>
        </div>
      ))}
    </>
  );
}

export function ServiceSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={`svc-skel-${i}`} className={styles.serviceSkeletonCard}>
          <div className={`${styles.serviceSkeletonIcon} ${styles.skeletonBase}`} />
          <div className={`${styles.serviceSkeletonTitle} ${styles.skeletonBase}`} />
          <div className={`${styles.serviceSkeletonDesc} ${styles.skeletonBase}`} />
        </div>
      ))}
    </>
  );
}

export function BlogSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={`blog-skel-${i}`} className={styles.blogSkeletonCard}>
          <div className={`${styles.blogSkeletonImage} ${styles.skeletonBase}`} />
          <div className={styles.blogSkeletonContent}>
            <div className={`${styles.blogSkeletonTitle} ${styles.skeletonBase}`} />
            <div className={`${styles.blogSkeletonExcerpt} ${styles.skeletonBase}`} />
          </div>
        </div>
      ))}
    </>
  );
}
