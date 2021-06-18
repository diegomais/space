import styles from '../styles/components/page-container.module.css'

const PageContainer: React.FC = ({ children }) => (
  <>
    <div className={styles.bar} />
    <div className={styles.container}>{children}</div>
  </>
)

export default PageContainer
