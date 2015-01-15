# Simple-Accordion-Class-Pure-JS

A pure JS OOP accessible accordion with CSS transitions.

View a demo here: http://polyform.com.au/Simple-Accessible-Accordian-Class-Pure-JS/

=======

This accordion consists of a container ('.accordion') for holding a series of 
collapsible panels ('.accordion-panel')

Works in IE9+

Accordian rules:
- Panels open and close via a click event on a panel.
- Only one panel can be open at a time.
- All panels can be closed at the same time.
- Transitions open in IE10+ and modern browsers

Accessibilty:
- It is based on this accordian: http://www.oaa-accessibility.org/examplep/accordian1/ 
    which is mentioned here: hhttp://www.w3.org/TR/wai-aria-practices/#accordion
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
Accordion

    AccordionPanel's clickable heading/tab - controls content area
    AccordionPanel's collapsing content area

    AccordionPanel's clickable heading/tab - controls content area
    AccordionPanel's collapsing content area

    ...
```