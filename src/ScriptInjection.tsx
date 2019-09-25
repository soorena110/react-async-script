import * as React from "react";

const injectingScripts = [] as string[];
const injectedScripts = [] as string[];

interface Props {
    scriptUrl: string | string[];
    onLoad?: () => void;
    dontShowLoading?: boolean;
}

interface State {
    isAllScriptsLoaded: boolean;
}

export default class ScriptInjection extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {isAllScriptsLoaded: false};
        this._startLoadingScripts();
    }

    private _getScriptUrls() {
        if (typeof (this.props.scriptUrl) == 'string')
            return [this.props.scriptUrl];
        return this.props.scriptUrl;
    }

    private _startLoadingScripts() {
        const urls = this._getScriptUrls();

        urls.forEach(url => {
            if (injectingScripts.indexOf(url) != -1)
                return;

            if (injectedScripts.indexOf(url) != -1) {
                this._changeStateIfAllScriptsAreLoaded();
                return;
            }

            const script = document.createElement("script") as HTMLScriptElement;
            script.src = url;
            script.async = true;
            script.onload = () => {
                injectedScripts.push(url);
                const ix = injectingScripts.indexOf(url);
                injectingScripts.splice(ix, 1);
                this._changeStateIfAllScriptsAreLoaded();
            };
            document.body.appendChild(script);
        });
    }

    private _changeStateIfAllScriptsAreLoaded() {
        const isAllScriptsLoaded = !this._getScriptUrls().find(url => injectedScripts.indexOf(url) == -1);
        if (!isAllScriptsLoaded)
            return;

        if (this.props.onLoad)
            this.props.onLoad();
        if (!this.state.isAllScriptsLoaded)
            this.setState({isAllScriptsLoaded: true})

    }

    render() {
        if (!this.state.isAllScriptsLoaded || !this.props.children) {
            if (this.props.dontShowLoading)
                return null;
            const LoadingComponent = (window as any).reactLoading;
            if (LoadingComponent)
                return <LoadingComponent/>
        }
        return this.props.children;
    }
}
