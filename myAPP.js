
var myAPP = myAPP || {};

/*
See the README.md for more info
@Author: Ben Bowes - bb@benbowes.com
*/

myAPP.Accordion = function ( panelSelectorsObj ) { // e.g. function ({ heading: <String>, content: <String>})
    
    this.panels = []; // Master list of collapsable panels. Accessible publically e.g myAPP.accordionContainer.panels[0].select();
    this.panelSelectors = panelSelectorsObj; // an obj containing the panel selectors - { heading: <String>, content: <String>}
    this.accordionPanels = document.querySelectorAll( this.panelSelectors['heading'] ); 

    for (i = 0; i < this.accordionPanels.length; i++) {
        this.makePanel( this.accordionPanels[i], i );
    }
};

myAPP.Accordion.prototype = {

    // resetPanels() - used for unselecting/collapsing AccordionPanels
    resetPanels: function () {
        this.panels.forEach( function ( v ) {
            v.unselect();
        });
    },
    // makePanel( <HTMLElement>, <position index used for naming> ) - Spawns a new AccordionPanel and pushes it into the master list of AccordionPanels controlled by Accordian
    makePanel: function ( panelElement, index ) {
        var panel = new myAPP.AccordionPanel( panelElement, this, index );
        this.panels.push( panel );
    }
};

myAPP.AccordionPanel = function ( headingEl, panelHolder, index ) {
    // The AccordionPanel Class controls each of the collapsable panels spawned from Accordion Class
    var self = this;

    this.panelHolder = panelHolder;
    this.index = index;
    this.headingEl = headingEl; // this is the clickable heading
    this.contentEl = headingEl.nextElementSibling;//headingEl.querySelector( this.panelHolder.panelSelectors['content'] ); 
    this.isSelected = false;

    this.setupAccessibility();

    this.headingEl.addEventListener( "click", function () {
        
        if (self.isSelected){
            self.unselect(); // already open, presume user wants it closed
        }
        else {
            self.panelHolder.resetPanels(); // close all panels
            self.select(); // then open desired panel
        }

    });

    return this;
};

myAPP.AccordionPanel.prototype = {

    setupAccessibility: function(){
        this.headingEl.setAttribute( 'role', 'tab' );
        this.headingEl.setAttribute( 'aria-selected', 'false' );
        this.headingEl.setAttribute( 'id', 'accordionHeading_' + this.index );
        this.headingEl.setAttribute( 'aria-controls', 'accordionContent_' + this.index );
        this.headingEl.setAttribute( 'tabindex', '0' );
        this.headingEl.setAttribute( 'aria-expanded', 'false' ); // dynamic html attribute

        this.contentEl.setAttribute( 'id', 'accordionContent_' + this.index );
        this.contentEl.setAttribute( 'aria-labelledby', 'accordionHeading_' + this.index );
        this.contentEl.setAttribute( 'role', 'tabpanel' );
        this.contentEl.setAttribute( 'tabindex', '0' );
        this.contentEl.setAttribute( 'aria-hidden', 'true' ); // dynamic html attribute
    },
    select: function () {
        var self = this;
        this.isSelected = true;

        this.headingEl.addClass('active');
        this.headingEl.setAttribute( 'aria-expanded', 'true' );
        this.headingEl.setAttribute( 'aria-selected', 'true' );

        this.contentEl.addClass('active');
        this.contentEl.setAttribute( 'aria-hidden', 'false' );
        setTimeout(function(){
            self.contentEl.focus();
        }, 1000); // wait for animation to finish before shifting focus (Don't need to - just looks nicer)
        
    },
    unselect: function () {
        this.isSelected = false;

        this.headingEl.removeClass('active');
        this.headingEl.setAttribute( 'aria-expanded', 'false' );
        this.headingEl.setAttribute( 'aria-selected', 'false' );

        this.contentEl.removeClass('active');    
        this.contentEl.setAttribute( 'aria-hidden', 'true' );
    }
};

myAPP.init = function () {

    // Create Accordian instance and turn all elements with class '.accordion-panel' into AccordianPanel Class intances. 
    this.accordionContainer = new myAPP.Accordion({
        heading:    '.accordion-panel__heading',
        content:    '.accordion-panel__content'
    }); //  store the panel selectors in Accordian Class - Accordion( { heading: <String>, content: <String>} )

    // Select second panel
    this.accordionContainer.panels[1].select(); // or myAPP.accordionContainer.panels[0].select();
};

window.onload = function () {
    myAPP.init();
};

/* ------------------------------------------------

    C o n v e n i e n c e    M e t h o d s

------------------------------------------------ */

HTMLElement.prototype.addClass = function ( className ) {
    // e.g. el.addClass( 'className' ); 
    if (this.classList){
        this.classList.add( className );
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