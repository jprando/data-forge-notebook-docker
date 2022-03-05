import * as React from "react";
import * as ReactDOM from "react-dom";
import { MonacoEditor } from "./components/monaco-editor";
import { PluggableVisualization } from "./notebook/cell/output/pluggable-visualization";
import "./__fixtures__/services/plugin-repository";

function App() {
    return (
        <div>
            <h1>Data-Forge Notebook: Electron testing environment</h1>
            <p>
                The code for DFN is incremently being open sourced and 
                there isn't much here yet.
            </p>
            <p>
                Watch this code repository grow week by week!
            </p>
            <MonacoEditor />       
            <hr />
            <h1>Pluggable visualization test run:</h1>     
            <PluggableVisualization
                config={{
                    data: {
                        some: "data",
                        array: [1, 2, 3],
                    },
                }}
                />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));