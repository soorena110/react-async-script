import * as React from 'react';
import {render} from "react-dom";
import {ScriptInjection} from "../index";

declare const module: any;

class Loading extends React.Component {
    render() {
        return 'loading ...';
    }
}

(window as any).scriptLoadingComponent = Loading;

class MainApplication extends React.Component<{}, { clicked: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {clicked: false};
    }

    render() {
        if (this.state.clicked)
            return <ScriptInjection scriptUrl={"https://code.jquery.com/jquery-3.3.1.slim.min.js"}>
                hello
            </ScriptInjection>;

        return <button onClick={() => this.setState({clicked: true})}>
            click me :))
        </button>
    }
}

render(
    <MainApplication/>,
    document.getElementById("root")
);

module.hot.accept();