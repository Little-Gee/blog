import React, { Component } from "react";
import { Button, message } from "antd";
import ColorPicker from "./color/ColorPicker";

class App extends Component {
    state = {
        color: "#1890ff"
    };

    handleColorChange = color => {
        window.less
            .modifyVars({
                "@primary-color": color
            })
            .then(() => {
                this.setState({ color });
            })
            .catch(error => {
                message.error(`Failed to update theme`);
            });
    };

    render() {
        const { color } = this.state;
        return (
            <div style={{ marginTop: 100, marginLeft: 100 }}>
                <div className="base-color">文字</div>
                <Button type="primary">Button</Button>
                <div style={{ marginTop: 30 }}>
                    <ColorPicker
                        type="sketch"
                        small
                        color={color}
                        position="bottom"
                        presetColors={[
                            "#F5222D",
                            "#FA541C",
                            "#FA8C16",
                            "#FAAD14",
                            "#FADB14",
                            "#A0D911",
                            "#52C41A",
                            "#13C2C2",
                            "#1890FF",
                            "#2F54EB",
                            "#722ED1",
                            "#EB2F96"
                        ]}
                        onChangeComplete={this.handleColorChange}
                    />
                </div>
            </div>
        );
    }
}

export default App;
