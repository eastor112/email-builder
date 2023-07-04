/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAttributes } from "../types/general";

export abstract class Component {
  public parent!: Component | null;
  public uid?: string;
  public tagName: string;
  public attributes: IAttributes;

  constructor(tagName: string, attributes: IAttributes = {}) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.uid = this.generateUID();
  }

  public generateUID(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  public setParent(parent: Component | null) {
    this.parent = parent;
  }

  public getParent(): Component | null {
    return this.parent;
  }

  public add(component: Component): void {
    console.log('add element', component.tagName);
  }

  public remove(component: Component): void {
    console.log('remove element', component.tagName);
  }

  public isComposite(): boolean {
    return false;
  }

  public abstract render(): HTMLElement;

  public abstract getMJML(): string;

  public abstract getJSON(): any;
}
