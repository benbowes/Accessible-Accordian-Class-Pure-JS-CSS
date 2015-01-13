
var myAPP = myAPP || {};

myAPP.Accordion = function () {
    /* 
    The Accordion Class is a container for each of the AccordionPanel Class panels.
    
    It's 2 methods are:
    1) resetPanels () - used for unselecting/collapsing every AccordionPanel
    2) makePanel ( panelElement<HTMLElement>  )  - used for spawning new instances of AccordionPanel

    */
    this.panels = [];
};

myAPP.Accordion.prototype = {

    resetPanels: function () {
        this.panels.forEach( function ( v ) {
            v.unselect();
        });
    },
    makePanel: function ( panelElement ) {
        this.panels.push( new myAPP.AccordionPanel(panelElement, this) );
    }
};

myAPP.AccordionPanel = function ( el, panelHolder ) {
    /* 
    The AccordionPanel Class controls each of the collapsable panels. These are spawned from Accordion Class.
    
    It's 2 methods are:
    1) select () - addClass('active') to this.el ('.accordion__panel') and set this.isSelected=true;
    2) unselect ()  - removeClass('active') from this.el ('.accordion__panel') and set this.isSelected=false;
    */

    var self = this;

    this.el = el;
    this.isSelected = false;
    this.panelHolder = panelHolder;

    //  I N I T I A L I Z E   T H I S   I N S T A N C E

    if ( this.panelHolder.panels.length === 0 ){ // select the first panel by default
        this.select();
    }

    this.el.addEventListener("click", function () {
        
        if ( self.isSelected ){
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

    /*
    Turn all elements with class '.accordion__panel' into AccordianPanel Class intances. 

    Each heading when clicked ('.accordion__panel__heading'), will hide all accordion content 
    elements ('.accordion__panel__content').
    Then will expand or contract it's sibling accordion content element ('.accordion__panel__content') 
    depending on it's isSelected value.
    */
    
    var accordionPanels = document.querySelectorAll('.accordion__panel'), 
        i = 0;

    myAPP.accordionContainer = new myAPP.Accordion();

    for (i; i < accordionPanels.length; i++) {
        myAPP.accordionContainer.makePanel(accordionPanels[i]);
    }

};

window.onload = function () {
    myAPP.init();
};



/* ------------------------------------------------

    C o n v e n i e n c e    M e t h o d s

------------------------------------------------ */

HTMLElement.prototype.addClass = function( className ){
    // e.g. el.addClass( 'className' ); 
    if (this.classList){
        this.classList.add(className);
    }else{
        this.className += ' ' + className;
    }
}

HTMLElement.prototype.removeClass = function( className ){
    // e.g. el.removeClass( 'className' ); 
    if (this.classList){
      this.classList.remove(className);
    }else{
      this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}