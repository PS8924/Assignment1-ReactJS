/**
* A Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
/**
* A Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
class Node {

  constructor(tag, children, classes, id) {
    // Tag name of the node.
    this.tag = tag;
    // Array of CSS class names (string) on this element.
    this.classes = classes;
    // Array of child nodes.
    this.children = children; // All children are of type Node
    this.id = id;
  }
  /**
  * Returns descendent nodes matching the selector. Selector can be 
  * a tag name or a CSS class name.
  * 
  * For example: 
  * 
  * 1.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `span` should return 3 span nodes in this order
  * span-1 -> span-2 -> span-3.
  *
  * 2.
  * <div> 
  *   <span id="span-1" class="note"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `.note` should return one span node with `note` class.
  *
  * 3.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <article>
  *     <div>
  *       <span id="span-3"></span>
  *     </div>
  *   </article>
  * </div>
  * Selector `div span` should return three span nodes in this order
  * span-1 -> span-2 -> span-3.
  * 
  * @param {string} the selector string.
  * @returns {Array} Array of descendent nodes.
  * @public
  */
  search(selector) {
    let find_arr = [];
    if(!selector)return "Please enter valid search input.";
    if (typeof selector !== 'string'){
      return "Please enter valid search input.";
    }
    // Condition for class
    if (selector.startsWith(".")) {
      for(let i = 0; i < this.children.length; i++){
        if(this.children[i].classes ==selector.substring(1)){
          return [this.children[i].tag, this.children[i].classes];
        }
      }
     
    }
    // Condition for multiple selector searches
     if(selector.trim().indexOf(' ') != -1){
      let array_word = selector.split(' ');
      let word_second = array_word[1];

      for (let i = 0; i < this.children.length; i++) {
        if(this.children[i].children.length>0){
          for (let j = 0; j < this.children[i].children.length; j++) {
            if (this.children[i].children[j].tag == word_second) {
              find_arr.push(this.children[i].children[j].id);
            }
            if (this.children[i].children[j].children.length > 0) {
              for (let k = 0; k < this.children[i].children[j].children.length; k++) {
                if (this.children[i].children[j].children[k].tag == word_second) {
                  find_arr.push(this.children[i].children[j].children[k].id);
                }
              }
            }
          }
        }
      }
      return find_arr;
    }else {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].tag == selector) {
          find_arr.push(this.children[i].id);
        }
        if (this.children[i].children.length > 0) {
          for (let j = 0; j < this.children[i].children.length; j++) {
            if (this.children[i].children[j].tag == selector) {
              find_arr.push(this.children[i].children[j].id);
            }
            if (this.children[i].children[j].children.length > 0) {
              for (let k = 0; k < this.children[i].children[j].children.length; k++) {
                if (this.children[i].children[j].children[k].tag == selector) {
                  find_arr.push(this.children[i].children[j].children[k].id);
                }
              }
            }
          }
        } 
       // else return "Please enter valid search input.";
      }
      return find_arr;
    }
  }

}

const lbl_1 = new Node("label", [], null, "lbl-1");

const sec_1 = new Node("section", [lbl_1], null, "sec-1");

const div_3 = new Node("div", [sec_1], "subContainer2", "div-3");

const span_3 = new Node("span", [], "sub1-span3", "span-3");

const para_1 = new Node("p", [], "sub1-p1 note", "para-1");

const div_2 = new Node("div", [para_1, span_3], "subContainer2", "div-2");

const span_4 = new Node("span", [], "mania", "span-4");

const span_5 = new Node("span", [], "note mania", "span-5");

const div_4 = new Node("div", [span_4, span_5], "", "div-4");

const span_1 = new Node("span", [], "note", "span-1");

const span_2 = new Node("span", [], "", "span-2");

const div_1 = new Node("div", [span_1, span_2, div_2, div_3, div_4], "mainContainer", "div-1");

const randomNode = new Node("span", [], "randomspan", "span-6");

const bodyNode = new Node("body", [div_1, randomNode], "", "body");

//console.log("div_1", div_1);
console.log("search results", div_1.search("div"));   