import React from "react";
import styles from "./Main.module.scss";

interface IMainProps {
	children?: any
}

const Main: React.FC<IMainProps> = ({ children }) => {

	return (
		<main className={styles.content}>
			{children}
		</main>
	)
}

export default Main;