import * as React from 'react';
import ScriptInjection from "./ScriptInjection";


const InjectScripts = (...scripts: string[]) =>
    function <TProps>(WrappedComponent: React.Component<TProps>) {
        type TPropsWithRef = TProps & { forwardedRef: React.Ref<any> | null };

        class ScriptLoader extends React.Component<TPropsWithRef> {
            state = {areScriptsLoaded: false};

            render() {
                const {forwardedRef, ...rest} = this.props;

                if (this.state.areScriptsLoaded)
                    return React.createElement(WrappedComponent as any, {...rest, ref: forwardedRef});
                return <ScriptInjection scriptUrl={scripts}
                                        onLoad={() => !this.state.areScriptsLoaded && this.setState({areScriptsLoaded: true})}/>
            }
        }

        const forwardRef = React.forwardRef((props: TProps, ref) => {
            return <ScriptLoader {...props} forwardedRef={ref}/>;
        });

        const name = (WrappedComponent as any).displayName || (WrappedComponent as any).name;
        forwardRef.displayName = `InjectScripts(${name})`;
        return forwardRef as any as React.Component<TProps>;
    };

export default InjectScripts as any