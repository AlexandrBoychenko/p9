class Faq {

      constructor () { 
        this.questionHeader = document.getElementsByClassName("question-header");
        this.inputValue = document.getElementById('text-to-find');
        this.searchElements = document.querySelectorAll("div.acc-content-inner > p, div.question-header > h4");
        this.findButton = document.getElementById('find-button');
        this.arrayOfItemsToSearch = [];

        this.addEventListeners();
      }

      addEventListeners() {
      console.log(this)
        document.addEventListener("DOMContentLoaded", () => {

          this.inputValue.addEventListener('input', () => this.findOnPage());
          this.findButton.addEventListener('click', () => this.findButtonOnClick());

          const questionHeader = document.getElementsByClassName("question-header");

          for (let i = 0; i < questionHeader.length; i++) {
            questionHeader[i].addEventListener('click', function () {
    
              const header = questionHeader[i].childNodes[1];
              const description = questionHeader[i].nextElementSibling;
    
              if (!header.className) {
    
                this.deactivateItems();
    
                header.className = "selected";
                questionHeader[i].className = "question-header active";
    
                description.style.maxHeight = description.scrollHeight + "px";
              } else {
                header.className = ""
                questionHeader[i].className = "question-header"
                description.style.maxHeight = 0;
              }
            })
          }
        })
      }
      
      pickListActive(bool, input) {

        const pickList = document.getElementById('pick-list');
        
        if (bool && input) {
          pickList.classList.add(`active`);
        } else {
          pickList.classList.remove('active');
        }
      }

      findOnPage = () => {
      
        const input = this.inputValue.value.toUpperCase()
  
        this.pickListActive(true, input);
  
        for (let i = 0; i < this.searchElements.length; i++) {
  
          const textContent = this.searchElements[i].textContent.toUpperCase();
  
          if (textContent.includes(input) && this.arrayOfItemsToSearch.length <= 5) {
  
            if (this.searchElements[i].nodeName === "P") {
  
              let searchTitle = this.searchElements[i].parentNode.parentNode.previousElementSibling.firstElementChild;
  
              searchTitle.id = "el" + i;
  
              this.arrayOfItemsToSearch.push(
                {
                  searchElement: searchTitle.innerHTML.toUpperCase(),
                  id: searchTitle.id
                })
            } else {
              this.searchElements[i].id = "el" + i;
              this.arrayOfItemsToSearch.push(
                {
                  searchElement: this.searchElements[i].textContent.toUpperCase(),
                  id: this.searchElements[i].id
                })
              i++
            }
          }
        }
        this.addItemToDOM(this.arrayOfItemsToSearch);
      }

      addItemToDOM(arr) {

        this.removeElements("li", "div");
  
        const elementList = document.getElementById('list');
  
        if (!arr.length) {
          appentHTMLElement(elementList, 'div', '<strong>No matches found</strong>', 'not-found');
        }
  
        arr.map(el => {
          appentHTMLElement(elementList, 
            'li', 
            `<a href="#${el.id}"> ${this.firstVocalburaryToUpperCase(el.searchElement)}</a>`, 
            null, 
            'onclick',
            `new Faq().scrolling(\'${el.id}\')`);
        })
      }
  
  
       removeElements(el, el1) {
  
        const elementList = document.getElementById('list');
        const arr = elementList.getElementsByTagName(el);
  
        const count = [...arr];
  
        for (let i = 0; i < count.length; i++) {
          count[i].remove();
        }
        let notFound = elementList.getElementsByTagName(el1);
  
        for (let i = 0; i < notFound.length; i++) {
          notFound[i].remove();
        }
      }
  
  
      firstVocalburaryToUpperCase(str) {
  
        return str.charAt(0) + str.slice(1).toLowerCase();
      }
  
      scrolling(id) {
  
        this.deactivateItems();
  
        const element = document.getElementById(`${id}`);
        element.click()
  
        this.pickListActive(false);
      }
  
      deactivateItems() {
  
        const activeItems = document.getElementsByClassName("question-header active");
  
        if (activeItems.length > 0) {
          for (let i = 0; i < activeItems.length; i++) {
            activeItems[i].click()
          }
        }
      }
  
      findButtonOnClick(event) {
       
       event.preventDefault();

        if (this.arrayOfItemsToSearch) {
          this.scrolling(this.arrayOfItemsToSearch[0].id);
          window.location.href = `#${this.arrayOfItemsToSearch[0].id}`
        }
      }
    }


    runClass('.faq', Faq);
