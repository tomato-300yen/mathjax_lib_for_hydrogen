"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const context_1 = __importDefault(require("./context"));
const provider_1 = __importDefault(require("./provider"));
class MathJaxText_ extends React.Component {
    constructor(props) {
        super(props);
        this.nodeRef = React.createRef();
    }
    componentDidMount() {
        this.typeset();
    }
    componentDidUpdate() {
        this.typeset();
    }
    typeset() {
        const { MathJax } = this.props;
        if (!MathJax || !MathJax.Hub) {
            throw Error("Could not find MathJax while attempting typeset! It's likely the MathJax script hasn't been loaded or MathJax.Context is not in the hierarchy.");
        }
        const typeset = ["Typeset", MathJax.Hub, this.nodeRef.current];
        if (!this.props.onRender) {
            MathJax.Hub.Queue(typeset);
        }
        else {
            MathJax.Hub.Queue(typeset, this.props.onRender);
        }
    }
    render() {
        return React.createElement("div", { ref: this.nodeRef }, this.props.children);
    }
}
exports.MathJaxText_ = MathJaxText_;
class MathJaxText extends React.PureComponent {
    render() {
        return (React.createElement(context_1.default.Consumer, null, ({ MathJax, input, hasProviderAbove }) => {
            // If there is no <Provider /> in the above tree, create our own
            if (!hasProviderAbove) {
                return (React.createElement(provider_1.default, null,
                    React.createElement(MathJaxText, Object.assign({}, this.props))));
            }
            if (!MathJax) {
                return null;
            }
            return (React.createElement(MathJaxText_, { onRender: this.props.onRender, input: input, MathJax: MathJax, hasProviderAbove: hasProviderAbove }, this.props.children));
        }));
    }
}
MathJaxText.defaultProps = {
    onRender: null
};
exports.default = MathJaxText;
