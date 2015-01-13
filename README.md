# Simple-Accordion-Class-Pure-JS

A pure JS OOP accordion with CSS transitions

View a demo here: http://polyform.com.au/Simple-Accordian-Class-Pure-JS/

=======

This accordion consists of a container ('.accordion') for holding a series of 
collapsible panels ('.accordion-panel')

Works in IE9+

Accordian rules:
- Panels open and close via a click event on a panel.
- Only one panel can be open at a time.
- All panels can be closed at the same time.
- Transitions open in IE10+ and modern browsers

-----------------------------------
HTML Layout:
```
<section class="accordion">

    <article class="accordion-panel">
        <a class="accordion-panel__heading" href="javascript:;">Accordion Panel One</a>
        <div class="accordion-panel__content">
            ...
        </div>
    </article>

    <article class="accordion-panel">
        <a class="accordion-panel__heading" href="javascript:;">Accordion Panel Two</a>
        <div class="accordion-panel__content">
            ...
        </div>
    </article>
    
</section>
```
-----------------------------------

Rough HTML translation:
```
Accordion
	AccordionPanel
        AccordionPanel's heading
        AccordionPanel's collapsing content area
```