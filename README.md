# Accessible Accordian Class Pure JS / CSS

A pure JS OOP accessible accordion with CSS transitions.

View a demo here: http://benbowes.github.io/Accessible-Accordian-Class-Pure-JS-CSS/

-------

Works in IE9+

Accordian rules:
- Panels open and close via a click event on a tab heading.
- Only one panel can be open at a time.
- All panels can be closed at the same time.
- Transitions work in IE10+ and modern browsers

Accessibilty:
- It is based on this accordian: http://www.oaa-accessibility.org/examplep/accordian1/
    which is mentioned here: http://www.w3.org/TR/wai-aria-practices/#accordion, I have not implemented the keyboard interaction.
- Uses/Sets landmark roles [tablist, tab, tabpanel] for the accordion relationships
- Sets focus to the tab panel when heading 'tab' is clicked
- Sets up and changes aria attributes [aria-controls, aria-expanded, aria-selected, aria-hidden, aria-labelledby] on click
- Sets id and tabindex for you

-----------------------------------
HTML Layout:
```
<section class="accordion" role="tablist" aria-multiselectable="true">

    <a class="accordion-panel__heading" href="javascript:;">Accordion Panel One</a>
    <div class="accordion-panel__content">
        ...
    </div>

    <a class="accordion-panel__heading" href="javascript:;">Accordion Panel Two</a>
    <div class="accordion-panel__content">
        ...
    </div>


</section>
```
-----------------------------------

Rough HTML translation:
```
Accordion Container

    AccordionPanel's clickable heading/tab - controls content area
    AccordionPanel's collapsing content area

    AccordionPanel's clickable heading/tab - controls content area
    AccordionPanel's collapsing content area

    ...
```

Initialisation
====
```
myAPP.init = function () {

    // Create Accordian instance. Pass in the classes you want to use for the heading and content panel.
    this.accordionContainer = new myAPP.Accordion({
        heading:    '.accordion-panel__heading',
        content:    '.accordion-panel__content'
    });

    // Select second panel programtically like this
    this.accordionContainer.panels[1].select(); // or myAPP.accordionContainer.panels[0].select();
};
```

Removing the focus ring
====

If you'd like to remove the focus ring from the accordian (and whole page), I can provide 2 options. Note that this is considered a bad practice by some accessibilty professionals however note that VoiceOver, NVDA and Chromevox screenreaders add their own focus ring.

A CSS version:
```
:focus{
  outline: 0;
}
```

And a keyboard initiated version as stated here: http://www.paciellogroup.com/blog/2012/04/how-to-remove-css-outlines-in-an-accessible-manner/

The keyboard version essentially adds the above CSS on mouseclick and removes the CSS on keyup.
