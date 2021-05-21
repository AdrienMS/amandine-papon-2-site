import React from 'react';
import './style.scss';

import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, QuickToolbar, ToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';

import Field from '../Field';

const fontFamily = {
    default: 'Montserra',
    items: [
      {text: 'Roboto', value: 'Roboto',  command: 'Font', subCommand: 'FontName'},
      {text: 'Fontfabric', value: 'Fontfabric, sans-serif',  command: 'Font', subCommand: 'FontName'},
      {text: 'FontfabricF', value: 'Fontfabric Fill, sans-serif',  command: 'Font', subCommand: 'FontName'},
      {text: 'FontfabricD', value: 'Fontfabric Doodles, sans-serif',  command: 'Font', subCommand: 'FontName'},
      {text: 'FontfabricDF', value: 'Fontfabric Doodles Fill, sans-serif',  command: 'Font', subCommand: 'FontName'},
      {text: 'Montserra', value: 'Montserra, sans-serif',  command: 'Font', subCommand: 'FontName'},
    ]
}

const tools = {
    type: 'Expand',
    items: [
      'Bold', 'Italic', 'Underline', 'StrikeThrough',
      'FontName', 'FontSize', 'FontColor', 'LowerCase', 'UpperCase', '|',
      'Alignments', 'OrderedList', 'UnorderedList',
      'Outdent', 'Indent', '|',
      'CreateLink', '|', 'ClearFormat',
      '|', 'Undo', 'Redo'
    ]
} as ToolbarSettingsModel;

export default class TextEditor extends Field {
    rteObj: RichTextEditorComponent | null | undefined;

    handleChange = () => {
        if (this.rteObj) {
            this.handleChanged(this.rteObj?.value);
        }
    }

    renderFieldType() {
        return (
            <RichTextEditorComponent
                toolbarSettings={tools}
                fontFamily={fontFamily}
                value={this.props.field.value}
                change={this.handleChange}
                ref={(richtexteditor) => { this.rteObj = richtexteditor }}
            >
                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
            </RichTextEditorComponent>
        );
    }
}