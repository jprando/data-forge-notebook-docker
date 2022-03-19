import { BasicEventHandler, IEventSource } from "../lib/event-source";

//
// Specifies whether a text search goes forward or backward.
//
export enum SearchDirection {
    Forward,
    Backward,
}

//
// Extra details to control find and replace.
//
export interface IFindDetails {
    //
    // Text to search for.
    //
    text: string;

    //
    // Set to true to match case.
    //
    matchCase: boolean;

    //
    // Set to true to match the whole word.
    //
    matchWholeWord: boolean;

    //
    // Event raised when a match is found.
    //
    notifyMatchFound(matchRange: ITextRange, searchDirection: SearchDirection, doSelection: boolean): Promise<void>;

    //
    // Event raised when a match is not found.
    //
    notifyMatchNotFound(searchDirection: SearchDirection, doSelection: boolean): Promise<void>;
}

export type FocusedEventHandler = (sender: IMonacoEditorViewModel) => void;
export type SetCaretPositionEventHandler = (sender: IMonacoEditorViewModel, caretPosition: ICaretPosition) => void;
export type FindNextMatchEventHandler = (startingPosition: ICaretPosition, searchDirection: SearchDirection, doSelection: boolean, findDetails: IFindDetails) => Promise<void>;
export type SelectTextEventHandler = (range: ITextRange) => Promise<void>;
export type ReplaceTextEventHandler = (range: ITextRange, replaceText: string) => Promise<void>;
export type SelectionChangingEventHandler = (sender: IMonacoEditorViewModel, willBeSelected: boolean) => void;
export type SelectionChangedEventHandler = (sender: IMonacoEditorViewModel) => void;

//
// A position in the editor.
//
export interface ICaretPosition {
    //
    // line number (starts at 1)
    //
    readonly lineNumber: number;

    //
    // column (the first character in a line is between column 1 and column 2)
    //
    readonly column: number;
}

//
// Range of text in the editor.
// Copyied from range.ts in vs code.
//
export interface ITextRange {

	/**
	 * Line number on which the range starts (starts at 1).
	 */
	readonly startLineNumber: number;

	/**
	 * Column on which the range starts in line `startLineNumber` (starts at 1).
	 */
	readonly startColumn: number;

	/**
	 * Line number on which the range ends.
	 */
	readonly endLineNumber: number;

	/**
	 * Column on which the range ends in line `endLineNumber`.
	 */
	readonly endColumn: number;
}

//
// The view model that underlies Monaco Editor.
//
export interface IMonacoEditorViewModel {

    //
    // Get the code for the editor.
    //
    getCode(): string;

    //
    // Set the code for the editor.
    // Marks the code as dirty if changed.
    //
    setCode(code: string): Promise<boolean>;

    //
    // Event raised when the code in this editor has changed.
    //
    onCodeChanged: IEventSource<BasicEventHandler>;

    //
    // Returns true if this editor is currently selected.
    //
    isSelected(): boolean;

    //
    // Select this editor.
    //
    select(): Promise<void>; 

    //
    // Deselect this editor.
    //
    deselect(): Promise<void>; 

    //
    // Event raised when the selection is about to change.
    //
    onSelectionChanging: IEventSource<SelectionChangingEventHandler>; 

    //
    // Event raised when the selection for this editor has changed.
    //
    onSelectionChanged: IEventSource<SelectionChangedEventHandler>; 

    //
    // Focus the editor.
    //
    focus(): Promise<void>;

    //
    // Event raised to make the editor focused.
    //
    onSetFocus: IEventSource<FocusedEventHandler>;

    //
    // Get the caret position within the editor.
    //
    getCaretPosition(): ICaretPosition | null;

    //
    // Allows the editor to link and provide the position of the caret in the editor.
    //
    caretPositionProvider?: () => ICaretPosition | null;

    //
    // Set the position of the caret in the editor.
    //
    setCaretPosition(caretPosition: ICaretPosition): Promise<void>;

    //
    // Event raised when the caret position has been set for the editor.
    //
    onSetCaretPosition: IEventSource<SetCaretPositionEventHandler>;

    //
    // Gets the latest caret offset in the editor.
    //
    getCaretOffset(): number | undefined;

    //
    // Sets the carent offset.
    //
    setCaretOffset(caretOffset: number): void;

    //
    // Select a range of text in the editor.
    //
    selectText(range: ITextRange): Promise<void>;

    //
    // Event raised when text should be selected.
    //
    onSelectText: IEventSource<SelectTextEventHandler>; 

    //
    // Deselect text in the editor.
    //
    deselectText(): Promise<void>;

    //
    // Event raised when text should be deselected.
    //
    onDeselectText: IEventSource<BasicEventHandler>; 

    //
    // Replace requested range with spedcified text..
    //
    replaceText(range: ITextRange, replaceText: string): Promise<void>;

    //
    // Event raised when text should be replaced.
    //
    onReplaceText: IEventSource<ReplaceTextEventHandler>; 

    //
    // Records the text that is selected in the editor.
    //
    setSelectedText(selectedText: string): void;

    //
    // Gets the text that is selected in the editor.
    //
    getSelectedText(): string;    

    //
    // Gets the range of the currently selected text.
    //
    setSelectedTextRange(range: ITextRange | undefined): void;

    //
    // Gets the range of the currently selected text.
    //
    getSelectedTextRange(): ITextRange | undefined;

    //
    // Find the next instance of text.
    //
    findNextMatch(startingPosition: ICaretPosition, searchDirection: SearchDirection, doSelection: boolean, findDetails: IFindDetails): Promise<void>;

    //
    // Event raised when a request is made to find the next match.
    //
    onFindNextMatch: IEventSource<FindNextMatchEventHandler>;

    //
    // Notify the model it is about to be saved.
    //
    flushChanges(): Promise<void>;

    //
    // Event raised before the model is saved.
    //
    onFlushChanges: IEventSource<BasicEventHandler>;
}
