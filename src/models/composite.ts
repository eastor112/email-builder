/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from './base';

// Needs create many elements, for image, buttons, dividers
export class ParagraphLeaf extends Component {
  public render(): any {
    const paragraph = document.createElement(this.tagName);

    let styleAttributes = '';
    Object.entries(this.attributes).forEach(([key, value]) => {
      if (key !== 'content') {
        styleAttributes += `${key}:${value};`;
      }
    });
    paragraph.setAttribute('style', styleAttributes);
    paragraph.textContent = this.attributes.content || 'This is a Paragraph';

    return paragraph;
  }

  public getMJML(): string {
    const attributesMJML = Object.entries(this.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    return `
        <${this.tagName} ${attributesMJML}>
          This is a Paragraph
        </${this.tagName}>
      `;
  }

  public getJSON() {
    const mjml = this.getMJML();
    return mjml;
  }
}

export class ButtonLeaf extends Component {
  public render(): any {
    const button = document.createElement('button');
    let styleAttributes = '';
    Object.entries(this.attributes).forEach(([key, value]) => {
      if (key !== 'content') {
        styleAttributes += `${key}:${value};`;
      }
    });
    button.setAttribute('style', styleAttributes);
    button.textContent = this.attributes.content || 'Click me';

    return button;
  }

  public getMJML(): string {
    const attributesMJML = Object.entries(this.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    return `
        <${this.tagName} ${attributesMJML}>
          click me
        </${this.tagName}>
      `;
  }

  public getJSON() {
    const mjml = this.getMJML();
    return mjml;
  }
}

// Needs create many elements for diferents layouts
export class Composite extends Component {

  public children: Component[] = [];

  public add(component: Component): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  public render(): any {
    const section = document.createElement('section');

    for (const child of this.children) {
      section.appendChild(child.render());
    }

    Object.entries(this.attributes).forEach(([key, value]) => {
      section.setAttribute(key, value);
    });

    return section
  }

  public getMJML(): string {
    const results = [];
    for (const child of this.children) {
      results.push(child.getMJML());
    }

    const attributesMJML = Object.entries(this.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    return `
        <${this.tagName} ${attributesMJML}>
          ${results.join('')}
        </${this.tagName}>
      `;
  }

  public getJSON() {
    const mjml = this.getMJML();
    return mjml;
  }
}

export class ColumnLayout extends Component {

  public children: Component[] = [];

  public add(component: Component): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  public render(): any {
    const column = document.createElement('div');
    column.classList.add('mj-column');

    let styleAttributes = '';
    Object.entries(this.attributes).forEach(([key, value]) => {
      styleAttributes += `${key}:${value};`;
    });
    column.setAttribute('style', styleAttributes);

    const slot = document.createElement('div');
    slot.classList.add('slot');
    if(this.children.length===0){
      slot.innerText = '+';
    }

    const addParagraphButton = document.createElement('button');
    addParagraphButton.textContent = 'Add P'
    addParagraphButton.classList.add('add');
    addParagraphButton.addEventListener('click', () => {
      const element = new ParagraphLeaf('mj-text', {
        color: 'red',
      });
      this.children = [...this.children, element];
      slot.replaceChildren(element.render())
    })

    const addButtonButton = document.createElement('button');
    addButtonButton.textContent = 'Add Btn'
    addButtonButton.classList.add('add');
    addButtonButton.addEventListener('click', () => {
      const element = new ButtonLeaf('mj-button', {
        color: 'red',
      });
      this.add(element);
      slot.replaceChildren(element.render())
    })

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Del'
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
      this.remove(this);
      slot.replaceChildren('+')
    })

    const moveButton = document.createElement('button');
    moveButton.textContent = 'Move'
    moveButton.classList.add('move');

    const actionButtons = document.createElement('div')
    actionButtons.classList.add('item-actions')
    actionButtons.appendChild(addParagraphButton)
    actionButtons.appendChild(addButtonButton)
    actionButtons.appendChild(moveButton)
    actionButtons.appendChild(deleteButton)

    column.appendChild(slot)
    column.appendChild(actionButtons)

    this.children.forEach((child) => {
      slot.appendChild(child.render())
    });

    return column
  }

  public getMJML(): string {
    const results = [];
    for (const child of this.children) {
      results.push(child.getMJML());
    }

    const attributesMJML = Object.entries(this.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    return `
        <${this.tagName} ${attributesMJML}>
          ${results.join('')}
        </${this.tagName}>
      `;
  }

  public getJSON() {
    const mjml = this.getMJML();
    return mjml;
  }
}

export class SectionLayout extends Component {

  public children: Component[] = [];

  public add(component: Component): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  public render(): any {
    const section = document.createElement('div');
    section.classList.add('mj-section');

    let styleAttributes = '';
    Object.entries(this.attributes).forEach(([key, value]) => {
      styleAttributes += `${key}:${value};`;
    });
    section.setAttribute('style', styleAttributes);



    const actionButtons = document.createElement('div')
    actionButtons.classList.add('section-actions')
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Del'
    deleteButton.classList.add('delete');
    const moveButton = document.createElement('button');
    moveButton.textContent = 'Move'
    moveButton.classList.add('move');

    actionButtons.appendChild(deleteButton)
    actionButtons.appendChild(moveButton)

    section.appendChild(actionButtons)

    this.children.forEach((child) => {
      section.appendChild(child.render())
    });

    return section
  }

  public getMJML(): string {
    const results = [];
    for (const child of this.children) {
      results.push(child.getMJML());
    }

    const attributesMJML = Object.entries(this.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    return `
        <${this.tagName} ${attributesMJML}>
          ${results.join('')}
        </${this.tagName}>
      `;
  }

  public getJSON() {
    const mjml = this.getMJML();
    return mjml;
  }
}
