import { IEventSource, BasicEventHandler, EventSource } from "utils";
import { ICellOutputValue } from "model";

//
// View-model for output from a cell.
//

export interface ICellOutputValueViewModel {

    //
    // Get the display type of the value.
    //
    getDisplayType(): string | undefined;

    //
    // Get the id of the plugin to use to render this output.
    //
    getPlugin(): string | undefined;

    //
    // Get the data for the value.
    //
    getData(): any;
}

export class CellOutputValueViewModel implements ICellOutputValueViewModel {

    //
    // The model underlying the view-model.
    //
    private readonly value: ICellOutputValue;

    constructor (value: ICellOutputValue) {
        this.value = value;
    }

    //
    // Get the display type of the value.
    //
    getDisplayType(): string | undefined {
        return this.value.getDisplayType();
    }

    //
    // Get the id of the plugin to use to render this output.
    //
    getPlugin(): string | undefined {
        return this.value.getPlugin();
    }

    //
    // Get the data for the value.
    //
    getData(): any {
        return this.value.getData();
    }
}