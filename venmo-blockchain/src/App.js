import styles from "./styles/App.module.css";
import Navbar from "./components/Navbar";
import TransactionForm from "./components/transaction/TransactionForm";
import ActivityCard from "./components/activity/ActivityCard";
import { useContext } from "react";
import { TransactionContext } from "./context/context";
import HashLoader from "react-spinners/HashLoader";

const override = {
  display: "block",
  margin: "0 auto",
  top: "100px",
};

function App() {
  const { isLoading } = useContext(TransactionContext);
  return (
    <div className={styles.wrapper}>
      <header>
        <Navbar />
        <main className={styles.mainContainer}>
          <div className={styles.activityContainer}>
            <ActivityCard />
          </div>
          <div className={styles.sideContainer}>
            {isLoading ? (
              <HashLoader
                cssOverride={override}
                size={80}
                aria-label="Loading Spinner"
              />
            ) : (
              <TransactionForm />
            )}
          </div>
        </main>
      </header>
    </div>
  );
}

export default App;
