import {ElementRef, HostListener, Directive, OnInit} from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class Autosize implements OnInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea:HTMLTextAreaElement):void {
    this.adjust();
  }

  constructor(public element:ElementRef) {
  }

  ngOnInit():void {
    setTimeout(() => this.adjust(), 0);
  }

  /**
   * Here, the main work is done in the adjust() function. This set’s the textarea.style.height to textarea.scrollHeight, where the scroll height gives the overall height of the textarea required to view all the contents. Hence this adjust()function autosizes the textarea to it’s content size. Also, we are using @HostListener to listen to input event, and calling adjust() function every time input event is tiggred, i.e. the input even is emitted on the host.Finally, we are calling adjust() function on ngOnInit() to adjust the height to content initially present on the textarea */
  adjust():void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + "px";
  }
}