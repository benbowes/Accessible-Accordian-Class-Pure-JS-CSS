
var myAPP = myAPP || {};

/* 

    This accordion consists of a container ('.accordion') for holding a series of 
    collapsable panels ('.accordion__panel')
    Works in IE9+

    -----------------------------------
    
    Accordian rules:

    - Panels open and close via a click event on a heading.
    - Only one panel can be open at a time.
    - All panels can be closed.
    - Transitions open in IE10+ and modern browsers
    
    -----------------------------------

    HTML Layout:

    <div class="accordion">

        <section class="accordion__panel">
            <a class="accordion__panel__heading" href="javascript:;">Accordion Panel One</a>
            <article class="accordion__panel__content">
                ...
            </article>
        </section>

        <section class="accordion__panel">
            <a class="accordion__panel__heading" href="javascript:;">Accordion Panel One</a>
            <article class="accordion__panel__content">
                ...
            </article>
        </section>

    </div>

    -----------------------------------
    
    Rough HTML translation:

    ('.accordion') = Accordion
        ('.accordion__panel') = AccordionPanel
            ('.accordion__panel__heading') = AccordionPanel's heading
            ('.accordion__panel__content') = AccordionPanel's collapsing area


*/

myAPP.Accordion = function () {
    this.panels = []; // Master list of collapsable panels. Accessible publically e.g myAPP.accordionContainer.panels[0].select();
};

myAPP.Accordion.prototype = {

    // resetPanels() - used for unselecting/collapsing AccordionPanels
    resetPanels: function () {
        this.panels.forEach( function ( v ) {
            v.unselect();
        });
    },
    // makePanel(<HTMLElement>) - Spawns a new AccordionPanel and pushes it into the master list of AccordionPanels controlled by Accordian
    makePanel: function ( panelElement ) {
        this.panels.push( new myAPP.AccordionPanel(panelElement, this) );
    }
};

myAPP.AccordionPanel = function ( el, panelHolder ) {
    // The AccordionPanel Class controls each of the collapsable panels spawned from Accordion Class.

    var self = this;

    this.el = el;
    this.isSelected = false;
    this.panelHolder = panelHolder;

    this.el.addEventListener("click", function () {
        
        if (self.isSelected){
            self.unselect(); // already open, presume user wants it closed
        } else {
            self.panelHolder.resetPanels(); // close all panels
            self.select(); // then open desired panel
        }

    });

    return this;
};

myAPP.AccordionPanel.prototype = {

    select: function () {
        this.el.addClass('active');
        this.isSelected = true;
    },
    unselect: function () {
        this.el.removeClass('active');
        this.isSelected = false;
    }
};

myAPP.init = function () {

    // Create Accordian instance and turn all elements with class '.accordion__panel' into AccordianPanel Class intances. 

    var accordionPanels = document.querySelectorAll('.accordion__panel'), 
        i,
        self = this;

    this.accordionContainer = new myAPP.Accordion();

    for (i = 0; i < accordionPanels.length; i++) {
        self.accordionContainer.makePanel(accordionPanels[i]);
    }

    // select second panel
    this.accordionContainer.panels[1].select(); // or myAPP.accordionContainer.panels[0].select();
};

window.onload = function () {
    myAPP.init();
};



/* ------------------------------------------------

    C o n v e n i e n c e    M e t h o d s

------------------------------------------------ */

HTMLElement.prototype.addClass = function (className) {
    // e.g. el.addClass( 'className' ); 
    if (this.classList){
        this.classList.add(className);
    }else{
        this.className += ' ' + className;
    }
}

HTMLElement.prototype.removeClass = function (className) {
    // e.g. el.removeClass( 'className' ); 
    if (this.classList){
      this.classList.remove(className);
    }else{
      this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}