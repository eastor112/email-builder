import { ButtonLeaf, ColumnLayout, Composite, ParagraphLeaf, SectionLayout } from './models/composite'
import data from './assets/parseTest.json'
import { IElement } from './types/general';
import { Component } from './models/base';

console.log(data);

const containerTest = document.getElementById('container-test');

const buttons = document.querySelectorAll('.slot');
console.log(buttons, containerTest, document);

const root = new Composite(
  'mjml',
  {
  }
)

const body = new Composite(
  'mj-body',
  {
    'background-color': '#123',
  }
)

const section = new SectionLayout(
  'mj-section',
  {
    'background-color': '#a9c',
    'padding-bottom': '100px'
  }
)

const column1 = new ColumnLayout(
  'mj-column',
  {
    'padding': '30px',
    'background-color': '#888',
  }
)

const column2 = new ColumnLayout(
  'mj-column',
  {
    'padding': '30px',
    'background-color': '#888',
  }
)

section.add(column1)
section.add(column2)
body.add(section)
root.add(body)

containerTest?.appendChild(root.render());

const getMjmlButton = document.getElementById('get-mjml');

const mjmlContainer = document.getElementById('mjml-container');

getMjmlButton?.addEventListener('click', () => {
  if (mjmlContainer) {
    mjmlContainer.innerText = root.getMJML();
  }
})

const renderContainer = document.getElementById('render-contaner')
const dataTiped = data as IElement;

export const parseElement = (element: IElement) => {

  let elm: Component;

  switch (element.tagName) {
    case 'mjml':
      elm = new Composite('mjml', {});
      break;
    case 'mj-body':
      elm = new Composite('mj-body', element.attributes);
      break;
    case 'mj-section':
      elm = new SectionLayout('mj-section', element.attributes);
      break;
    case 'mj-column':
      elm = new ColumnLayout('mj-column', element.attributes);
      break;
    case 'mj-text':
      elm = new ParagraphLeaf('mj-text', {
        ...element.attributes,
        content: element.content || ''
        });
        break;
    case 'mj-button':
      elm = new ButtonLeaf('mj-button', {
        ...element.attributes,
        content: element.content || ''
      });
      break;
    default:
      elm = new Composite(element.tagName, {});
      break;
  }


  if (element.children) {
    element.children.forEach(child => {
      elm.add(parseElement(child));
    });
  }

  return elm;
}

const parsed = parseElement(dataTiped);

console.log('parsed',parsed.getMJML());

renderContainer?.appendChild(parsed.render());
