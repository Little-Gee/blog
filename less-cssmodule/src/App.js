// App.js
import React from "react";
import styles from "./App.less";
import { Button } from "antd";

function App() {
    return (
        <div className={styles.App}>
            <div className={styles.text}>文字</div>
            <Button type="primary">Button</Button>
        </div>
    );
}

export default App;
