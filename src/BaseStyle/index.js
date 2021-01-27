import React from "react";
import styles from './styles.module.css';

const BaseStyle = (props) => {

    console.log("STILOVI:", styles);
    return (
        <div className={styles.ubuntuFont}>
            {props.children}
        </div>
    );
};

export default (BaseStyle);
