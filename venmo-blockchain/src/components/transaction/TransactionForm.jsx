import {
  CurrencyDollarIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/outline";
import { useContext } from "react";
import { TransactionContext } from "../../context/context";
import styles from "../../styles/Transaction.module.css";

function TransactionForm() {
  const {
    sendTransaction,
    setAddressTo,
    addressTo,
    setAmount,
    amount,
    setMessage,
    message,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addressTo || !amount || !message) return;
    sendTransaction();
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.formTitle}>Send Payment / Request</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.swapContainer}>
            <SwitchVerticalIcon className={styles.swapIcon} />
            <p className={styles.swapText}>Swap to/from</p>
          </div>
          <div className={styles.formBody}>
            <div className={styles.formInputContainer}>
              <h4 className={styles.formInputTitle}>To</h4>
              <input
                className={styles.formInput}
                type="text"
                autoComplete="false"
                value={addressTo}
                onChange={(e) => {setAddressTo(e.target.value)}}
              />
            </div>
            <div className={styles.formInputContainer}>
              <h4 className={styles.formInputTitle}>Message</h4>
              <input
                className={styles.formInput}
                type="text"
                autoComplete="false"
                value={message}
                onChange={e => {setMessage(e.target.value)}}
              />
            </div>
          </div>
          <div className={styles.formFooter}>
            <h4 className={styles.footerTitle}>Amount</h4>
            <div className={styles.footerContainer}>
              <div className={styles.amountContainer}>
                <div className={styles.inputContainer}>
                  <CurrencyDollarIcon className={styles.dollarIcon} />
                  <input
                    className={styles.formInput}
                    type="number"
                    autoComplete="false"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <button className={styles.sendButton} type="submit">
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
