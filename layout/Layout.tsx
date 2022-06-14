import React from "react";
import Head from "next/head";
import Main from "./Main/Main";
import styles from "./Layout.module.scss";

interface ILayoutProps {
    children?: any
	title?: string
}

const Layout: React.FC<ILayoutProps> = ({ children, title }) => {

	return (
		<>
			<Head>
				<title>{title}</title>
                <link 
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" 
                    rel="stylesheet" />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.page}>
				<div className={styles.root}>
					<Main>
						{children}
					</Main>
				</div>
			</div>
		</>
	)
}

export default Layout;